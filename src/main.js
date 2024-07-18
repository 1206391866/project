
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@vant/touch-emulator';
import { DatePicker } from "vant";
import { Popup } from "vant";
import {Picker} from "vant"

const app = createApp(App)
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(DatePicker)
app.use(Popup)
app.use(Picker)

app.mount('#app')
