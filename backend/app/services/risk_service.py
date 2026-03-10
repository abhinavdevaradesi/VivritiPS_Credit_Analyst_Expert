from typing import List, Dict
import random

def calculate_risk_score(financial_data_list: List[Dict]) -> Dict:
    """
    Calculates various credit risk scores based on aggregated financial data.
    """
    if not financial_data_list:
        return {
            "credit_score": 0,
            "financial_health": "Insufficient Data",
            "risk_indicators": ["No financial data extracted"],
            "recommendation": "Hold - Missing Data"
        }
    
    # Simple aggregation for MVP
    avg_revenue = sum(d["revenue"] for d in financial_data_list)
    avg_profit = sum(d["profit"] for d in financial_data_list)
    avg_debt = sum(d["debt"] for d in financial_data_list)
    avg_assets = sum(d["total_assets"] for d in financial_data_list)
    
    # Calculate Ratios
    # Leverage: Debt to Assets
    leverage = avg_debt / avg_assets if avg_assets > 0 else 1.0
    # Interest Coverage: Profit to Debt (Simplified proxy)
    coverage = avg_profit / (avg_debt * 0.1) if avg_debt > 0 else 10.0
    
    score = 750 # Base score
    indicators = []
    
    if leverage > 0.6:
        score -= 100
        indicators.append("High leverage ratio (>0.6)")
    if coverage < 2.0:
        score -= 150
        indicators.append("Low interest coverage ratio")
    if avg_profit < 0:
        score -= 200
        indicators.append("Net loss in current period")
    else:
        indicators.append("Positive net income")
        
    # Health Score
    health_score = float(max(0.0, min(100.0, (score / 1000.0) * 100.0)))
    
    recommendation = "Approved"
    if health_score < 40:
        recommendation = "Rejected"
    elif health_score < 70:
        recommendation = "Conditional Approval"
        
    return {
        "credit_score": int(score),
        "health_score": int(health_score),
        "risk_indicators": indicators,
        "recommendation": recommendation,
        "reasoning": f"Based on leverage of {leverage:.2f} and coverage of {coverage:.2f}."
    }

def fetch_secondary_research(company_name: str) -> Dict:
    """
    Mocks external signal collection (News, Sector Growth, Industry Risks).
    """
    # In a real app, use News APIs or Scrapers
    signals = [
        {"type": "news", "sentiment": "positive", "title": f"{company_name} expands operations in South East Asia", "source": "Finance Today"},
        {"type": "sector", "sentiment": "neutral", "title": "Manufacturing sector growth slows to 4.2%", "source": "Industrial Bureau"},
        {"type": "legal", "sentiment": "negative", "title": "New environmental regulations may impact operational costs", "source": "Government Gazette"},
    ]
    
    return {
        "external_signals": signals,
        "market_sentiment": "Stable",
        "industry_risk_score": 68
    }
