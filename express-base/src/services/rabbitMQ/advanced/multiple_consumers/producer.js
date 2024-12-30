const amqp = require('amqplib');

async function sendMessage() {
    const queueName = 'taskQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, {
        durable: true, // Ensures tasks survive broker restarts
    });

    for (let i = 1; i <= 10; i++) {
        const message = `Task ${i}`;
        channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
        console.log(`Sent: ${message}`);
    }

    setTimeout(() => connection.close(), 500);
}

sendMessage().catch(console.error);

