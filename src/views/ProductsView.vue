<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">Products</h2>
        <p class="text-text-light-secondary dark:text-text-dark-secondary mt-1">Manage your inventory and view product performance.</p>
      </div>
      <router-link
        to="/products/new"
        class="bg-primary text-white font-semibold px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-800 transition-colors"
      >
        <span>⊕</span>
        Add New Product
      </router-link>
    </div>

    <!-- Search and Filters -->
    <div class="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm mb-6">
      <div class="flex items-center space-x-4">
        <div class="relative flex-grow">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary">🔍</span>
          <input
            type="text"
            v-model="searchQuery"
            @input="debouncedSearch"
            placeholder="Search by product name..."
            class="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <select
          v-model="selectedCategory"
          @change="applyFilters"
          class="px-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Category</option>
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
        <select
          v-model="stockFilter"
          @change="applyFilters"
          class="px-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Stock Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
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
        class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-800"
      >
        Try Again
      </button>
    </div>

    <!-- Products Table -->
    <div v-else class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden">
      <table class="w-full text-left">
        <thead class="text-xs text-text-light-secondary dark:text-text-dark-secondary uppercase border-b border-border-light dark:border-border-dark">
          <tr>
            <th class="px-6 py-4 font-medium" style="width: 40%;">Product</th>
            <th class="px-6 py-4 font-medium">Category</th>
            <th class="px-6 py-4 font-medium">Price</th>
            <th class="px-6 py-4 font-medium">Stock</th>
            <th class="px-6 py-4 font-medium"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border-light dark:divide-border-dark">
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            class="text-text-light-primary dark:text-text-dark-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
            @click="viewProduct(product.id)"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-4">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-12 h-12 rounded-full object-cover bg-gray-200"
                />
                <div>
                  <p class="font-semibold">{{ product.title }}</p>
                  <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary line-clamp-2">
                    {{ product.description }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                class="text-xs font-medium px-2.5 py-1 rounded-full"
                :class="getCategoryBadgeClass(product.category)"
              >
                {{ formatCategory(product.category) }}
              </span>
            </td>
            <td class="px-6 py-4 font-medium">${{ product.price }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span
                  class="w-2.5 h-2.5 rounded-full"
                  :class="getStockStatusColor(product.stock)"
                ></span>
                <span
                  :class="getStockStatusTextClass(product.stock)"
                >
                  {{ getStockStatusText(product.stock) }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 text-right">
              <button
                @click.stop="showProductMenu(product)"
                class="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"
              >
                <span>⋮</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="px-6 py-4 flex justify-between items-center text-sm text-text-light-secondary dark:text-text-dark-secondary">
        <p>Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, totalProducts) }} of {{ totalProducts }} results</p>
        <div class="flex gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>‹</span>
          </button>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-8 h-8 flex items-center justify-center bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>›</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Menu Modal -->
    <div
      v-if="showMenu && selectedProduct"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showMenu = false"
    >
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg shadow-xl p-4 min-w-48" @click.stop>
        <button
          @click="viewProduct(selectedProduct.id)"
          class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-3"
        >
          <span>👁️</span>
          View Details
        </button>
        <button
          @click="editProduct(selectedProduct.id)"
          class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-3"
        >
          <span class="material-symbols-outlined">edit</span>
          Edit Product
        </button>
        <button
          @click="confirmDelete(selectedProduct)"
          class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-3 text-red-600"
        >
          <span class="material-symbols-outlined">delete</span>
          Delete Product
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal && productToDelete"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showDeleteModal = false"
    >
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg shadow-xl p-6 max-w-md" @click.stop>
        <h3 class="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-4">Delete Product</h3>
        <p class="text-text-light-secondary dark:text-text-dark-secondary mb-6">
          Are you sure you want to delete "{{ productToDelete.title }}"?
          This action cannot be undone.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            @click="deleteConfirmed"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore, type Product } from '../stores/products'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const productsStore = useProductsStore()
