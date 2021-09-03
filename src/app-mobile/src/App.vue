<template>
  <div id="app">
    Here is where the buttons are going to be.
    <button
        class="bg-purple-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-purple-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2"
        v-for="(button, i) in deckConfig.buttons"
        :key=i
    >
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
