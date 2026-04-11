import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { SuggestionsModule } from './suggestions/suggestions.module';

@Module({
  imports: [EmployeesModule, SuggestionsModule],
})
export class AppModule {}
