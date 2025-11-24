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
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">
          {{ isEditing ? 'Edit Product' : 'Add New Product' }}
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              v-model="form.title"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Enter product title"
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              v-model="form.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="">Select a category</option>
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home Decoration</option>
              <option value="kitchen-accessories">Kitchen Accessories</option>
              <option value="laptops">Laptops</option>
              <option value="mens-shirts">Men's Shirts</option>
              <option value="mens-shoes">Men's Shoes</option>
              <option value="mens-watches">Men's Watches</option>
              <option value="mobile-accessories">Mobile Accessories</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="skin-care">Skin Care</option>
              <option value="smartphones">Smartphones</option>
              <option value="sports-accessories">Sports Accessories</option>
              <option value="sunglasses">Sunglasses</option>
              <option value="tablets">Tablets</option>
              <option value="tops">Tops</option>
              <option value="vehicle">Vehicle</option>
              <option value="womens-bags">Women's Bags</option>
              <option value="womens-dresses">Women's Dresses</option>
              <option value="womens-jewellery">Women's Jewellery</option>
              <option value="womens-shoes">Women's Shoes</option>
              <option value="womens-watches">Women's Watches</option>
            </select>
          </div>

          <!-- Price -->
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              v-model.number="form.price"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="0.00"
            />
          </div>

          <!-- Stock -->
          <div>
            <label for="stock" class="block text-sm font-medium text-gray-700 mb-2">
              Stock *
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              v-model.number="form.stock"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="0"
            />
          </div>

          <!-- Thumbnail URL -->
          <div>
            <label for="thumbnail" class="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail URL
            </label>
            <input
              id="thumbnail"
              type="url"
              v-model="form.thumbnail"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="goBack"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <span v-if="isSubmitting">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isEditing ? 'Updating...' : 'Creating...' }}
              </span>
              <span v-else>
                {{ isEditing ? 'Update Product' : 'Create Product' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductsStore, type Product } from '../stores/products'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const productsStore = useProductsStore()
const authStore = useAuthStore()

const isEditing = ref(false)
const isSubmitting = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  title: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  thumbnail: '',
})

const goBack = () => {
  router.push('/products')
}

const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = null

  try {
    if (isEditing.value) {
      // Update existing product
      const productId = parseInt(route.params.id as string)
      await productsStore.updateProduct(productId, form)
    } else {
      // Create new product
      await productsStore.addProduct(form)
    }

    router.push('/products')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to save product'
  } finally {
    isSubmitting.value = false
  }
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Load product data if editing
onMounted(async () => {
  const productId = route.params.id
  if (productId && productId !== 'new') {
    isEditing.value = true
    try {
      const product = await productsStore.fetchProductById(parseInt(productId as string))
      form.title = product.title
      form.description = product.description
      form.category = product.category
      form.price = product.price
      form.stock = product.stock
      form.thumbnail = product.thumbnail
    } catch (err) {
      console.error('Failed to load product for editing:', err)
      router.push('/products')
    }
  }
})
</script>
