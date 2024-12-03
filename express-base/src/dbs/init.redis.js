'use strict'

const redis = require("redis")

// create a new client redis

// const client = redis.createClient({
//     host: '127.0.0.1',
//     port: 6379,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
// })
//
// client.on('error', (err) => {})
//
// module.exports = client

let client = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error'
}, connectionTimeout = null;

const REDIS_CONNECT_TIMEOUT = 3000, REDIS_CONNECT_MESSAGE = {
    code: -99,
    message: 'redis connect error'
};

const handleTimeout = () => {
    connectionTimeout = setTimeout( () => {
        throw new Error(REDIS_CONNECT_MESSAGE.message)
    }, REDIS_CONNECT_TIMEOUT);
}

const handleEventConn = (connectionRedis) => {
    connectionRedis.on(statusConnectRedis.CONNECT, () => {
        console.log('Connection Redis connected')
        clearTimeout(connectionTimeout)
    });

    connectionRedis.on(statusConnectRedis.END, () => {
        console.log('Connection Redis disconnected');
        // connect retry
        handleTimeout();
    });

    connectionRedis.on(statusConnectRedis.RECONNECT, () => {
        console.log('Connection Redis reconnecting');
        clearTimeout(connectionTimeout);
    });

    connectionRedis.on(statusConnectRedis.ERROR, (err) => {
        console.log('Connection Redis error', err);
        handleTimeout();
    });

}

const initRedis = () => {
    const instance = redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME,
    });
    client.instance = instance;
    handleEventConn(instance)
}

const getRedis = () => client

const closeRedis = () => {}

module.exports = {
    initRedis,
    getRedis,
    closeRedis,
}
