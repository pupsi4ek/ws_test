<template>
  <div id="app">
    <NavBar />
    <div class="container"><router-view /></div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import { uuid } from 'vue-uuid';
import ws from './services/ws';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      ws: ws,
      uuid: uuid.v4(),
    };
  },
  computed: {
    current_uuid() {
      return this.$store.state.uuid;
    },
    messages() {
      return this.$store.state.messages;
    },
  },
  created() {
    this.$store.commit('setUUID', uuid.v4());
    console.log('Starting ws to WebSocket Server');

    this.ws.onmessage = (event) => {
      this.$store.commit('addMessage', event.data);
      let message = JSON.parse(event.data);
      if (message.message === 'welcome') {
        if (message.id) {
          if (message.id != this.current_uuid) {
            this.$store.commit('setAccess', false);
          } else this.$store.commit('setAccess', true);
        } else this.$store.commit('setAccess', true);
      }
    };

    this.ws.onopen = (event) => {
      console.log(event);
      console.log('Successfully connected to the echo websocket server...');
    };
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
h1 {
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.container {
  margin: 0 3vw;
  min-height: 75%;
  margin-bottom: -50px;
}
</style>
