import requests 
import json
import os
from dotenv import load_dotenv

load_dotenv()
jsonFile = open('tennis_courts.json')
data = json.load(jsonFile)

api_key = os.environ.get("Google_API_KEY")

url = "https://maps.googleapis.com/maps/api/staticmap?"
zoom = '20'
maptype = 'satellite'
size = '640x640'
# 242 - 281 zoom = 20
# 201 - 241 zoom = 19
# 161 - 200 zoom = 16
# 121 - 160 zoom = 17
# 81 - 120 zoom = 18
# 41 - 80 zoom = 19
# 1 - 40 zoom = 20

#78 photos removed due to poor quality

for i in range(241,282): 
    lat = data[i]['latitude']
    long = data[i]['longitude']
    name = data[i]['name']

    r = requests.get(f"{url}center={lat},{long}&zoom={zoom}&size={size}&maptype={maptype}&key={api_key}") 
    f = open(f'tennis-court-locator/dataset/images/new/{name}.png', 'wb') 
    
    f.write(r.content) 
    f.close() 

jsonFile.close()
