<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">Settings</h2>
      <p class="text-text-light-secondary dark:text-text-dark-secondary mt-1">Manage your account settings and preferences.</p>
    </div>

    <!-- Settings Sections -->
    <div class="space-y-8">
      <!-- Profile Photo Section -->
      <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm">
        <h3 class="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-1">Profile Photo</h3>
        <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-4">Update your profile photo.</p>
        <div class="flex items-center gap-6">
          <img
            :src="user?.image || 'https://via.placeholder.com/80x80?text=User'"
            :alt="user?.firstName + ' ' + user?.lastName"
            class="w-20 h-20 rounded-full object-cover bg-gray-200"
          />
          <div class="flex gap-2">
            <button
              @click="triggerFileUpload"
              class="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-800 transition-colors text-sm"
            >
              <span class="material-symbols-outlined text-base">upload</span>
              Upload New
            </button>
            <button
              @click="removeProfilePhoto"
              class="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-sm"
            >
              Remove
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="hidden"
            />
          </div>
        </div>
      </div>

      <!-- Personal Information Section -->
      <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm">
        <h3 class="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-1">Personal Information</h3>
        <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-6">Update your personal details.</p>
        <form @submit.prevent="updatePersonalInfo" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5" for="username">Username</label>
            <input
              class="w-full pl-4 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              id="username"
              type="text"
              v-model="personalInfo.username"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5" for="email">Email Address</label>
            <input
              class="w-full pl-4 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              id="email"
              type="email"
              v-model="personalInfo.email"
              required
            />
          </div>
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isUpdatingPersonal"
              class="bg-primary text-white font-semibold px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-800 transition-colors w-full sm:w-auto disabled:opacity-50"
            >
              <span v-if="isUpdatingPersonal">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Change Password Section -->
      <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm">
        <h3 class="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-1">Change Password</h3>
        <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-6">Update your password. Ensure it's a strong one.</p>
        <form @submit.prevent="updatePassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5" for="current_password">Current Password</label>
            <input
              class="w-full pl-4 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              id="current_password"
              type="password"
              v-model="passwordData.current"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5" for="new_password">New Password</label>
            <input
              class="w-full pl-4 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              id="new_password"
              type="password"
              v-model="passwordData.new"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5" for="confirm_password">Confirm New Password</label>
            <input
              class="w-full pl-4 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              id="confirm_password"
              type="password"
              v-model="passwordData.confirm"
              required
            />
          </div>
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isUpdatingPassword"
              class="bg-primary text-white font-semibold px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-800 transition-colors w-full sm:w-auto disabled:opacity-50"
            >
              <span v-if="isUpdatingPassword">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
              <span v-else>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const user = ref(authStore.user)
const fileInput = ref<HTMLInputElement | null>(null)

// Personal Information
const personalInfo = reactive({
  username: user.value?.username || '',
  email: user.value?.email || '',
})
const isUpdatingPersonal = ref(false)

// Password Change
const passwordData = reactive({
  current: '',
  new: '',
  confirm: '',
})
const isUpdatingPassword = ref(false)

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // For demo purposes, we'll just show a success message
    // In a real app, you'd upload the file to a server
    alert(`Profile photo "${file.name}" would be uploaded in a real application.`)
  }
}

const removeProfilePhoto = () => {
  // For demo purposes, we'll just show a message
  // In a real app, you'd remove the photo from the server
  alert('Profile photo would be removed in a real application.')
}

const updatePersonalInfo = async () => {
  isUpdatingPersonal.value = true

  try {
    // For demo purposes, we'll simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update the user data (in a real app, this would be saved to the server)
    if (user.value) {
      user.value.username = personalInfo.username
      user.value.email = personalInfo.email
    }

    alert('Personal information updated successfully!')
  } catch (error) {
    alert('Failed to update personal information.')
  } finally {
    isUpdatingPersonal.value = false
  }
}

const updatePassword = async () => {
  if (passwordData.new !== passwordData.confirm) {
    alert('New passwords do not match.')
    return
  }

  if (passwordData.new.length < 6) {
    alert('Password must be at least 6 characters long.')
    return
  }

  isUpdatingPassword.value = true

  try {
    // For demo purposes, we'll simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Clear the form
    passwordData.current = ''
    passwordData.new = ''
    passwordData.confirm = ''

    alert('Password updated successfully!')
  } catch (error) {
    alert('Failed to update password.')
  } finally {
    isUpdatingPassword.value = false
  }
}

onMounted(() => {
  // Update user data when component mounts
  user.value = authStore.user
  if (user.value) {
    personalInfo.username = user.value.username
    personalInfo.email = user.value.email
  }
})
</script>
