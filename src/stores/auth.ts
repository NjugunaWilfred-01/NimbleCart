import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface LocalUser {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  createdAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<any>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  // Get local users from localStorage
  const getLocalUsers = (): LocalUser[] => {
    const users = localStorage.getItem('local_users')
    return users ? JSON.parse(users) : []
  }

  // Save local users to localStorage
  const saveLocalUsers = (users: LocalUser[]) => {
    localStorage.setItem('local_users', JSON.stringify(users))
  }

  // Initialize store from localStorage
  const restoreSession = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')

    if (savedToken) {
      token.value = savedToken
    }
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  const login = async (credentials: { username: string; password: string }) => {
    isLoading.value = true
    error.value = null

    try {
      // First check local users
      const localUsers = getLocalUsers()
      const localUser = localUsers.find(u =>
        (u.username === credentials.username || u.email === credentials.username) &&
        u.password === credentials.password
      )

      if (localUser) {
        // Login with local user
        const userData = {
          id: localUser.id,
          username: localUser.username,
          email: localUser.email,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
          image: `https://ui-avatars.com/api/?name=${localUser.firstName}+${localUser.lastName}&background=random`
        }

        token.value = `local_${Date.now()}_${localUser.id}`
        user.value = userData

        // Persist to localStorage
        localStorage.setItem('auth_token', token.value)
        localStorage.setItem('auth_user', JSON.stringify(userData))

        return userData
      }

      // If not found locally, try DummyJSON API
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await response.json()

      token.value = data.accessToken
      user.value = data

      // Persist to localStorage
      localStorage.setItem('auth_token', data.accessToken)
      localStorage.setItem('auth_user', JSON.stringify(data))

      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const signup = async (userData: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
  }) => {
    isLoading.value = true
    error.value = null

    try {
      const localUsers = getLocalUsers()

      // Check if username or email already exists
      const existingUser = localUsers.find(u =>
        u.username === userData.username || u.email === userData.email
      )

      if (existingUser) {
        throw new Error('Username or email already exists')
      }

      // Create new user
      const newUser: LocalUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
      }

      // Save to local users
      localUsers.push(newUser)
      saveLocalUsers(localUsers)

      return newUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Signup failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    error.value = null

    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  return {
    token,
    user,
    isLoading,
    error,
    isAuthenticated,
    restoreSession,
    login,
    signup,
    logout,
  }
})
