<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <button
            @click="goBack"
            class="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Products
          </button>
          <div class="flex items-center space-x-4">
            <button
              @click="logout"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
            <button
              v-if="canEdit"
              @click="editProduct"
              class="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              @click="confirmDelete"
              class="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="loadProduct"
          class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:flex">
          <!-- Product Image -->
          <div class="md:w-1/2">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-96 object-cover"
            />
          </div>

          <!-- Product Info -->
          <div class="md:w-1/2 p-8">
            <div class="mb-4">
              <span class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-2">
                {{ product.category }}
              </span>
            </div>

            <h1 class="text-3xl font-bold text-gray-900 mb-4">
              {{ product.title }}
            </h1>

            <div class="mb-6">
              <span class="text-4xl font-bold text-primary">${{ product.price }}</span>
              <span v-if="product.discountPercentage" class="ml-2 text-lg text-gray-500 line-through">
                ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
              </span>
              <span v-if="product.discountPercentage" class="ml-2 text-sm text-green-600">
                {{ product.discountPercentage }}% off
              </span>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p class="text-gray-600 leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span class="text-sm text-gray-500">Stock</span>
                <p class="text-lg font-semibold">{{ product.stock }}</p>
              </div>
              <div v-if="product.rating">
                <span class="text-sm text-gray-500">Rating</span>
                <div class="flex items-center">
                  <span class="text-lg font-semibold mr-1">{{ product.rating }}</span>
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="showDeleteModal = false">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3 text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Delete Product</h3>
          <p class="text-sm text-gray-500 mb-6">
            Are you sure you want to delete "{{ product?.title }}"?
            This action cannot be undone.
          </p>
          <div class="flex justify-center space-x-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              @click="deleteProduct"
              :disabled="isDeleting"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              <span v-if="isDeleting">Deleting...</span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductsStore, type Product } from '../stores/products'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const productsStore = useProductsStore()
const authStore = useAuthStore()

const product = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const showDeleteModal = ref(false)
const isDeleting = ref(false)
const canEdit = ref(true) // For now, allow editing

const loadProduct = async () => {
  const id = parseInt(route.params.id as string)
  if (!id) {
    error.value = 'Invalid product ID'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const productData = await productsStore.fetchProductById(id)
    product.value = productData
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load product'
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/products')
}

const editProduct = () => {
  // For now, we'll implement edit in the form view
  router.push(`/products/${product.value?.id}/edit`)
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const deleteProduct = async () => {
  if (!product.value) return

  isDeleting.value = true

  try {
    await productsStore.deleteProduct(product.value.id)
    router.push('/products')
  } catch (err) {
    console.error('Failed to delete product:', err)
    showDeleteModal.value = false
  } finally {
    isDeleting.value = false
  }
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  loadProduct()
})
</script>
