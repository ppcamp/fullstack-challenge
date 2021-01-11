import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationFilter {
  @ApiPropertyOptional({
    description: 'Número de registros que serão ignorados.',
    example: 0,
  })
  skip: number;

  @ApiPropertyOptional({
    description: 'Número de registros que serão retornados após o "skip".',
    example: 100,
  })
  take: number;
}
