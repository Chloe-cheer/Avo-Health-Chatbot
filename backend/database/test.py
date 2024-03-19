import requests

myobj = {'somekey': 'somecontent',
         "test": "test"}
resp = requests.post("http://localhost:3002", data = myobj)

print(resp.text)