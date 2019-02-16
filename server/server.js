const express = require('express');
const pathfinder = require('./pathfinder.js');

const app = express();

app.use('/getPath/:start-:end', async function(req, res, next) {
    res.locals.path = await pathfinder.getPath(+req.params.start, +req.params.end);
    next();
});

app.get('/getPath/:start-:end', function(req, res) {
    res.send(res.locals.path);
});

app.listen(5000);
