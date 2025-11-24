import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage?: number
  rating?: number
  stock: number
  thumbnail: string
  images?: string[]
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const authStore = useAuthStore()

  const fetchProducts = async (search?: string) => {
    isLoading.value = true
    error.value = null

    try {
      let url = 'https://dummyjson.com/products'
      if (search) {
        url += `/search?q=${encodeURIComponent(search)}`
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (authStore.token) {
        headers.Authorization = `Bearer ${authStore.token}`
      }

      const response = await fetch(url, { headers })

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      products.value = data.products || []
      return products.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch products'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductById = async (id: number) => {
    isLoading.value = true
    error.value = null

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (authStore.token) {
        headers.Authorization = `Bearer ${authStore.token}`
      }

      const response = await fetch(`https://dummyjson.com/products/${id}`, { headers })

      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }

      const product = await response.json()
      return product
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch product'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    isLoading.value = true
    error.value = null

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (authStore.token) {
        headers.Authorization = `Bearer ${authStore.token}`
      }

      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers,
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Failed to add product')
      }

      const newProduct = await response.json()
      products.value.unshift(newProduct)
      return newProduct
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add product'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    isLoading.value = true
    error.value = null

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (authStore.token) {
        headers.Authorization = `Bearer ${authStore.token}`
      }

      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      const updatedProduct = await response.json()

      // Update in local array
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = updatedProduct
      }

      return updatedProduct
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update product'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id: number) => {
    isLoading.value = true
    error.value = null

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (authStore.token) {
        headers.Authorization = `Bearer ${authStore.token}`
      }

      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
        headers,
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      // Remove from local array
      products.value = products.value.filter(p => p.id !== id)

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete product'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  }
})
