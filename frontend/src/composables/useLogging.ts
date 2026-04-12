import { ref } from 'vue'
import { ApiError } from '@/plugins/api'

const sessionLogs = ref<(ApiError | Error)[]>([])

export const useLogging = () => {
  const logError = (error: unknown) => {
    const normalizedError =
      error instanceof ApiError || error instanceof Error
        ? error
        : new Error('Unknown error')

    sessionLogs.value.push(normalizedError)

    // send to sentry or different logging service
  }

  return {
    logError,
  }
}
