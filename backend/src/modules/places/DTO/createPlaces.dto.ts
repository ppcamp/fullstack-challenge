import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import {
  IsInt,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePlacesDTO {
  @ApiProperty({
    title: 'País',
    description: 'País escolhido',
    example: 'Brasil',
  })
  @IsString()
  @Length(2, 50)
  country: string;

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

  @ApiProperty({
    title: 'Imagem',
    description: 'String referente à url da imagem do país.',
    example:
      'https://www.nationalflags.shop/WebRoot/vilkasfi01/Shops/2014080403/53E6/2F4E/F123/7D8D/CCB0/0A28/100B/04B4/Flag_of_Brazil_ml.png',
  })
  @IsString()
  @Length(3, 300)
  @IsUrl()
  iconUrl: string;
}
