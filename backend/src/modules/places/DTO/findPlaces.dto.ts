import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class FindPlacesDTO {
  @ApiPropertyOptional({
    description: 'País escolhido',
  })
  @IsOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional({
    description: 'Local escolhido.',
  })
  @IsOptional()
  @IsString()
  place: string;

  @ApiPropertyOptional({
    description: 'Mês da meta.',
  })
  @IsOptional()
  @IsInt()
  month: number;

  @ApiPropertyOptional({
    description: 'Ano da meta.',
  })
  @IsOptional()
  @IsInt()
  // Uma vez que será para lugares não visitados, o menor ano é o atual.
  year: number;

  @ApiPropertyOptional({
    description: "Data de criação da meta. ('YYYY-MM-DD')",
  })
  @IsOptional()
  @IsString()
  creationDate: string;

  @ApiPropertyOptional({
    description: "Data de atualização da meta. ('YYYY-MM-DD')",
  })
  @IsOptional()
  @IsString()
  updateDate: string;
}