const authStore = useAuthStore()

// Search and filters
const searchQuery = ref('')
const selectedCategory = ref('')
const stockFilter = ref('')
let searchTimeout: number | null = null

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Menu and modals
const showMenu = ref(false)
const selectedProduct = ref<Product | null>(null)
const showDeleteModal = ref(false)
const productToDelete = ref<Product | null>(null)

// Store data
const products = ref(productsStore.products)
const isLoading = ref(productsStore.isLoading)
const error = ref(productsStore.error)

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value

  // Apply category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Apply stock filter
  if (stockFilter.value) {
    filtered = filtered.filter(product => {
      switch (stockFilter.value) {
        case 'in-stock':
          return product.stock > 20
        case 'low-stock':
          return product.stock > 0 && product.stock <= 20
        case 'out-of-stock':
          return product.stock === 0
        default:
          return true
      }
    })
  }

  return filtered
})

const totalProducts = computed(() => filteredProducts.value.length)
const totalPages = computed(() => Math.ceil(totalProducts.value / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => startIndex.value + itemsPerPage.value)
const paginatedProducts = computed(() =>
  filteredProducts.value.slice(startIndex.value, endIndex.value)
)

// Methods
const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    loadProducts()
  }, 300)
}

const applyFilters = () => {
  currentPage.value = 1 // Reset to first page when filtering
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

const editProduct = (id: number) => {
  router.push(`/products/${id}/edit`)
}

const showProductMenu = (product: Product) => {
  selectedProduct.value = product
  showMenu.value = true
}

const confirmDelete = (product: Product) => {
  productToDelete.value = product
  showDeleteModal.value = true
  showMenu.value = false
}

const deleteConfirmed = async () => {
  if (!productToDelete.value) return

  try {
    await productsStore.deleteProduct(productToDelete.value.id)
    showDeleteModal.value = false
    productToDelete.value = null
  } catch (err) {
    console.error('Failed to delete product:', err)
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Helper methods
const getCategoryBadgeClass = (category: string) => {
  const classes: Record<string, string> = {
    beauty: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    fragrances: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    furniture: 'bg-brown-100 text-brown-800 dark:bg-brown-900/50 dark:text-brown-300',
    groceries: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'home-decoration': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    'kitchen-accessories': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    laptops: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300',
    'mens-shirts': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    'mens-shoes': 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
    'mens-watches': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
    'mobile-accessories': 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300',
    motorcycle: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    'skin-care': 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
    smartphones: 'bg-slate-100 text-slate-800 dark:bg-slate-900/50 dark:text-slate-300',
    'sports-accessories': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    sunglasses: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    tablets: 'bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-300',
    tops: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
    vehicle: 'bg-stone-100 text-stone-800 dark:bg-stone-900/50 dark:text-stone-300',
    'womens-bags': 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/50 dark:text-fuchsia-300',
    'womens-dresses': 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    'womens-jewellery': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    'womens-shoes': 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
    'womens-watches': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
  }
  return classes[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
}

const formatCategory = (category: string) => {
  return category.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const getStockStatusColor = (stock: number) => {
  if (stock === 0) return 'bg-red-500'
  if (stock <= 20) return 'bg-orange-500'
  return 'bg-green-500'
}

const getStockStatusTextClass = (stock: number) => {
  if (stock === 0) return 'text-red-700 dark:text-red-400 font-medium'
  if (stock <= 20) return 'text-orange-700 dark:text-orange-400 font-medium'
  return 'text-green-700 dark:text-green-400 font-medium'
}

const getStockStatusText = (stock: number) => {
  if (stock === 0) return 'Out of Stock'
  if (stock <= 20) return `${stock} Low Stock`
  return `${stock} In Stock`
}

// Watch for store changes
watch(() => productsStore.products, (newProducts) => {
  products.value = newProducts
  currentPage.value = 1 // Reset to first page when products change
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
