import Vue from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css"

var socket = io('http://localhost:3000')

window.EventBus = new Vue

socket.on('newDeckConfig', (deckConfig) => EventBus.$emit('newDeckConfig', deckConfig))

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
