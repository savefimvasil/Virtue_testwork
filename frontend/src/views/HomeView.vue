<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import LevelBadge from '@/components/LevelBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useEmployees } from '@/composables/useEmployees'

const router = useRouter()
const { employees, isLoading, errorMessage, loadEmployees } = useEmployees()

const headers = computed(() => {
  return {
    name: 'Name',
    department: 'Department',
    riskLevel: 'Risk level',
    pendingSuggestionsCount:
      `Pending suggestions (${employees.value.reduce((acc, employee) => acc + employee.pendingSuggestionsCount, 0)})`,
    actions: 'Actions',
  }
})

const tableData = computed(() =>
  employees.value.map((employee) => {
    return {
      name: employee.name,
      department: employee.department,
      riskLevel: {
        component: LevelBadge,
        props: {
          level: employee.riskLevel,
        },
      },
      pendingSuggestionsCount: employee.pendingSuggestionsCount,
      actions: {
        component: BaseButton,
        props: {
          url: router.resolve({ name: 'employee-suggestions', params: { employeeId: employee.id } }).href,
          label: 'Open Employee',
        },
      },
    }
  }).sort((a, b) => a.name.localeCompare(b.name))
)

;(() => {
  loadEmployees()
})()
</script>

<template>
  <BaseCard
    title="Employees"
    :is-loading="isLoading"
    loading-message="Loading employees..."
  >
    <template #content>
      <BaseTable :headers="headers" :data="tableData" />
    </template>

    <template #error v-if="errorMessage || !employees.length">
      <p class="text-text-secondary">
        {{ errorMessage || 'No employees found.' }}
      </p>
    </template>
  </BaseCard>
</template>
