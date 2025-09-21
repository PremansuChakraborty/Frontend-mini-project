import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './stores/authStore'


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
