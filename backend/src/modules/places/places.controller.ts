import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationFilter } from '../common/DTO/pagination.dto';
import { CreatePlacesDTO } from './DTO/createPlaces.dto';
import { EditPlacesDTO } from './DTO/editPlaces.dto';
import { FindPlacesDTO } from './DTO/findPlaces.dto';
import { Places } from './places.entity';
import { PlacesService } from './places.service';

@Controller('places')
@ApiTags('Places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiOperation({ summary: 'Cria um novo registro.' })
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cria um novo registro e retorna ele.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Já existe um registro com esse local assimilado.',
  })
  async create(@Body(ValidationPipe) place: CreatePlacesDTO): Promise<Places> {
    return this.placesService.create(place);
  }

  @ApiOperation({
    summary: 'Retorna todos os lugares cadastrados.',
    description: 'Opcionalmente, pode-se adicionar alguns parâmetros na query.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna todos os objetos que existem no banco',
    // 'Retorna [Places[], número total de registro no banco que batem com esta query].',
  })
  @Get()
  async getAll(
    @Query() findFilter: FindPlacesDTO,
    // @Query() pagination: PaginationFilter,
  ): Promise<Places[]> {
    return this.placesService.getAll(findFilter);
  }

  @ApiOperation({ summary: 'Obtêm um registro baseando-se no seu id.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro na validação do uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Registro não encontrado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna o registro encontrado.',
  })
  @Get('/:id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<Places> {
    return this.placesService.getById(id);
  }

  @ApiOperation({ summary: 'Edita um registro baseando-se no seu id.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro na validação do uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Registro não encontrado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edita e retorna o registro encontrado.',
  })
  @Patch('/:id')
  async edit(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) place: EditPlacesDTO,
  ): Promise<Places> {
    return this.placesService.edit(id, place);
  }

  @ApiOperation({ summary: 'Deleta um registro baseando-se no seu id.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro na validação do uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Registro não encontrado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Remove do banco (fisicamente) e retorna o registro encontrado.',
  })
  @Delete('/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Places> {
    return this.placesService.delete(id);
  }
}
