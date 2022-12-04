<template>
  <Home />
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
import Home from "@/components/Home.vue"

export default {
  components: {
    Home,
  },
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
