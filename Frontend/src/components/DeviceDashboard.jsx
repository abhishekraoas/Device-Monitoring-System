import React, { useEffect, useState } from "react";
import axios from "axios";

const DeviceDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/devices"); // adjust if your backend port is different
      setDevices(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 5000); // auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📡 Device Monitoring Dashboard</h2>
      {loading ? (
        <p>Loading devices...</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>CPU (%)</th>
              <th>Memory (%)</th>
              <th>Temp (°C)</th>
              <th>IP</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device._id}>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>
                  <span
                    style={{
                      color:
                        device.status === "online"
                          ? "green"
                          : device.status === "error"
                          ? "red"
                          : "gray",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {device.status}
                  </span>
                </td>
                <td>{device.cpuUsage}</td>
                <td>{device.memoryUsage}</td>
                <td>{device.temperature}</td>
                <td>{device.ipAddress}</td>
                <td>{new Date(device.lastUpdated).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeviceDashboard;
