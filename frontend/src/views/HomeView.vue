<script setup lang="ts">
import { ref } from 'vue'

import Card from '@/components/base/Card.vue'
import type { Employee } from '@/assets/types/employee'
import { ApiError, api } from '@/plugins/api'
import { useLogging } from '@/composables/useLogging'

const employees = ref<Employee[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

const { logError } = useLogging()

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
  <Card
    title="Employees"
    :is-loading="isLoading"
    loading-message="Loading employees..."
  >
    <template #content>
      <ul class="space-y-3">
        <li
          v-for="employee in employees"
          :key="employee.id"
          class="rounded-2xl border border-border bg-white p-4"
        >
          <p class="font-medium text-text-primary">
            {{ employee.name }}
          </p>
          <p class="text-sm text-text-secondary">
            {{ employee.department }}
          </p>
        </li>
      </ul>
    </template>

    <template #error v-if="errorMessage || !employees.length">
      <p class="text-text-secondary">
        {{ errorMessage || 'No employees found.' }}
      </p>
    </template>
  </Card>
</template>
