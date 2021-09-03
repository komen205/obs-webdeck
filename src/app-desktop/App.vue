<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    
    <Settings />

  </div>
</template>

<script>
import Settings from './components/Settings'

export default {
  name: 'App',
  components: {
    Settings,
  },
  methods: {
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
