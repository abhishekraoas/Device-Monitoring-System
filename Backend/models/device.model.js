const mongoose = require("mongoose");

const processSchema = new mongoose.Schema({
  pid: Number,
  ppid: Number,
  command: String,
  isSuspicious: { type: Boolean, default: false }
});

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  os: String,
  type: String, // e.g., desktop, android, mac
  status: { type: String, enum: ['online', 'offline', 'error'], default: 'offline' },
  ipAddress: String,
  macAddress: String,
  cpuUsage: Number,        // in percentage
  memoryUsage: Number,     // in percentage
  diskUsage: Number,       // optional
  temperature: Number,     // in Celsius
  location: String,        // optional for tagging by geography
  processes: [processSchema], // detailed running processes
  additionalInfo: mongoose.Schema.Types.Mixed, // flexibility for dynamic metadata
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Device", deviceSchema);
