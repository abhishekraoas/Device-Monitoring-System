import requests
import random
import json
from datetime import datetime

# Sample data generation
device_data = {
    "name": f"Device-{random.randint(100, 999)}",
    "type": random.choice(["Sensor", "Camera", "Router"]),
    "status": random.choice(["online", "offline"]),
    "ipAddress": f"192.168.0.{random.randint(1, 255)}",
    "cpuUsage": round(random.uniform(0, 100), 2),
    "memoryUsage": round(random.uniform(0, 100), 2),
    "temperature": round(random.uniform(20, 90), 2)
}

# POST to backend API
url = "http://localhost:5000/api/devices"  # change port if different
headers = {'Content-Type': 'application/json'}

response = requests.post(url, headers=headers, json=device_data)

if response.status_code == 201:
    print("✅ Device posted successfully:", response.json())
else:
    print("❌ Failed to post device:", response.status_code, response.text)
