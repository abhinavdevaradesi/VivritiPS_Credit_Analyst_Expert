import os
import shutil
from fastapi import UploadFile
from sqlalchemy.orm import Session
from .. import models, schemas

UPLOAD_DIR = "uploads"

def save_upload_file(upload_file: UploadFile, company_id: int, category: str, db: Session):
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)
        
    file_path = os.path.join(UPLOAD_DIR, f"{company_id}_{category}_{upload_file.filename}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
        
    db_document = models.Document(
        company_id=company_id,
        filename=upload_file.filename,
        category=category,
        file_path=file_path,
        status="uploaded"
    )
    
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def list_documents(company_id: int, db: Session):
    return db.query(models.Document).filter(models.Document.company_id == company_id).all()
