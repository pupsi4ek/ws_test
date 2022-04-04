import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';

const store = createStore({
  state: {
    uuid: null,
    reqCount: 0,
    ansCount: 0,
    reqTotalCount: 0,
    ansTotalCount: 0,
    uuid_list: [],
    messages: [],
    access: false,
    time: 0,
  },
  mutations: {
    setUUID(state, payload) {
      state.uuid = payload;
    },
    setAccess(state, payload) {
      state.access = payload;
    },
    addMessage(state, payload) {
      state.messages.push(payload);
    },
    incrementReq(state, payload) {
      state.reqCount += payload;
    },
    incrementAns(state, payload) {
      state.ansCount += payload;
    },
    incrementTotalReq(state, payload) {
      state.reqTotalCount += payload;
    },
    incrementTotalAns(state, payload) {
      state.ansTotalCount += payload;
    },
    incrementTime(state, payload) {
      state.time += payload;
    },
    addID(state, payload) {
      state.uuid_list.push(payload);
    },
  },
});

createApp(App).use(router).use(store).mount('#app');
