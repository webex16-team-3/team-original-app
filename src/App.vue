<template>
  <RakutenAPIVue>
    <div></div>
  </RakutenAPIVue>
  <router-view />
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/result">Result</router-link>
  </div>
</template>

<script>
import RakutenAPIVue from "./components/RakutenAPI.vue"
export default {
  components: { RakutenAPIVue },
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
