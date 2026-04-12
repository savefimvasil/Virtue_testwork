<script setup lang="ts">
import { ref, watch } from 'vue'

import type { Suggestion, SuggestionStatus } from '@/assets/types/suggestion'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'

const props = defineProps<{
  suggestion: Suggestion
}>()

const emit = defineEmits<{
  close: []
  ok: [status: SuggestionStatus]
}>()

const availableStatuses: SuggestionStatus[] = ['pending', 'in_progress', 'completed', 'overdue']

const selectedStatus = ref<SuggestionStatus>(props.suggestion.status)

watch(
  () => props.suggestion,
  (suggestion) => {
    selectedStatus.value = suggestion.status
  },
  { immediate: true },
)
</script>

<template>
  <BaseModal
    title="Change suggestion status"
    @close="emit('close')"
    @ok="emit('ok', selectedStatus)"
  >
    <div class="space-y-4">
      <p>
        Suggestion: "{{ suggestion.description }}"
      </p>

      <p>
        Current status:
        <span class="font-medium text-text-primary">
          {{ suggestion.status }}
        </span>
      </p>

      <p>Do you want to change status?</p>

      <div class="flex flex-wrap gap-2">
        <BaseButton
          v-for="status in availableStatuses"
          :key="status"
          :label="status"
          :variant="selectedStatus === status ? 'primary' : 'transparent'"
          :on-click="() => { selectedStatus = status }"
        />
      </div>
    </div>
  </BaseModal>
</template>
