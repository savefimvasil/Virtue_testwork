<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { Suggestion } from '@/assets/types/suggestion'
import BaseTable from '@/components/base/BaseTable.vue'
import { ApiError, api } from '@/plugins/api'
import { useLogging } from '@/composables/useLogging'

const route = useRoute()
const { logError } = useLogging()

const suggestions = ref<Suggestion[]>([])
const errorMessage = ref('')

const employeeId = computed(() => String(route.params.employeeId ?? ''))

const headers = {
  type: 'Type',
  description: 'Description',
  status: 'Status',
  priority: 'Priority',
}

const loadSuggestions = async () => {
  errorMessage.value = ''

  try {
    suggestions.value = await api<Suggestion[]>(`/employees/${employeeId.value}/suggestions`, {
      method: 'GET',
    })
  } catch (error) {
    suggestions.value = []

    if (error instanceof ApiError && error.status !== 404) {
      errorMessage.value = error.message
    }

    logError(error)
  }
}

;(() => {
  loadSuggestions()
})()
</script>

<template>
  <div class="space-y-4">
    <BaseTable v-if="suggestions.length" :headers="headers" :data="suggestions" />

    <p v-else class="text-text-secondary">
      {{ errorMessage || 'No suggestions found.' }}
    </p>
  </div>
</template>
