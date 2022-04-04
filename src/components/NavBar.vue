<template>
  <header class="NavBar">
    <ul>
      <li>
        <router-link to="/"
          ><a><h3>Информация</h3></a></router-link
        >
      </li>
      <li>
        <router-link to="Request"
          ><a><h3>Запрос</h3></a></router-link
        >
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {};
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #1049a9;
}
li {
  float: left;
}
li a {
  display: block;
  color: #fff;
  text-align: center;
  padding: 2px 14px;
  text-decoration: none;
}
li a:hover {
  background-color: #052c6e;
  color: #6a92d4;
}
</style>
