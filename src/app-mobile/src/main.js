import Vue from 'vue'
import App from './App.vue'

var socket = io('http://localhost:3000');

socket.emit('chat message', 'input.value');

socket.on('server-ok', (data) => {
  console.log('here')
  console.log(data)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
