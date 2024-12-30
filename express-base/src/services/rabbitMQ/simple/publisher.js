const amqp = require('amqplib');

async function sendMessage() {
    const queueName = 'exampleQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, {
        durable: false, // Queue survives RabbitMQ restarts if true
    });

    const message = 'Hello, RabbitMQ!';
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Sent: ${message}`);

    setTimeout(() => {
        connection.close();
    }, 500);
}

sendMessage().catch(console.error);
