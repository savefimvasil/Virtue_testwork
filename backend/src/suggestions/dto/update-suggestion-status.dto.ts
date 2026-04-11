import { IsIn, IsString } from 'class-validator';
import { SUGGESTION_STATUSES } from '../../data/types';
import type { SuggestionStatus } from '../../data/types';

export class UpdateSuggestionStatusDto {
  @IsString()
  @IsIn(SUGGESTION_STATUSES)
  status!: SuggestionStatus;
}
