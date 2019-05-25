const express = require('express');
const alarmService = require('../services/alarmsService');

const router = express.Router();

// Retrieve all active alarms
router.get('/', async (req, res) => {
  const activeAlarms = await alarmService.getAllAlarms();
  res.status(200).json({
    message: 'Mock of alarm index - Should retrieve all open alarms',
    data: activeAlarms
  });
  // TODO: Import active alarms from the alarmService
});

// Get alarm by id
router.get('/:id', (req, res) => {
  res.status(200).json({
    message: 'Mock of alarm index - Should retrieve all open alarms',
    data: []
  });
  // TODO: Import active alarms from the alarmService
});

// Add new alarm
router.post('/add', async (req, res) => {
  // TODO: Validate comparison to avoid code injection
  const { symbol, targetPrice, comparison } = req.body;
  const alarmObj = await alarmService.addAlarm(symbol, targetPrice, comparison);
  res.status(201).json({
    message: 'Mock of Create Alarm',
    data: alarmObj
  });
  // return alarm object
  // TODO: Invoke createAlarm from the alarmService
});

// Drop alarm
router.post('/drop:id', (req, res) => {
  const id = req.params.id;
  res.status(201).json({
    message: 'Mock of Create Alarm'
  });
});

module.exports = router;
