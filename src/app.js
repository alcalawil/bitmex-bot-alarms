const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const alarmsRoute = require('./routes/alarms');
const indexRoute = require('./routes/index');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Prevent CORS Errors
app.use(cors());

// Routes that should be handled
app.use('/', indexRoute);
app.use('/alarms', alarmsRoute);

// Errors handling
app.use((req, res, next) => {
    let err = new Error('There was an error');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;