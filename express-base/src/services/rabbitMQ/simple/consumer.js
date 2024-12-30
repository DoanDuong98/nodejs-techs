const amqp = require('amqplib');

async function receiveMessage() {
    const queueName = 'exampleQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, {
        durable: false, // Queue survives RabbitMQ restarts if true
    });

    console.log(`Waiting for messages in ${queueName}...`);

    channel.consume(queueName, (message) => {
        console.log(`Received: ${message.content.toString()}`);
        channel.ack(message); // Acknowledge the message
    });
}

receiveMessage().catch(console.error);