<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  cancel: []
  ok: []
}>()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 px-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <div class="space-y-4">
        <h3 v-if="title" class="text-lg font-semibold text-text-primary">
          {{ title }}
        </h3>

        <div class="text-sm text-text-secondary">
          <slot />
        </div>

        <div class="flex justify-end gap-3">
          <BaseButton
            label="Cancel"
            variant="transparent"
            :on-click="() => emit('cancel')"
          />
          <BaseButton
            label="Ok"
            :on-click="() => emit('ok')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
