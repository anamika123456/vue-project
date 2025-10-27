<template>
  <div>
    <div v-if="messages.length">
      <h3>Received Messages:</h3>
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
    <div v-else>
      <p>No messages received yet.</p>
    </div>
  </div>
</template>

<script>
  import { cardsMixins } from "@/plugins/cards";
export default {
  mixins: [cardsMixins],
  data() {
    return {
      messages: [], // Array to store incoming messages
      eventSource: null, // Reference to the EventSource connection
    };
  },
  methods: {
    startSSE() {
      

      const sseUrl = 'https://devapi-cp.capitalwallet.site/notifications/1749'; 

      // Create a new EventSource instance
      this.eventSource = new EventSource(sseUrl);
      console.log('this.eventSource===', this.eventSource)
      // Listen for 'message' events (the default event type for SSE)
      this.eventSource.onmessage = (event) => {
        console.log('Received message:', event.data);
        this.messages.push(event.data); // Add the incoming message to the list
      };

      // Optional: Listen for error events
      this.eventSource.onerror = (error) => {
        console.error('Error with SSE connection:', error);
        this.eventSource.close(); // Close the connection on error
      };
    },
    stopSSE() {
      if (this.eventSource) {
        this.eventSource.close(); // Close the SSE connection
        console.log('SSE connection closed.');
      }
    },
  },
  mounted() {
    this.startSSE(); // Automatically start the SSE connection when the component is mounted
  },
  beforeDestroy() {
    this.stopSSE(); // Clean up the SSE connection before the component is destroyed
  },
};
</script>

<style scoped>
/* Add any styling you want here */
</style>