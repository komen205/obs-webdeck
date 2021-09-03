import Vue from 'vue'
import App from './app-desktop/App.vue'
import "tailwindcss/tailwind.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
