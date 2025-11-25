<template>
  <div class="flex h-screen bg-background-light dark:bg-background-dark font-display">
    <!-- Sidebar -->
    <aside class="w-64 flex flex-col p-6 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark">
      <!-- Logo Section -->
      <div class="flex items-center gap-3 mb-10">
        <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
          <span>N</span>
        </div>
        <div>
          <h1 class="font-bold text-lg text-text-light-primary dark:text-text-dark-primary">NimbleCart</h1>
          <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary">Admin Panel</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-grow">
        <ul>
          <li>
            <router-link
              to="/"
              exact-active-class="bg-blue-100 dark:bg-blue-900/40 text-primary dark:text-blue-300 font-semibold"
              class="flex items-center gap-3 px-4 py-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>📊</span>
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/products"
              active-class="bg-blue-100 dark:bg-blue-900/40 text-primary dark:text-blue-300 font-semibold"
              class="flex items-center gap-3 px-4 py-2 mt-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>📦</span>
              Products
            </router-link>
          </li>
          <li>
            <router-link
              to="/orders"
              active-class="bg-blue-100 dark:bg-blue-900/40 text-primary dark:text-blue-300 font-semibold"
              class="flex items-center gap-3 px-4 py-2 mt-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>🛒</span>
              Orders
            </router-link>
          </li>
          <li>
            <router-link
              to="/customers"
              active-class="bg-blue-100 dark:bg-blue-900/40 text-primary dark:text-blue-300 font-semibold"
              class="flex items-center gap-3 px-4 py-2 mt-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>👥</span>
              Customers
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Bottom Section -->
      <div>
        <ul>
          <li>
            <router-link
              to="/settings"
              active-class="bg-blue-100 dark:bg-blue-900/40 text-primary dark:text-blue-300 font-semibold"
              class="flex items-center gap-3 px-4 py-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>⚙️</span>
              Settings
            </router-link>
          </li>
          <li>
            <button
              @click="logout"
              class="flex items-center justify-center gap-3 px-4 py-3 mt-4 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-800 w-full transition-colors"
            >
              <span>🚪</span>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
