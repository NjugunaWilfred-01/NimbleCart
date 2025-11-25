import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize auth store
const authStore = useAuthStore()
authStore.restoreSession()

// Handle SPA routing for GitHub Pages
// This code handles the redirect from 404.html
const l = window.location
if (l.search.startsWith('?/?')) {
  // Extract the path from the query string
  const path = l.search.slice(2).split('&').find(param => !param.includes('='))
  if (path) {
    // Decode the path and navigate to it
    const decodedPath = path.replace(/~and~/g, '&')
    router.push(decodedPath)
  }
}

app.mount('#app')
