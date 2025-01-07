const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Kafka setup
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

producer.on('ready', () => console.log('Producer is ready.'));
producer.on('error', (err) => console.error('Producer error:', err));

// API to produce messages
app.post('/orders', async (req, res) => {
    const { orderId, userId, items } = req.body;
    const event = JSON.stringify({ orderId, eventType: "create_order", userId, items, status: 'NEW' });

    const payloads = [{ topic: 'order-events', key: userId, messages: event }];

    producer.send(payloads, (err) => {
        if (err) {
            console.error('Error producing message:', err);
            return res.status(500).send('Error placing order.');
        }
        res.status(200).send('Order placed successfully.');
    });
});

app.listen(3000, () => console.log('Order service running on port 3000'));
