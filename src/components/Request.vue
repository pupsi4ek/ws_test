<template>
  <div class="Request">
    <h3>Запросить <input type="number" v-model="quantity" /> раз</h3>
    <button id="send" class="button-accept" :class="{ disabled: !logic }" @click="startRequests()" v-bind="{ disabled: !logic }">Выполнить</button>
    <button id="stop" class="button-decline" :class="{ disabled: stop_disabled }" @click="stopRequests()" v-bind="{ disabled: stop_disabled }">
      Остановить
    </button>
    <span v-if="loading" id="progress">&nbsp; Выполняется запрос...</span>
    <br />
    <h3>Полученные UUID:</h3>
    <ul>
      <li v-for="(item, i) in uuid_list" :key="i">
        <span class="numeration">{{ i + 1 }}.</span>{{ item.uuid }} &nbsp; Время: {{ item.time }} &nbsp; sleep: {{ item.sleep }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import axios from 'axios';
import ws from '@/services/ws';

export default {
  name: 'Request',
  data() {
    return {
      send_disabled: false,
      stop_disabled: true,
      quantity: 1,
      loading: false,
      stopped: false,
      overtimed: 0,
      timeDelta: 0,
      ws: ws,
    };
  },
  computed: mapState({
    reqCount: 'reqCount',
    ansCount: 'ansCount',
    reqTotalCount: 'reqTotalCount',
    ansTotalCount: 'ansTotalCount',
    uuid_list: 'uuid_list',
    access: 'access',
    current_uuid() {
      return this.$store.state.uuid;
    },
    time(state) {
      return new Date(state.time).toISOString().substr(11, 8);
    },
    logic() {
      return this.$store.state.access && !this.send_disabled;
    },
  }),
  created() {
    this.ws.onmessage = (event) => {
      let message = JSON.parse(event.data);
      switch (message.message) {
        case 'block':
          this.send_disabled = true;
          this.$store.commit('setAccess', false);
          break;

        case 'go':
          this.send_disabled = false;
          this.$store.commit('setAccess', true);
          break;

        case 'welcome':
          if (message.id) {
            if (message.id != this.current_uuid) {
              this.$store.commit('setAccess', false);
            } else this.$store.commit('setAccess', true);
          } else this.$store.commit('setAccess', true);
          console.log('Your ID: ' + this.current_uuid);
          break;

        default:
          console.log('Some error');
          break;
      }
    };
  },
  methods: {
    ...mapMutations(['incrementReq', 'incrementAns', 'incrementTotalReq', 'incrementTotalAns', 'incrementTime', 'addID']),
    async request(resolveMethod, ctr = this.quantity) {
      if (this.overtimed < 3) {
        this.incrementTotalReq(1);
        await new Promise((resolve) => {
          this.send_disabled = true;
          this.stop_disabled = false;
          this.loading = true;
          let startPending = Date.now();
          axios.get('http://185.248.103.83:5115/api/get_uuid').then((res) => {
            if (!this.stopped) {
              this.addID(res.data);
              this.incrementAns(1);
              this.incrementReq(1);
              this.timeDelta = Date.now() - startPending;
              this.incrementTime(this.timeDelta);
            }
            this.incrementTotalAns(1);
            if (this.timeDelta / 1000 > 10) this.overtimed++;
            else this.overtimed = 0;
            resolve(res);
          });
        });
        ctr--;
      } else this.stopRequests();

      if (ctr === 0 || this.stopped) {
        this.resolveMethod();
      } else {
        await this.request(resolveMethod, ctr);
      }
    },
    resolveMethod() {
      this.send_disabled = false;
      this.stop_disabled = true;
      this.loading = false;
      this.stopped = false;
      this.quantity = 1;
      this.sendMessage('end');
    },
    async startRequests() {
      this.sendMessage('start');
      new Promise((res) => this.request(res)).then((r) => console.log(r));
    },
    stopRequests() {
      this.stopped = true;
      this.send_disabled = false;
      this.stop_disabled = true;
      this.loading = false;
      this.quantity = 1;
    },
    sendMessage(mes) {
      ws.send(JSON.stringify({ id: this.current_uuid, message: mes }));
    },
  },
};
</script>

<style scoped>
input {
  width: 4vw;
}
button {
  border: none;
  color: white;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
button:active {
  background-color: #052c6e;
  color: #6a92d4;
}
button:hover {
  background: #052c6e;
}
ul {
  list-style-type: none;
}
.button-accept {
  background-color: #1049a9;
  margin-right: 1vw;
}
.button-decline {
  background-color: #ff6a00;
}
.numeration {
  font-weight: bold;
  margin-right: 2vw;
}
.disabled {
  color: #fff;
  background-color: #6a92d4;
}
.disabled:hover {
  color: #fff;
  background-color: #6a92d4;
}
#progress {
  font-weight: bold;
}
</style>
