import psutil
import socket
import requests
import platform
import time

while True:
    try:
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent

        # Handle temperature safely
        temp = None
        if hasattr(psutil, "sensors_temperatures"):
            try:
                temps = psutil.sensors_temperatures()
                if "coretemp" in temps:
                    temp = temps["coretemp"][0].current
                elif "cpu-thermal" in temps:
                    temp = temps["cpu-thermal"][0].current
                elif temps:
                    first_key = next(iter(temps))
                    temp = temps[first_key][0].current
            except Exception as e:
                print("Temperature read error:", e)
                temp = None

        ip = socket.gethostbyname(socket.gethostname())
        os_name = platform.system()

        data = {
            "name": "My Laptop",
            "type": os_name,
            "status": "online",
            "cpuUsage": cpu,
            "memoryUsage": memory,
            "temperature": temp,
            "ipAddress": ip

        }

        res = requests.post("http://localhost:5000/api/devices", json=data)
        print("Sent:", res.status_code, data)

    except Exception as e:
        print("Error:", e)

    time.sleep(5)  # send every 5 seconds
