const express = require('express');
const app = express();

// redis
const initRedis = require('./src/dbs/init.redis');
initRedis.initRedis();

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
