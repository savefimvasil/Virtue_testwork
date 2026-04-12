export type Employee = {
  id: string;
  name: string;
  department: Department;
  riskLevel: EmployeeRiskLevel;
};

export type EmployeeRiskLevel = 'low' | 'medium' | 'high';
export type Department = 'Engineering' |'Finance' | 'Marketing' | 'Operations' | 'HR'

export type SuggestionStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'overdue';

export type SuggestionPriority = 'low' | 'medium' | 'high';

export type SuggestionType =
  | 'equipment'
  | 'exercise'
  | 'behavioural'
  | 'lifestyle';

export type SuggestionSource = 'vida' | 'admin';

export type Suggestion = {
  id: string;
  employeeId: string;
  type: SuggestionType;
  description: string;
  status: SuggestionStatus;
  priority: SuggestionPriority;
  source: SuggestionSource;
  dateCreated: string;
  dateUpdated: string;
  notes: string;
};

export const SUGGESTION_STATUSES: SuggestionStatus[] = [
  'pending',
  'in_progress',
  'completed',
  'overdue',
];
