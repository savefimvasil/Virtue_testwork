import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DataModule } from '../data/data.module';
import { SuggestionsModule } from '../suggestions/suggestions.module';

@Module({
  imports: [DataModule, SuggestionsModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
