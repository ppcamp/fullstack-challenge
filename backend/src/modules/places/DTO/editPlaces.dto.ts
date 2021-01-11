import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsInt, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class EditPlacesDTO {
  @ApiProperty({
    title: 'Local',
    description: 'Local escolhido.',
    example: 'Balneario Camboriu',
  })
  @IsString()
  @Length(2, 200)
  place: string;

  @ApiProperty({
    title: 'Mês',
    description: 'Mês da meta.',
    example: 4,
  })
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({
    title: 'Ano',
    description: 'Ano da meta.',
    example: new Date().getFullYear(),
  })
  @IsNumber()
  // Uma vez que será para lugares não visitados, o menor ano é o atual.
  @Min(new Date().getFullYear())
  year: number;
}
