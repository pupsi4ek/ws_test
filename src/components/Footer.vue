<template>
  <div class="footer">
    <footer>
      <ul>
        <li>
          <a href="https://github.com/pupsi4ek"><h4>GitHub</h4></a>
        </li>
        <li><h4>2022</h4></li>
        <li>
          <h4>Smirnov Danila</h4>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
li {
  float: right;
  display: block;
  padding: 2px 20px;
  color: #6a92d4;
}
li a {
  color: #6a92d4;
  text-align: center;
  text-decoration: none;
}
li a:hover {
  color: #4479d4;
}
.footer {
  margin-top: 50px;
  height: 20vh;
  background-color: #29497f;
  padding: 0 5vw;
}
</style>
