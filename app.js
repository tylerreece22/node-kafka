const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(), // Default is localhost:9092
    producer = new Producer(client),
    admin = new kafka.Admin(client),
    payloads = [
        {topic: 'kafka_test_topic', messages: 'I am a message'},
        // {topic: 'other_kafka_topic', messages: 'other message'},
    ],
    consumer = new Consumer(
        client,
        [
            {topic: 'kafka_test_topic'},
        ],
        {
            autoCommit: true // true if you want to update the client offset false if you only want to update the server offset
        }
    );

// Any message that comes through with under a registered topic will be displayed in console
consumer.on('message', function (message) {
    console.log(message);
});

// When the producer is ready it will just send the messages in payload object
producer.on('ready', () => {
    console.log(`Producer ready. Sending data...`);
    producer.send(payloads, (error, result) => {
        console.log(error || result);
    });
});

producer.on('error', (err) => {
    console.log('Something went wrong in producer: ', err)
})

// If you care to list the groups
// admin.listGroups((err, res) => {
//     console.log('consumerGroups', res);
// });

