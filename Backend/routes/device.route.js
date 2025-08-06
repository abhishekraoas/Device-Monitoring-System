const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller'); // ✅ Adjust path if needed

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: API for managing devices
 */

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Get all devices
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: List of all devices
 */
router.get('/', deviceController.getAllDevices);

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: Device created successfully
 */
router.post('/', deviceController.createDevice);

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Get device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device found
 *       404:
 *         description: Device not found
 */
router.get('/:id', deviceController.getDeviceById);

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     summary: Update device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Device updated
 */
router.put('/:id', deviceController.updateDevice);

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Delete device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device deleted
 */
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;
