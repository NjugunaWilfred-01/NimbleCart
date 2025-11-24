<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-background-light dark:bg-background-dark font-display antialiased">
    <div class="w-full max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">Enter the details below to add a new item to your inventory.</p>
      </div>

      <!-- Single Form Container -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12">
        <!-- Product Information Section -->
        <div class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Product Information</h2>
          <div class="space-y-8">
            <div>
              <label class="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3" for="product-title">Product Title</label>
              <input
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white text-base py-3 px-4"
                id="product-title"
                name="product-title"
                placeholder="Enter product title"
                type="text"
                v-model="form.title"
                required
              />
            </div>
            <div>
              <label class="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3" for="product-description">Product Description</label>
              <textarea
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white text-base py-3 px-4"
                id="product-description"
                name="product-description"
                placeholder="Provide a detailed description of the product"
                rows="5"
                v-model="form.description"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Pricing & Inventory Section -->
        <div class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Pricing & Inventory</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label class="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3" for="price">Price</label>
              <div class="relative mt-1 rounded-lg shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span class="text-gray-500 dark:text-gray-400 text-base">$</span>
                </div>
                <input
                  class="block w-full rounded-lg border-gray-300 dark:border-gray-600 pl-8 pr-12 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white text-base py-3"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                  v-model.number="form.price"
                  required
                />
              </div>
            </div>
            <div>
              <label class="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3" for="stock-quantity">Stock Quantity</label>
              <input
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white text-base py-3 px-4"
                id="stock-quantity"
                name="stock-quantity"
                placeholder="Enter stock quantity"
                type="number"
                min="0"
                v-model.number="form.stock"
                required
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3" for="category">Category</label>
              <select
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 py-3 pl-4 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary dark:bg-gray-700 dark:text-white"
                id="category"
                name="category"
                v-model="form.category"
              >
                <option value="">Select a category</option>
                <option value="apparel">Apparel</option>
                <option value="electronics">Electronics</option>
                <option value="home-goods">Home Goods</option>
                <option value="accessories">Accessories</option>
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
          </div>
        </div>

        <!-- Media Section -->
        <div class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Media</h2>
          <div class="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 px-6 pt-10 pb-12">
            <div class="text-center">
              <span class="material-symbols-outlined text-gray-400 dark:text-gray-500 text-5xl">cloud_upload</span>
              <div class="mt-4 flex text-sm text-gray-600 dark:text-gray-400">
                <label class="relative cursor-pointer rounded-md font-medium text-primary hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 dark:ring-offset-gray-800" for="file-upload">
                  <span>Click to upload</span>
                  <input class="sr-only" id="file-upload" name="file-upload" type="file" @change="handleFileUpload" accept="image/*"/>
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              <div v-if="selectedFile" class="mt-4 text-sm text-green-600 dark:text-green-400">
                Selected: {{ selectedFile.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
          {{ error }}
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4">
          <button
            class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:ring-offset-gray-900"
            type="button"
            @click="goBack"
          >
            Cancel
          </button>
          <button
            class="rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:ring-offset-gray-900"
            type="submit"
            :disabled="isSubmitting"
            @click="handleSubmit"
          >
            <span v-if="isSubmitting">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
            <span v-else>Save Product</span>
          </button>
        </div>
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
const selectedFile = ref<File | null>(null)

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

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file
    // For demo purposes, we'll use a placeholder URL
    // In a real app, you'd upload the file to a server
    form.thumbnail = `https://via.placeholder.com/300x200?text=${encodeURIComponent(file.name)}`
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
