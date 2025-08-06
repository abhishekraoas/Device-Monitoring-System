const Device = require("../models/device.model");

// GET all devices
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new device
exports.createDevice = async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET one device by ID
exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ message: "Not found" });
    res.json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update a device
exports.updateDevice = async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a device
exports.deleteDevice = async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
