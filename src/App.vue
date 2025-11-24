<template>
  <div v-if="isAuthRoute" class="dark">
    <SidebarLayout>
      <RouterView />
    </SidebarLayout>
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarLayout from './components/SidebarLayout.vue'

const route = useRoute()

const isAuthRoute = computed(() => {
  return route.meta.requiresAuth || route.path.startsWith('/products')
})
</script>
