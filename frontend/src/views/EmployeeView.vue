<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

import type { Employee } from '@/assets/types/employee'
import BaseCard from '@/components/base/BaseCard.vue'
import { api, ApiError } from '@/plugins/api'
import { useLogging } from '@/composables/useLogging'
import BaseButton from '@/components/base/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const { logError } = useLogging()

const employee = ref<Employee | null>(null)
const isLoading = ref(false)
const errorMessage = ref('')

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

const loadEmployee = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    employee.value = await api<Employee>(`/employees/${employeeId.value}`, {
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

watch(
  employeeId,
  () => {
    void loadEmployee()
  },
  { immediate: true },
)
</script>

<template>
  <BaseCard
    :title="employee?.name ?? 'Employee details'"
    :is-loading="isLoading"
    loading-message="Loading employee..."
  >
    <template #content>
      <div class="space-y-6">
        <div class="flex flex-wrap items-center gap-3 border-b border-border pb-4">
          <BaseButton
            v-for="tab in tabs"
            :key="tab.label"
            :style="route.name === tab.to.name ? 'primary' : 'transparent'"
            :url="router.resolve(tab.to).href"
            :label="tab.label"
          />
        </div>

        <div v-if="employee" class="space-y-6">
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

          <RouterView />
        </div>
      </div>
    </template>

    <template #error v-if="errorMessage">
      <p class="text-text-secondary">
        {{ errorMessage }}
      </p>
    </template>
  </BaseCard>
</template>
