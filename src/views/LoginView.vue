<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Main Card Container -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="px-8 pt-8 pb-6">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome to NimbleCart</h2>
            <p class="text-gray-600">Manage your products with ease</p>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="px-8">
          <div class="flex border-b border-gray-200">
            <button
              @click="activeTab = 'signin'"
              :class="[
                'flex-1 py-3 px-4 text-center font-medium transition-colors duration-200',
                activeTab === 'signin'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              Sign In
            </button>
            <button
              @click="activeTab = 'signup'"
              :class="[
                'flex-1 py-3 px-4 text-center font-medium transition-colors duration-200',
                activeTab === 'signup'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              Sign Up
            </button>
          </div>
        </div>

        <!-- Forms Container -->
        <div class="px-8 py-6">
          <!-- Sign In Form -->
          <form v-if="activeTab === 'signin'" class="space-y-6" @submit.prevent="handleLogin">
            <div class="space-y-4">
              <div>
                <label for="signin-username" class="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="signin-username"
                  name="username"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter your username"
                  v-model="signinCredentials.username"
                />
              </div>
              <div>
                <label for="signin-password" class="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="signin-password"
                  name="password"
                  type="password"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter your password"
                  v-model="signinCredentials.password"
                />
              </div>
            </div>

            <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {{ error }}
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign In</span>
            </button>
          </form>

          <!-- Sign Up Form -->
          <form v-else class="space-y-6" @submit.prevent="handleSignup">
            <div class="space-y-4">
              <div>
                <label for="signup-firstname" class="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="signup-firstname"
                  name="firstname"
                  type="text"
                  autocomplete="given-name"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter your first name"
                  v-model="signupData.firstName"
                />
              </div>
              <div>
                <label for="signup-lastname" class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="signup-lastname"
                  name="lastname"
                  type="text"
                  autocomplete="family-name"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter your last name"
                  v-model="signupData.lastName"
                />
              </div>
              <div>
                <label for="signup-username" class="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  :key="'signup-username-' + activeTab"
                  id="signup-username"
                  name="signup-username"
                  type="text"
                  autocomplete="off"
                  data-form-type="signup"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Choose a username"
                  v-model="signupData.username"
                />
              </div>
              <div>
                <label for="signup-email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Enter your email"
                  v-model="signupData.email"
                />
              </div>
              <div>
                <label for="signup-password" class="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Create a password"
                  v-model="signupData.password"
                />
              </div>
            </div>

            <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {{ error }}
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
              <span v-else>Create Account</span>
            </button>
          </form>
        </div>

        <!-- Footer -->
        <div class="px-8 py-4 bg-gray-50 border-t border-gray-200">
          <p class="text-xs text-center text-gray-600">
            For demo purposes, use: <strong>emilys / emilyspass</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('signin')
const isLoading = ref(false)
const error = ref<string | null>(null)

const signinCredentials = reactive({
  username: '',
  password: '',
})

const signupData = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
})

// Clear username field when switching to signup tab
watch(activeTab, (newTab) => {
  if (newTab === 'signup') {
    signupData.username = ''
  }
})

const handleLogin = async () => {
  isLoading.value = true
  error.value = null

  try {
    await authStore.login(signinCredentials)
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed'
  } finally {
    isLoading.value = false
  }
}

const handleSignup = async () => {
  isLoading.value = true
  error.value = null

  try {
    // Create the user account
    await authStore.signup(signupData)

    // Switch to sign in tab and pre-fill credentials
    activeTab.value = 'signin'
    signinCredentials.username = signupData.username
    signinCredentials.password = signupData.password

    // Clear signup form
    Object.keys(signupData).forEach(key => {
      signupData[key as keyof typeof signupData] = ''
    })

    error.value = 'Account created successfully! You can now sign in with your username or email.'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Signup failed'
  } finally {
    isLoading.value = false
  }
}
</script>
