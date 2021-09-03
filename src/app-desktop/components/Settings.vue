<template>
  <div class="hello">
    <h1>Settings</h1>

    <input v-model="label">
    <button @click="addButton"> add </button>

    <div>
      <pre>
        {{ JSON.stringify(this.deckConfig, undefined, 2) }}
      </pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    label: '',
    deckConfig: {
      buttons: [],
    },
  }),
  created() {
    this.loadFromLocalStorage()
  },
  methods: {
    loadFromLocalStorage() {
      const deckConfig = JSON.parse(
        localStorage.getItem('deckConfig')
      )
      if(! deckConfig) {
        return
      }
      this.deckConfig = deckConfig
      this.sendToMobile()
    },
    addButton() {
      const button = {
        label: this.label,
      }
      this.deckConfig.buttons.push(button)
      this.label = ''
      localStorage.setItem('deckConfig', JSON.stringify(this.deckConfig))
      this.sendToMobile()
    },
    sendToMobile() {
      axios
        .post("http://localhost:3000/api/deck-config", this.deckConfig)
        .then(r => {
          console.log(r)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>
