<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    style?: 'primary' | 'transparent' | 'underline'
    label: string
    url?: string
  }>(), {
    style: 'primary',
    url: undefined,
  })

  const styleClass = computed(() => {
    const baseClass = 'px-4 py-2 rounded'

    if (props.style === 'primary') {
      return `${baseClass} bg-teal text-white`
    }

    if (props.style === 'transparent') {
      return `${baseClass} text-primary bg-transparent text-teal border border-teal`
    }

    if (props.style === 'underline') {
      return `${baseClass} border-b border-teal`
    }

    return baseClass
  })
</script>

<template>
  <component
    :is="url ? RouterLink : 'button'"
    :to="url || undefined"
    :class="styleClass"
  >
    {{ label }}
  </component>
</template>

<style scoped></style>
