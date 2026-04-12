import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { NotFoundException } from '@nestjs/common';
import { Employee, Suggestion } from '../data/types';

@Injectable()
export class EmployeesService {
  constructor(private readonly dataService: DataService) {}

  getEmployeeObjectWithSuggestionsCount(
    employee: Employee,
    suggestions: Suggestion[],
  ) {
    const employeeSuggestions = suggestions.filter(
      (s) => s.employeeId === employee.id,
    );

    const pendingCount = employeeSuggestions.filter(
      (s) => s.status === 'pending',
    ).length;

    return {
      ...employee,
      suggestionsCount: employeeSuggestions.length,
      pendingSuggestionsCount: pendingCount,
    };
  }

  getEmployees() {
    const employees = this.dataService.getEmployees();
    const suggestions = this.dataService.getSuggestions();

    return employees.map((employee) =>
      this.getEmployeeObjectWithSuggestionsCount(employee, suggestions),
    );
  }

  getEmployeeById(employeeId: string) {
    const employee = this.dataService.getEmployeeById(employeeId);

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.getEmployeeObjectWithSuggestionsCount(
      employee,
      this.dataService.getSuggestions(),
    );
  }
}
