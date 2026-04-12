import { computed, ref } from 'vue'

interface AppErrorState {
  status: number
  message: string
  data: unknown
}

const appError = ref<AppErrorState | null>(null)

export const useAppError = () => {
  const setError = (error: AppErrorState) => {
    appError.value = error
  }

  const clearError = () => {
    appError.value = null
  }

  return {
    error: computed(() => appError.value),
    setError,
    clearError,
  }
}
