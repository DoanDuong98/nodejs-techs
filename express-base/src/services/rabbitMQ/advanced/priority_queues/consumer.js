const amqp = require('amqplib');

async function receiveMessage() {
    const queueName = 'priorityQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    console.log('Waiting for priority messages...');

    channel.consume(queueName, (message) => {
        console.log(`Received: ${message.content.toString()}`);
        channel.ack(message);
    });
}

receiveMessage().catch(console.error);
