<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <h1 class="text-3xl font-bold text-gray-900">Products</h1>
          <div class="flex items-center space-x-4">
            <button
              @click="logout"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
            <router-link
              to="/products/new"
              class="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Add New Product
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filters -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              type="text"
              v-model="searchQuery"
              @input="debouncedSearch"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="loadProducts"
          class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          @click="viewProduct(product.id)"
        >
          <div class="aspect-w-1 aspect-h-1">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {{ product.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-3 line-clamp-3">
              {{ product.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-primary">${{ product.price }}</span>
              <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
            </div>
            <div class="mt-2">
              <span class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {{ product.category }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && !error && products.length === 0" class="text-center py-12">
        <p class="text-gray-500 mb-4">No products found.</p>
        <router-link
          to="/products/new"
          class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add First Product
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const productsStore = useProductsStore()
const authStore = useAuthStore()

const searchQuery = ref('')
let searchTimeout: number | null = null

const products = ref(productsStore.products)
const isLoading = ref(productsStore.isLoading)
const error = ref(productsStore.error)

const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    loadProducts()
  }, 300)
}

const loadProducts = async () => {
  try {
    await productsStore.fetchProducts(searchQuery.value || undefined)
  } catch (err) {
    console.error('Failed to load products:', err)
  }
}

const viewProduct = (id: number) => {
  router.push(`/products/${id}`)
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Watch for store changes
watch(() => productsStore.products, (newProducts) => {
  products.value = newProducts
})

watch(() => productsStore.isLoading, (newLoading) => {
  isLoading.value = newLoading
})

watch(() => productsStore.error, (newError) => {
  error.value = newError
})

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
