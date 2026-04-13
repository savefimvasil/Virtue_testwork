import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { SuggestionsService } from '../suggestions/suggestions.service';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly suggestionsService: SuggestionsService,
  ) {}

  @Get()
  getEmployees() {
    return this.employeesService.getEmployees();
  }

  @Get(':employeeId')
  getEmployeeById(@Param('employeeId') employeeId: string) {
    return this.employeesService.getEmployeeById(employeeId);
  }

  @Get(':employeeId/suggestions')
  getEmployeeSuggestions(@Param('employeeId') employeeId: string) {
    return this.suggestionsService.getSuggestionsByEmployeeId(employeeId);
  }
}
