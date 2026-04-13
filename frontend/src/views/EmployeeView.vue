<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useEmployees } from '@/composables/useEmployees'

const route = useRoute()
const router = useRouter()
const { employee, isLoading, errorMessage, loadEmployeeById } = useEmployees()

const employeeId = computed(() => String(route.params.employeeId ?? ''))

const tabs = computed(() => [
  {
    label: 'Suggestions',
    to: {
      name: 'employee-suggestions',
      params: { employeeId: employeeId.value },
    },
  },
  {
    label: 'About',
    to: {
      name: 'employee-about',
      params: { employeeId: employeeId.value },
    },
  },
])

;(() => {
  loadEmployeeById(employeeId.value)
})()
</script>

<template>
  <BaseCard
    :title="employee?.name"
    :is-loading="isLoading"
    loading-message="Loading employee..."
  >
    <template #content>
      <div v-if="employee" class="space-y-6 pb-4 mb-4 border-b border-border">
        <div class="flex flex-wrap gap-6 text-sm text-text-secondary">
          <p>
            Department:
            <span class="font-medium">{{ employee.department }}</span>
          </p>

          <p>
            Risk level:
            <span class="font-medium capitalize">{{ employee.riskLevel }}</span>
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3 pb-4 mb-4 border-b border-border">
        <BaseButton
          v-for="tab in tabs"
          :key="tab.label"
          :variant="route.name === tab.to.name ? 'primary' : 'transparent'"
          :url="router.resolve(tab.to).href"
          :label="tab.label"
        />
      </div>

      <RouterView />
    </template>

    <template #error v-if="errorMessage">
      <p class="text-text-secondary">
        {{ errorMessage }}
      </p>
    </template>
  </BaseCard>
</template>
