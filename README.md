# AI Enterprise Credit Underwriting & Risk Intelligence Platform

## Overview
A comprehensive full-stack platform that transforms unstructured financial documents into AI-generated investment/loan assessment reports.

### Key Features
- **Multi-step Entity Onboarding**: Collect company and loan details.
- **Document Repository**: Structured upload of ALM, Shareholding, Borrowing, and Annual Reports.
- **AI Extraction Engine**: Automatic parsing of PDFs and Excel files into financial schemas.
- **Risk Analysis Dashboard**: Credit scoring, financial health indicators, and secondary market signals.
- **GenAI Report Generation**: Automated creation of structured investment reports with SWOT analysis.

---

## Tech Stack
- **Frontend**: Next.js 15, Tailwind CSS, Lucide React, Recharts.
- **Backend**: FastAPI (Python 3.14), SQLAlchemy, Pydantic.
- **AI Processing**: pdfplumber, pandas.
- **Database**: SQLite (Local), Migratable to PostgreSQL.

---

## Getting Started

### Backend Setup
1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   *(Note: Core dependencies: fastapi, uvicorn, sqlalchemy, pdfplumber, pandas)*
4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the dashboard at `http://localhost:3000`.

---

## Deployment Instructions

### Frontend (Vercel)
- Connect your GitHub repository.
- Set root directory to `frontend`.
- Environment Variables: `NEXT_PUBLIC_API_URL` (pointing to your backend).

### Backend (Render / AWS)
- Deploy using the provided `backend` directory.
- Build Command: `pip install -r requirements.txt`.
- Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

### Database
- For production, swap `SQLALCHEMY_DATABASE_URL` in `backend/app/database.py` to your PostgreSQL connection string.

---
*Developed for Vivriti Intelligence Operations.*
