// File: servico-gestao/src/application/services/MessageBrokerService.js
// This is a simplified in-memory message broker for demonstration purposes.
// In a real-world scenario, you would use a dedicated message broker like RabbitMQ or Kafka.

class MessageBrokerService {
  constructor() {
    this.subscribers = {};
  }

  subscribe(topic, callback) {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
    }
    this.subscribers[topic].push(callback);
    console.log(`[MessageBroker] Subscribed to topic: ${topic}`);
  }

  publish(topic, data) {
    if (this.subscribers[topic]) {
      this.subscribers[topic].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[MessageBroker] Error processing message for topic ${topic}:`, error);
        }
      });
    }
    console.log(`[MessageBroker] Published to topic: ${topic} with data:`, data);
  }
}

// Export a singleton instance
module.exports = new MessageBrokerService();