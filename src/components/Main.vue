<template>
  <div class="Main">
    <h3>Количество запросов: {{ reqCount }} из {{ reqTotalCount }}</h3>
    <h3>Количество ответов: {{ ansCount }} из {{ ansTotalCount }}</h3>
    <h3>Времени затрачено: {{ time }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Main',
  data() {
    return {};
  },
  computed: mapState({
    reqCount: 'reqCount',
    ansCount: 'ansCount',
    reqTotalCount: 'reqTotalCount',
    ansTotalCount: 'ansTotalCount',
    time(state) {
      return new Date(state.time).toISOString().substr(11, 8);
    },
  }),
};
</script>
