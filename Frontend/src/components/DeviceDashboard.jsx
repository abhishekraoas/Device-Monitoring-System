import React, { useEffect, useState } from "react";
import axios from "axios";

const DeviceDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monitoring, setMonitoring] = useState(false); // initially false
  const [intervalId, setIntervalId] = useState(null);

  // Function to fetch devices from the backend
  const fetchDevices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/devices");
      setDevices(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  // Start monitoring: call fetch every 5s
  const startMonitoring = () => {
    if (!intervalId) {
      fetchDevices(); // fetch immediately
      const id = setInterval(fetchDevices, 5000);
      setIntervalId(id);
      setMonitoring(true);
    }
  };

  // Stop monitoring
  const stopMonitoring = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setMonitoring(false);
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>📡 Device Monitoring Dashboard</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={startMonitoring}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: monitoring ? "not-allowed" : "pointer",
            opacity: monitoring ? 0.6 : 1,
          }}
          disabled={monitoring}
        >
          Start Monitoring
        </button>
        <button
          onClick={stopMonitoring}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: !monitoring ? "not-allowed" : "pointer",
            opacity: !monitoring ? 0.6 : 1,
          }}
          disabled={!monitoring}
        >
          Stop Monitoring
        </button>
      </div>

      {loading ? (
        <p>Loading devices...</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>CPU Usage</th>
              <th>Memory Usage</th>
              <th>Temperature</th>
              <th>IP Address</th>
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
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      marginRight: "8px",
                      backgroundColor:
                        device.status === "online"
                          ? "green"
                          : device.status === "error"
                          ? "red"
                          : "gray",
                    }}
                  ></span>
                  <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                    {device.status}
                  </span>
                </td>
                <td>{device.cpuUsage}%</td>
                <td>{device.memoryUsage}%</td>
                <td>{device.temperature !== null ? `${device.temperature}°C` : "N/A"}</td>
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
