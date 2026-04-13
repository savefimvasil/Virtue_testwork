<script setup lang="ts">
import { computed, useSlots } from 'vue'

defineProps<{
  title?: string
  isLoading?: boolean
  loadingMessage?: string
}>()

const slots = useSlots()

const hasErrorSlotContent = computed(() => {
  return !!slots.error?.().length
})
</script>

<template>
  <div class="bg-white rounded-lg px-5 py-6">
    <h2 v-if="title" class="mb-4 text-3xl">{{ title }}</h2>

    <p v-if="isLoading" class="text-text-secondary">
      {{ loadingMessage ?? 'Loading...' }}
    </p>

    <slot v-else-if="hasErrorSlotContent" name="error"></slot>

    <slot v-else name="content"></slot>
  </div>
</template>
