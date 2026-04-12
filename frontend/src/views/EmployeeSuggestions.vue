<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Suggestion } from '@/assets/types/suggestion'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import ChangeStatusModal from '@/components/modals/ChangeStatusModal.vue'
import { ApiError, api } from '@/plugins/api'
import { useLogging } from '@/composables/useLogging'

const route = useRoute()
const { logError } = useLogging()

const suggestions = ref<Suggestion[]>([])
const errorMessage = ref('')
const selectedSuggestion = ref<Suggestion | null>(null)
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

const openStatusModal = (suggestion: Suggestion) => {
  selectedSuggestion.value = suggestion
  isStatusModalOpen.value = true
}

const closeStatusModal = () => {
  isStatusModalOpen.value = false
  selectedSuggestion.value = null
}

const confirmStatusModal = async (status: Suggestion['status']) => {
  if (!selectedSuggestion.value) {
    return
  }

  try {
    const updatedSuggestion = await api<Suggestion>(`/suggestions/${selectedSuggestion.value.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })

    suggestions.value = suggestions.value.map((suggestion) =>
      suggestion.id === updatedSuggestion.id ? updatedSuggestion : suggestion,
    )

    closeStatusModal()
  } catch (error) {
    if (error instanceof ApiError) {
      errorMessage.value = error.message
    }

    logError(error)
  }
}

const loadSuggestions = async () => {
  errorMessage.value = ''

  try {
    suggestions.value = await api<Suggestion[]>(`/employees/${employeeId.value}/suggestions`, {
      method: 'GET',
    })
  } catch (error) {
    suggestions.value = []

    if (error instanceof ApiError) {
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
    dateUpdated: new Date(suggestion.dateUpdated).toLocaleString(),
    actions: {
      component: BaseButton,
      props: {
        label: 'Change Status',
        onClick: () => openStatusModal(suggestion),
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

    <ChangeStatusModal
      v-if="isStatusModalOpen && selectedSuggestion"
      :suggestion="selectedSuggestion"
      @close="closeStatusModal"
      @ok="confirmStatusModal"
    />
  </div>
</template>
