const express = require('express');

const router = express.Router();

// Retrieve all active alarms
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Mock of alarm index - Should retrieve all open alarms',
    data: []
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
router.post('/add', (req, res) => {
  res.status(201).json({
    message: 'Mock of Create Alarm'
  });
  // return alarmid
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
