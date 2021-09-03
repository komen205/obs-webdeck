<template>
  <div id="app">
    Here is where the buttons are going to be.
    
    <button v-for="(button, i) in deckConfig.buttons" :key=i>
      {{ button.label }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    deckConfig: {
      buttons: [],
    },
  }),
  created() {
    window.EventBus.$on('newDeckConfig', this.updateDeckConfig)
  },
  methods: {
    updateDeckConfig(deckConfig) {
      this.deckConfig = deckConfig
    },
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
