const winston = require("winston");
require("winston-daily-rotate-file");
const path = require("path");

const {
    format: { combine, colorize, timestamp, json },
} = winston;

const fileTransport = new winston.transports.DailyRotateFile({
    filename: "%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "3m",
    maxFiles: "7d",
    dirname: "logs",
});

const logger = winston.createLogger({
    level: "info",
    format: combine(colorize(), timestamp(), json()),
    transports: [fileTransport],
});

logger.stream = {
    write: (message) => {
        logger.info(message);
        console.log(message)
    },
};

module.exports = logger;
