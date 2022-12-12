<template>
  <router-view />
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/home2">Home2</router-link> |
    <router-link to="/result">Result</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style>
body {
  margin: 0;
}
</style>
