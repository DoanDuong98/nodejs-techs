const amqp = require('amqplib');

async function retryConsumer() {
    const queueName = 'deadLetterQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    console.log('Waiting for dead-letter messages...');
    channel.consume(queueName, (message) => {
        console.log(`Retrying: ${message.content.toString()}`);
        channel.ack(message); // Retry logic goes here
    });
}

retryConsumer().catch(console.error);
