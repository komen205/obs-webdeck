import Vue from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css"
import { io } from "socket.io-client"

console.log(process.env.VUE_APP_SOCKETIO_SERVER)
const socket = io(process.env.VUE_APP_SOCKETIO_SERVER)

window.EventBus = new Vue

socket.on('newDeckConfig', (deckConfig) => EventBus.$emit('newDeckConfig', deckConfig))

EventBus.$on('triggerObs', (event) => socket.emit('triggerobs','event'))

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
