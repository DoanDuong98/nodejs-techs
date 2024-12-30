const amqp = require('amqplib');

async function receiveMessage(workerName) {
    const queueName = 'taskQueue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    console.log(`Worker ${workerName} waiting for messages in ${queueName}...`);

    channel.consume(queueName, (message) => {
        if (message) {
            console.log(`Worker ${workerName} received: ${message.content.toString()}`);
            setTimeout(() => {
                channel.ack(message);
                console.log(`Worker ${workerName} done processing.`);
            }, 1000); // Simulate a processing delay
        }
    });
}

receiveMessage('A').catch(console.error); // Run for worker A
// Run additional workers by duplicating this consumer code or running separate instances.

