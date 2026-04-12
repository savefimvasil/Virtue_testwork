<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'

type TableCellComponent = {
  component?: Component
  props?: Record<string, unknown>
}

type TableCell =
  | string
  | number
  | TableCellComponent
  | undefined

type TableRow = Record<string, TableCell>

const props = defineProps<{
  headers: Record<string, string>
  data: TableRow[]
}>()

const columns = computed(() =>
  Object.entries(props.headers).map(([key, label]) => ({
    key,
    label,
  })),
)

const isComponentCell = (value: TableCell) => value && typeof value === 'object' && value.component as TableCellComponent

const getCellComponent = (value: TableCell) => (isComponentCell(value) && (value as TableCellComponent).component || undefined)

const getCellProps = (value: TableCell) => (isComponentCell(value) ? (value as TableCellComponent).props : undefined)
</script>

<template>
  <div class="overflow-hidden">
    <table class="min-w-full divide-y divide-border bg-white">
      <thead class="bg-surface">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 text-left text-xs font-semibold uppercase text-text-secondary"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-border">
        <tr v-for="(row, index) in data" :key="index">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-4 text-sm"
          >
            <component
              :is="getCellComponent(row[column.key])"
              v-if="isComponentCell(row[column.key])"
              v-bind="getCellProps(row[column.key])"
            />

            <span v-else>
              {{ row[column.key] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
