const KafkaJs = require("kafkajs");

const clientId = "kafka-app";
const brokers = ["localhost:9092"];
const topic = "message-log";

// initialize a new kafka client and initialize a producer from it
const kafka = new KafkaJs.Kafka({ clientId, brokers });
const producer = kafka.producer({ createPartitioner: KafkaJs.Partitioners.LegacyPartitioner });

// we define an async function that writes a new message each second
const produce = async () => {
    await producer.connect();
    let i = 0;

    // after the produce has connected, we start an interval timer
    setInterval(async () => {
        try {
            // send a message to the configured topic with
            // the key and value formed from the current value of `i`
            await producer.send({
                topic,
                messages: [
                    {
                        key: String(i),
                        value: "this is message " + i,
                    },
                ],
            });

            // if the message is written successfully, log it and increment `i`
            console.log("writes: ", i)
            i++;
        } catch (err) {
            console.error("could not write message " + err)
        }
    }, 1000);
}

