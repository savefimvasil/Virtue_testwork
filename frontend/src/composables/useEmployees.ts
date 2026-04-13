import { ref } from 'vue'

import type { Employee } from '@/assets/types/employee'
import { ApiError, api } from '@/plugins/api'
import { useLogging } from '@/composables/useLogging'

export const useEmployees = () => {
  const { logError } = useLogging()

  const employees = ref<Employee[]>([])
  const employee = ref<Employee | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref('')

  const loadEmployees = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      employees.value = await api<Employee[]>('/employees', {
        method: 'GET',
      })
    } catch (error) {
      employees.value = []

      if (error instanceof ApiError) {
        errorMessage.value = error.message
      }

      logError(error)
    } finally {
      isLoading.value = false
    }
  }

  const loadEmployeeById = async (employeeId: string) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      employee.value = await api<Employee>(`/employees/${employeeId}`, {
        method: 'GET',
      })
    } catch (error) {
      employee.value = null

      if (error instanceof ApiError) {
        errorMessage.value = error.message
      }

      logError(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    employees,
    employee,
    isLoading,
    errorMessage,
    loadEmployees,
    loadEmployeeById,
  }
}
