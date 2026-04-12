<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import LevelBadge from '@/components/LevelBadge.vue'
import type { Employee } from '@/assets/types/employee'
import { ApiError, api } from '@/plugins/api'
import { useLogging } from '@/composables/useLogging'
import BaseButton from '@/components/base/BaseButton.vue'

const employees = ref<Employee[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

const router = useRouter()
const { logError } = useLogging()

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
  employees.value.map((employee) => ({
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
  })),
)

const loadEmployees = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    employees.value = await api<Employee[]>('/employees', {
      method: 'GET',
    })
  } catch (error) {
    if (error instanceof ApiError) {
      errorMessage.value = error.message
    }

    logError(error)
  } finally {
    isLoading.value = false
  }
}

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
