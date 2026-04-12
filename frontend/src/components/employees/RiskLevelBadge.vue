<script setup lang="ts">
import { computed } from 'vue'

import type { EmployeeRiskLevel } from '@/assets/types/employee'

const props = defineProps<{
  level: EmployeeRiskLevel
}>()

const toneClass = computed(() => {
  if (props.level === 'high') {
    return 'bg-danger/15 text-danger'
  }

  if (props.level === 'medium') {
    return 'bg-warning/15 text-warning'
  }

  return 'bg-success/15 text-success'
})
</script>

<template>
  <span
    class="inline-flex min-w-24 justify-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
    :class="toneClass"
  >
    {{ level }}
  </span>
</template>
