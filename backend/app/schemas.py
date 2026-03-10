from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CompanyBase(BaseModel):
    name: str
    cin: str
    pan: str
    sector: str
    subsector: str
    turnover: float
    address: str
    website: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: int
    class Config:
        from_attributes = True

class LoanBase(BaseModel):
    loan_type: str
    amount: float
    tenure: int
    interest_rate: float
    purpose: str

class LoanCreate(LoanBase):
    company_id: int

class Loan(LoanBase):
    id: int
    company_id: int
    class Config:
        from_attributes = True

class DocumentBase(BaseModel):
    filename: str
    category: str
    company_id: int

class Document(DocumentBase):
    id: int
    file_path: str
    status: str
    upload_date: datetime
    class Config:
        from_attributes = True

class FinancialDataSchema(BaseModel):
    revenue: Optional[float] = None
    profit: Optional[float] = None
    total_assets: Optional[float] = None
    total_liabilities: Optional[float] = None
    debt: Optional[float] = None
    cashflow: Optional[float] = None

    class Config:
        from_attributes = True
