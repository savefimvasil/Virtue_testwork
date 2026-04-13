import { beforeEach, describe, expect, it, vi } from 'vitest'

const logErrorMock = vi.fn()

vi.mock('@/composables/useLogging', () => ({
  useLogging: () => ({
    logError: logErrorMock,
  }),
}))

vi.mock('@/plugins/api', async () => {
  const actual = await vi.importActual<typeof import('@/plugins/api')>('@/plugins/api')

  return {
    ...actual,
    api: vi.fn(),
  }
})

import type { Employee } from '@/assets/types/employee'
import { useEmployees } from '@/composables/useEmployees'
import { ApiError, api } from '@/plugins/api'

const apiMock = vi.mocked(api)

describe('useEmployees', () => {
  beforeEach(() => {
    apiMock.mockReset()
    logErrorMock.mockReset()
  })

  it('loads employees successfully', async () => {
    const employeesResponse: Employee[] = [
      {
        id: '1',
        name: 'Full Name',
        department: 'Engineering',
        riskLevel: 'low',
        pendingSuggestionsCount: 1,
        suggestionsCount: 2,
      },
    ]

    apiMock.mockResolvedValue(employeesResponse)

    const { employees, errorMessage, isLoading, loadEmployees } = useEmployees()

    await loadEmployees()

    expect(apiMock).toHaveBeenCalledWith('/employees', { method: 'GET' })
    expect(employees.value).toEqual(employeesResponse)
    expect(errorMessage.value).toBe('')
    expect(isLoading.value).toBe(false)
    expect(logErrorMock).not.toHaveBeenCalled()
  })

  it('sets error state when loading employees fails', async () => {
    apiMock.mockRejectedValue(new ApiError('Employees request failed', 500, null))

    const { employees, errorMessage, isLoading, loadEmployees } = useEmployees()

    await loadEmployees()

    expect(employees.value).toEqual([])
    expect(errorMessage.value).toBe('Employees request failed')
    expect(isLoading.value).toBe(false)
    expect(logErrorMock).toHaveBeenCalledTimes(1)
  })

  it('loads one employee by id successfully', async () => {
    const employeeResponse: Employee = {
      id: '7',
      name: 'Full Name',
      department: 'HR',
      riskLevel: 'medium',
      pendingSuggestionsCount: 2,
      suggestionsCount: 4,
    }

    apiMock.mockResolvedValue(employeeResponse)

    const { employee, errorMessage, isLoading, loadEmployeeById } = useEmployees()

    await loadEmployeeById('7')

    expect(apiMock).toHaveBeenCalledWith('/employees/7', { method: 'GET' })
    expect(employee.value).toEqual(employeeResponse)
    expect(errorMessage.value).toBe('')
    expect(isLoading.value).toBe(false)
    expect(logErrorMock).not.toHaveBeenCalled()
  })

  it('clears employee and logs when loading one employee fails', async () => {
    apiMock.mockRejectedValue(new ApiError('Employee not found', 404, null))

    const { employee, errorMessage, isLoading, loadEmployeeById } = useEmployees()

    await loadEmployeeById('missing-id')

    expect(employee.value).toBeNull()
    expect(errorMessage.value).toBe('Employee not found')
    expect(isLoading.value).toBe(false)
    expect(logErrorMock).toHaveBeenCalledTimes(1)
  })
})
