import os
import pdfplumber
import pandas as pd
import json
from sqlalchemy.orm import Session
from .. import models, schemas

def process_document(document_id: int, db: Session):
    db_document = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not db_document:
        return None
        
    db_document.status = "processing"
    db.commit()
    
    file_path = db_document.file_path
    ext = os.path.splitext(file_path)[1].lower()
    
    extracted_data = {
        "revenue": 0.0,
        "profit": 0.0,
        "total_assets": 0.0,
        "total_liabilities": 0.0,
        "debt": 0.0,
        "cashflow": 0.0
    }
    
    try:
        if ext == ".pdf":
            extracted_data = _extract_from_pdf(file_path)
        elif ext in [".xlsx", ".xls"]:
            extracted_data = _extract_from_excel(file_path)
        elif ext == ".csv":
            extracted_data = _extract_from_csv(file_path)
            
        # Create FinancialData record
        db_financial = models.FinancialData(
            document_id=document_id,
            **extracted_data,
            raw_json=json.dumps(extracted_data)
        )
        db.add(db_financial)
        db_document.status = "reviewed" # Automatically set to reviewed for now in MVP
        db.commit()
        return db_financial
        
    except Exception as e:
        db_document.status = "error"
        db.commit()
        print(f"Error processing document {document_id}: {str(e)}")
        return None

def _extract_from_pdf(path):
    # Simplified extraction logic: Look for keywords in tables
    data = {"revenue": 0.0, "profit": 0.0, "total_assets": 0.0, "total_liabilities": 0.0, "debt": 0.0, "cashflow": 0.0}
    
    try:
        with pdfplumber.open(path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() or ""
                
            # Mock LLM/Regex logic for specific keywords
            # In a real app, you'd send 'text' to an LLM like Gemini
            if "Revenue" in text or "Turnover" in text:
                data["revenue"] = 450.5 # Mock values
            if "Profit" in text or "Net Income" in text:
                data["profit"] = 35.2
            if "Assets" in text:
                data["total_assets"] = 1200.0
            if "Liabilities" in text:
                data["total_liabilities"] = 800.0
            if "Debt" in text or "Borrowings" in text:
                data["debt"] = 250.0
            if "Cash Flow" in text:
                data["cashflow"] = 42.1
    except:
        pass
    return data

def _extract_from_excel(path):
    data = {"revenue": 0.0, "profit": 0.0, "total_assets": 0.0, "total_liabilities": 0.0, "debt": 0.0, "cashflow": 0.0}
    try:
        df = pd.read_excel(path)
        # Mock logic
        data["revenue"] = float(df.iloc[0, 1]) if df.shape[1] > 1 else 100.0
    except:
        pass
    return data

def _extract_from_csv(path):
    data = {"revenue": 0.0, "profit": 0.0, "total_assets": 0.0, "total_liabilities": 0.0, "debt": 0.0, "cashflow": 0.0}
    try:
        df = pd.read_csv(path)
        data["revenue"] = float(df.iloc[0, 1]) if df.shape[1] > 1 else 100.0
    except:
        pass
    return data
