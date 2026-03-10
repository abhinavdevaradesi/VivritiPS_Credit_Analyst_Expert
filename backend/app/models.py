from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    cin = Column(String, unique=True, index=True)
    pan = Column(String, unique=True, index=True)
    sector = Column(String)
    subsector = Column(String)
    turnover = Column(Float)
    address = Column(String)
    website = Column(String)

    loans = relationship("Loan", back_populates="company")
    documents = relationship("Document", back_populates="company")

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    loan_type = Column(String)
    amount = Column(Float)
    tenure = Column(Integer)
    interest_rate = Column(Float)
    purpose = Column(String)

    company = relationship("Company", back_populates="loans")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    filename = Column(String)
    category = Column(String)  # ALM, Shareholding, Borrowing, Annual Report, Portfolio
    file_path = Column(String)
    status = Column(String, default="uploaded")  # uploaded, processing, reviewed
    upload_date = Column(DateTime, default=datetime.datetime.utcnow)

    company = relationship("Company", back_populates="documents")
    financial_data = relationship("FinancialData", back_populates="document", uselist=False)

class FinancialData(Base):
    __tablename__ = "financial_data"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    revenue = Column(Float, nullable=True)
    profit = Column(Float, nullable=True)
    total_assets = Column(Float, nullable=True)
    total_liabilities = Column(Float, nullable=True)
    debt = Column(Float, nullable=True)
    cashflow = Column(Float, nullable=True)
    raw_json = Column(String, nullable=True)  # Store intermediate extraction results

    document = relationship("Document", back_populates="financial_data")
