const amqp = require('amqplib');

async function consume() {
    const mainQueue = 'mainQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(mainQueue, { durable: true });

    console.log('Waiting for messages...');
    await channel.consume(mainQueue, (message) => {
        const content = message.content.toString();
        console.log(`Received: ${content}`);

        const randomFailure = Math.random() < 0.5; // Simulate failure
        if (randomFailure) {
            console.log('Processing failed, sending to Dead Letter Queue...');
            channel.nack(message); // Not acknowledged, dead-lettered
        } else {
            console.log('Processing succeeded.');
            channel.ack(message);
        }
    });
}

consume().catch(console.error);
