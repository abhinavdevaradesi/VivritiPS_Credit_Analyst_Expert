from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database
from .services import document_service, extraction_service, risk_service, report_service

# Initialize database
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Credit Risk Underwriting API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend domain
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Credit Risk Underwriting API is running."}

@app.post("/api/onboard", response_model=schemas.Company)
def onboard_company(company: schemas.CompanyCreate, db: Session = Depends(database.get_db)):
    db_company = models.Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

@app.get("/api/companies", response_model=list[schemas.Company])
def list_companies(db: Session = Depends(database.get_db)):
    return db.query(models.Company).all()

@app.post("/api/documents/upload")
async def upload_document(
    company_id: int = Form(...),
    category: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db)
):
    try:
        return document_service.save_upload_file(file, company_id, category, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/documents/{company_id}", response_model=list[schemas.Document])
def get_documents(company_id: int, db: Session = Depends(database.get_db)):
    return document_service.list_documents(company_id, db)

@app.post("/api/documents/process/{document_id}")
async def process_document(document_id: int, db: Session = Depends(database.get_db)):
    try:
        result = extraction_service.process_document(document_id, db)
        if result:
            return result
        raise HTTPException(status_code=404, detail="Document not found or processing failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analysis/financial-data/{company_id}")
def get_financial_data(company_id: int, db: Session = Depends(database.get_db)):
    docs = db.query(models.Document).filter(models.Document.company_id == company_id).all()
    doc_ids = [d.id for d in docs]
    return db.query(models.FinancialData).filter(models.FinancialData.document_id.in_(doc_ids)).all()

@app.get("/api/analysis/risk-score/{company_id}")
def get_risk_analysis(company_id: int, db: Session = Depends(database.get_db)):
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
        
    docs = db.query(models.Document).filter(models.Document.company_id == company_id).all()
    doc_ids = [d.id for d in docs]
    data = db.query(models.FinancialData).filter(models.FinancialData.document_id.in_(doc_ids)).all()
    
    financial_data_list = [
        {
            "revenue": d.revenue, 
            "profit": d.profit, 
            "debt": d.debt, 
            "total_assets": d.total_assets,
            "total_liabilities": d.total_liabilities,
            "cashflow": d.cashflow
        } for d in data
    ]
    
    risk_results = risk_service.calculate_risk_score(financial_data_list)
    research_results = risk_service.fetch_secondary_research(company.name)
    
    return {
        "company": company.name,
        "risk": risk_results,
        "research": research_results
    }

@app.get("/api/report/generate/{company_id}")
def get_report(company_id: int, db: Session = Depends(database.get_db)):
    # 1. Fetch data
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
        
    docs = db.query(models.Document).filter(models.Document.company_id == company_id).all()
    doc_ids = [d.id for d in docs]
    data = db.query(models.FinancialData).filter(models.FinancialData.document_id.in_(doc_ids)).all()
    
    # 2. Get risk
    financial_data_list = [
        {
            "revenue": d.revenue, "profit": d.profit, "debt": d.debt, 
            "total_assets": d.total_assets, "total_liabilities": d.total_liabilities, "cashflow": d.cashflow
        } for d in data
    ]
    risk_results = risk_service.calculate_risk_score(financial_data_list)
    
    # Simple average for summary
    agg_financial = {
        "revenue": sum(d.revenue for d in data) / len(data) if data else 0,
        "profit": sum(d.profit for d in data) / len(data) if data else 0,
        "debt": sum(d.debt for d in data) / len(data) if data else 0,
        "total_assets": sum(d.total_assets for d in data) / len(data) if data else 0,
        "total_liabilities": sum(d.total_liabilities for d in data) / len(data) if data else 0,
    }

    # 3. Generate Report
    report_text = report_service.generate_investment_report(company.name, risk_results, agg_financial)
    return {"report": report_text}

@app.post("/api/loans", response_model=schemas.Loan)
def create_loan(loan: schemas.LoanCreate, db: Session = Depends(database.get_db)):
    db_loan = models.Loan(**loan.dict())
    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)
    return db_loan
