import requests

url = 'http://127.0.0.1:5002/api/authenticate'
data = {
    'username': 'jano',
    'password': 'kamarati'
}

response = requests.post(url, json=data)

print(f"Status Code: {response.status_code}")
print(f"Response JSON: {response.json()}")