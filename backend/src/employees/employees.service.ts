import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly dataService: DataService) {}

  getEmployees() {
    const employees = this.dataService.getEmployees();
    const suggestions = this.dataService.getSuggestions();

    return employees.map((employee) => {
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
    });
  }
}
