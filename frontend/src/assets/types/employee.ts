export type EmployeeRiskLevel = 'low' | 'medium' | 'high';
export type Department = 'Engineering' |'Finance' | 'Marketing' | 'Operations' | 'HR'

export type Employee = {
  department: Department
  id: string
  name: string
  pendingSuggestionsCount: number
  riskLevel: EmployeeRiskLevel
  suggestionsCount: number
}
