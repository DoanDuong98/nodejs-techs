const amqp = require('amqplib');

async function sendMessage() {
    const mainQueue = 'mainQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange('deadLetterExchange', 'direct', { durable: true });
    await channel.assertQueue('deadLetterQueue', { durable: true });
    await channel.bindQueue('deadLetterQueue', 'deadLetterExchange', 'retry');

    await channel.assertQueue(mainQueue, {
        durable: true,
        arguments: {
            'x-dead-letter-exchange': 'deadLetterExchange',
            'x-dead-letter-routing-key': 'retry',
        },
    });

    channel.sendToQueue(mainQueue, Buffer.from('Task to process'), { persistent: true });
    console.log('Message sent to mainQueue');

    setTimeout(() => connection.close(), 500);
}

sendMessage().catch(console.error);
