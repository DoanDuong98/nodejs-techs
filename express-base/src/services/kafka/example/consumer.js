const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.ConsumerGroup(
    {
        kafkaHost: 'localhost:9092',
        groupId: 'order-processor-group',
        autoCommit: false,
    },
    ['order-events']
);

// Process messages
consumer.on('message', async (message) => {
    const event = JSON.parse(message.value);
    console.log('Processing order:', event);

    try {
        // Simulate processing logic
        if (!event.orderId) throw new Error('Invalid order event!');

        switch (event.eventType) {
            case 'create_order':
                // Xử lý logic tạo đơn
                break;
            case 'payment':
                // Xử lý logic thanh toán
                break;
            case 'cancel':
                // Xử lý logic hủy đơn
                break;
            default:
                console.error('Unknown event type:', event.eventType);
        }

        console.log(`Successfully processed order: ${event.orderId}`);
        consumer.commit();
    } catch (err) {
        console.error(`Error processing order ${event.orderId}:`, err.message);
        // Log error or send to a Dead Letter Queue for failed messages
    }
});

consumer.on('error', (err) => {
    console.error('Consumer error:', err);
});
