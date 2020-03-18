import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'

import UI from './ui'
Vue.use(UI)

import CodeMirror from 'vue-codemirror-lite'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/monokai.css'
Vue.use(CodeMirror)

import Notifications from 'vue-notification'
Vue.use(Notifications)

Vue.prototype.$websocket = undefined

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
