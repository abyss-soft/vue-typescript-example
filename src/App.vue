<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link
        :to="{
          name: 'History',
          params: { id: 1 },
          query: { name: 'history' }
        }"
      >
        История
      </router-link>
      <router-link
        :to="{
          name: 'History',
          params: { id: 2 },
          query: { name: 'add' }
        }"
        >История добавлений</router-link
      >
      <router-link
        :to="{
          name: 'History',
          params: { id: 3 },
          query: { name: 'remove' }
        }"
        >История удалений</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("getDataFromServer");
  }
};
</script>
