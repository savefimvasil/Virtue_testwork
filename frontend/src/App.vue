<script setup lang="ts">
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import TheHeader from '@/components/layout/TheHeader.vue'
import { useAppError } from '@/composables/useAppError'
import NotFoundView from '@/views/NotFoundView.vue'

const route = useRoute()
const { error, clearError } = useAppError()

watch(
  () => route.fullPath,
  () => {
    clearError()
  },
)
</script>

<template>
  <div class="min-h-screen bg-surface">
    <TheHeader />

    <main class="container">
      <NotFoundView v-if="error?.status === 404" />
      <RouterView v-else />
    </main>
  </div>
</template>
