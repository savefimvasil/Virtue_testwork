<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    variant?: 'primary' | 'transparent' | 'underline'
    label: string
    url?: string
    onClick?: () => void
  }>(), {
    variant: 'primary',
    url: undefined,
    onClick: undefined,
  })

  const styleClass = computed(() => {
    const baseClass = 'px-4 py-2 rounded whitespace-nowrap cursor-pointer border'

    if (props.variant === 'primary') {
      return `${baseClass} bg-teal text-white border-teal`
    }

    if (props.variant === 'transparent') {
      return `${baseClass} bg-transparent text-teal border-teal`
    }

    return baseClass
  })
</script>

<template>
  <component
    :is="url ? RouterLink : 'button'"
    :to="url || undefined"
    :class="styleClass"
    @click="props.onClick?.()"
  >
    {{ label }}
  </component>
</template>

<style scoped></style>
