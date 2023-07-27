import requests
from config import ALPHA_VANTAGE_API_KEY, OPENAI_API_KEY
from openai_client import OpenaiClient

ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query?"


# Function to fetch company overviews from Alpha Vantage API
def get_company_overviews(companies):
    company_overviews = {}

    query_endpoint = ALPHA_VANTAGE_BASE_URL + "function=OVERVIEW"

    for company in companies:
        url = query_endpoint + f"&symbol={company}&apikey={ALPHA_VANTAGE_API_KEY}"
        response = requests.get(url)
        if response.status_code == 200:
            company_overview = response.json()
            company_overviews[company] = company_overview["Description"]

    return company_overviews


# Function to analyze ethical concerns with OpenAI API
def analyze_ethical_concerns(ethical_concerns, company_overviews):
    client = OpenaiClient()
    client.add_overviews(company_overviews)
    client.add_ethical_considerations(ethical_concerns)
    findings = client.get_findings()
    return findings
