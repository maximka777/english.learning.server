const express = require('express');
let app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

const routes = require('./routes');
app.use(routes);

module.exports = app;