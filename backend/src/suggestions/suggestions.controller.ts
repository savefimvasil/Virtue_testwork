import { Body, Controller, Param, Put } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { UpdateSuggestionStatusDto } from './dto/update-suggestion-status.dto';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Put('/:suggestionId')
  updateSuggestionStatus(
    @Param('suggestionId') suggestionId: string,
    @Body() body: UpdateSuggestionStatusDto,
  ) {
    return this.suggestionsService.updateSuggestionStatus(
      suggestionId,
      body.status,
    );
  }
}
