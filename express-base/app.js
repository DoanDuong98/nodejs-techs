const express = require('express');
const morgan = require("morgan");
const logger = require("./src/logger/logger");
const app = express();

// init middleware
app.use(morgan('combined', { stream: logger.stream }));


// redis
const initRedis = require('./src/dbs/init.redis');
// initRedis.initRedis();

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
