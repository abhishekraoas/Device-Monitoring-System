const express = require('express');
const router = express.Router();
const Device = require('../models/device.model');

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         status:
 *           type: string
 *         ipAddress:
 *           type: string
 *         cpuUsage:
 *           type: number
 *         memoryUsage:
 *           type: number
 *         temperature:
 *           type: number
 */

// Get all devices
router.get('/', async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

// Add a device
router.post('/', async (req, res) => {
  const device = new Device(req.body);
  await device.save();
  res.status(201).json(device);
});

// Update device
router.put('/:id', async (req, res) => {
  const updated = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete device
router.delete('/:id', async (req, res) => {
  await Device.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
