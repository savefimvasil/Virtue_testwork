import { Injectable } from '@nestjs/common';
import data from './sample-data.json';
import { Employee, Suggestion, SuggestionStatus } from './types';

@Injectable()
export class DataService {
  private employees: Employee[] = data.employees as Employee[];
  private suggestions: Suggestion[] = data.suggestions as Suggestion[];

  private employeesById: Record<string, Employee> = Object.fromEntries(
      this.employees.map((e) => [e.id, e]),
  );

  private suggestionsById: Record<string, Suggestion> = Object.fromEntries(
      this.suggestions.map((e) => [e.id, e]),
  );

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: string) {
    return this.employeesById[id];
  }

  getSuggestions() {
    return this.suggestions;
  }

  getSuggestionById(suggestionId: string) {
    return this.suggestionsById[suggestionId];
  }

  updateSuggestionStatus(suggestionId: string, status: SuggestionStatus) {
    const suggestion = this.getSuggestionById(suggestionId);
    if (!suggestion) {
      throw new Error('Suggestion not found');
    }

    suggestion.status = status;
    suggestion.dateUpdated = new Date().toISOString();

    return suggestion;
  }

  getSuggestionsByEmployeeId(employeeId: string) {
    return this.suggestions.filter((s) => s.employeeId === employeeId);
  }
}
