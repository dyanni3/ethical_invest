import requests

url = 'http://127.0.0.1:5000/analyze'
data = {
    'ethical_concerns': ['Environmental impact', 'Labor practices'],
    'companies': ['AAPL', 'GOOGL', 'MSFT', 'HAL', 'AMZN']
}

response = requests.post(url, json=data)

if response.status_code == 200:
    analysis_results = response.json()
    print(analysis_results)

    print(analysis_results['AMZN']['Labor practices'])

    print(analysis_results['HAL']['Environmental impact'])

    print(analysis_results['GOOGL'])
else:
    print(f"Request failed with status code {response.status_code}.")
