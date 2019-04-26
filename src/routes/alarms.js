const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Mock of alarm index - Should retrieve all open alarms',
        data: []
    });
    // TODO: Import active alarms from the alarmService
});

router.post('/create', (req, res) => {
    res.status(201).json({
        message: 'Mock of Create Alarm'
    });
    // TODO: Invoke createAlarm from the alarmService
});

router.post('/drop:id', (req, res) => {
    const id = req.params.id;
    res.status(201).json({
        message: 'Mock of Create Alarm'
    });
});

module.exports = router;