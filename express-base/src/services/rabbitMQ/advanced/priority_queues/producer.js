const amqp = require('amqplib');

async function sendMessage() {
    const queueName = 'priorityQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, {
        durable: true,
        arguments: { 'x-max-priority': 10 },
    });

    channel.sendToQueue(queueName, Buffer.from('Low priority task'), { priority: 1 });
    channel.sendToQueue(queueName, Buffer.from('High priority task'), { priority: 10 });

    console.log('Messages sent with priorities.');
    setTimeout(() => connection.close(), 500);
}

sendMessage().catch(console.error);
