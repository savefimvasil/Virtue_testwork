import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { SuggestionStatus } from '../data/types';

@Injectable()
export class SuggestionsService {
  constructor(private readonly dataService: DataService) {}

  getSuggestionsByEmployeeId(employeeId: string) {
    if (!this.dataService.getEmployeeById(employeeId)) {
      throw new NotFoundException('Employee not found');
    }

    return this.dataService.getSuggestionsByEmployeeId(employeeId);
  }

  updateSuggestionStatus(suggestionId: string, status: SuggestionStatus) {
    const suggestion = this.dataService.getSuggestionById(suggestionId);

    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }

    return this.dataService.updateSuggestionStatus(suggestionId, status);
  }
}
