import { useAppError } from '@/composables/useAppError'

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const getErrorMessage = (status: number, data: unknown) => {
  if (data && typeof data === 'object') {
    const errorData = data as Record<string, unknown>

    if (typeof errorData.message === 'string') {
      return errorData.message
    }

    if (Array.isArray(errorData.message)) {
      const messages = errorData.message.filter((message): message is string => typeof message === 'string')

      if (messages.length > 0) {
        return messages.join(', ')
      }
    }

    if (typeof errorData.error === 'string') {
      return errorData.error
    }
  }

  return `Request failed with status ${status}`
}

const parseResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  if (contentType.startsWith('text/')) {
    return response.text()
  }

  return null
}

export const api = async <T>(path: string, init?: RequestInit) => {
  const { setError } = useAppError()

  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
    ...init,
  })

  const data = await parseResponse(response)

  if (response.ok) {
    return data as T
  }

    const error = new ApiError(getErrorMessage(response.status, data), response.status, data)

    if (error.status === 404) {
      setError({
        status: error.status,
        message: error.message,
        data: error.data,
    })
  }

  throw error
}
