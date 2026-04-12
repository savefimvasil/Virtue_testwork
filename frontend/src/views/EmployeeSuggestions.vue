<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import type { Suggestion } from '@/assets/types/suggestion'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import { ApiError, api } from '@/plugins/api'
import { useLogging } from '@/composables/useLogging'

const route = useRoute()
const { logError } = useLogging()

const suggestions = ref<Suggestion[]>([])
const errorMessage = ref('')
const selectedSuggestionId = ref<string | null>(null)
const isStatusModalOpen = ref(false)

const employeeId = computed(() => String(route.params.employeeId ?? ''))

const headers = {
  type: 'Type',
  description: 'Description',
  priority: 'Priority',
  status: 'Status',
  dateUpdated: 'Updated at',
  actions: 'Actions',
}

const openStatusModal = (suggestionId: string) => {
  selectedSuggestionId.value = suggestionId
  isStatusModalOpen.value = true
}

const closeStatusModal = () => {
  isStatusModalOpen.value = false
  selectedSuggestionId.value = null
}

const confirmStatusModal = () => {
  closeStatusModal()
}

const loadSuggestions = async () => {
  errorMessage.value = ''

  try {
    suggestions.value = await api<Suggestion[]>(`/employees/${employeeId.value}/suggestions`, {
      method: 'GET',
    }).then(data => data.map(suggestion => ({
      ...suggestion,
      dateUpdated: new Date(suggestion.dateUpdated).toLocaleString()
    })))
  } catch (error) {
    suggestions.value = []

    if (error instanceof ApiError && error.status !== 404) {
      errorMessage.value = error.message
    }

    logError(error)
  }
}

const normalisedSuggestionsData = computed(() =>
  suggestions.value.map((suggestion) => ({
    type: suggestion.type,
    description: suggestion.description,
    priority: suggestion.priority,
    status: suggestion.status,
    dateUpdated: suggestion.dateUpdated,
    actions: {
      component: BaseButton,
      props: {
        label: 'Change Status',
        onClick: () => openStatusModal(suggestion.id),
      },
    },
  })),
)

;(() => {
  loadSuggestions()
})()
</script>

<template>
  <div class="space-y-4">
    <BaseTable v-if="suggestions.length" :headers="headers" :data="normalisedSuggestionsData" />

    <p v-else class="text-text-secondary">
      {{ errorMessage || 'No suggestions found.' }}
    </p>

    <BaseModal
      v-if="isStatusModalOpen"
      title="Change suggestion status"
      @close="closeStatusModal"
      @ok="confirmStatusModal"
    >
      <p>
        Suggestion ID: {{ selectedSuggestionId }}
      </p>
    </BaseModal>
  </div>
</template>
