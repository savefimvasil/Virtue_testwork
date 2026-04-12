<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
  title?: string
  isLoading?: boolean
  loadingMessage?: string
}>()

const slots = useSlots()
</script>

<template>
  <div class="bg-white rounded-lg px-5 py-6">
    <h2 v-if="title" class="mb-6">{{ title }}</h2>

    <p v-if="isLoading" class="text-text-secondary">
      {{ loadingMessage ?? 'Loading...' }}
    </p>

    <slot v-else-if="slots.error" name="error"></slot>

    <slot v-else name="content"></slot>
  </div>
</template>
