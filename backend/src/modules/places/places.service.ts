import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationFilter } from '../common/DTO/pagination.dto';
import { CreatePlacesDTO } from './DTO/createPlaces.dto';
import { EditPlacesDTO } from './DTO/editPlaces.dto';
import { FindPlacesDTO } from './DTO/findPlaces.dto';
import { Places } from './places.entity';

@Injectable()
export class PlacesService {
  private readonly logger = new Logger('PlacesService');

  constructor(
    @InjectRepository(Places)
    private readonly placeRepo: Repository<Places>,
  ) {}

  /**
   * Realiza a busca utilizando os filtros dos parâmetros.
   * @param findFilter Campos que podem ser usados para a busca
   * @param pagination Campos para limitar o tamanho da busca
   */
  async getAll(
    findFilter: FindPlacesDTO,
    // pagination: PaginationFilter,
  ): Promise<Places[]> {
    // Listagem ordenada pela meta
    const query = this.placeRepo
      .createQueryBuilder('places')
      .orderBy('places.year', 'ASC')
      .addOrderBy('places.month', 'ASC');

    // Se não for passado um valor de paginação, terá estes como default
    // if (!pagination.skip) pagination.skip = 0;
    // if (!pagination.take) pagination.take = 100;

    if (findFilter.country)
      query.andWhere('places.country ILIKE :country', {
        country: `%${findFilter.country}%`,
      });

    if (findFilter.creationDate)
      query.andWhere('places.created = :created', {
        created: findFilter.creationDate,
      });

    if (findFilter.month)
      query.andWhere('places.month = :month', {
        month: findFilter.month,
      });

    if (findFilter.year)
      query.andWhere('places.year = :year', {
        year: findFilter.year,
      });

    if (findFilter.place)
      query.andWhere('places.place ILIKE :place', {
        place: `%${findFilter.place}%`,
      });

    if (findFilter.updateDate)
      query.andWhere('places.updated = :updateDate', {
        updateDate: findFilter.updateDate,
      });

    return await query.getMany();
    // .skip(pagination.skip)
    // .take(pagination.take)
    // .getManyAndCount();
  }

  /**
   * Obtêm um registro da tabela.
   * @throw NotFoundException se não encontra o registro
   * TODO: remover as horas do campo de data
   */
  async getById(id: string): Promise<Places> {
    // Verifica se existe o registro
    const existingPlace = await this.placeRepo.findOne(id);

    if (!existingPlace) {
      const err = `O registro ${id} não foi encontrado.`;
      this.logger.error(`Edit ${err}`);
      throw new NotFoundException(err);
    }

    return existingPlace;
  }

  /**
   * Realiza a criação de um novo registro na tabela
   * @param place Campos de preenchimento da tabela
   * @throw ConflictException se já existir um registro no mesmo local
   * TODO: remover as horas do campo de data
   */
  async create(place: CreatePlacesDTO): Promise<Places> {
    // Verifica se já existe o mesmo registro
    const existingPlace = await this.placeRepo.findOne({
      where: { place: place.place, country: place.country },
    });

    if (existingPlace) {
      const err = `Já existe um registro para esse local.`;
      this.logger.error(`Create ${err}`);
      throw new ConflictException(err);
    }

    const currentDate = new Date();

    const p = this.placeRepo.create({
      country: place.country,
      place: place.place,
      month: place.month,
      year: place.year,
      iconUrl: place.iconUrl,
      created: currentDate,
      updated: currentDate,
    });

    return p.save();
  }

  /**
   * Realiza a edição de registro existente na tabela
   * @param place Campos de preenchimento da tabela
   * @throw NotFoundException se não encontra o registro
   * TODO: remover as horas do campo de data
   */
  async edit(id: string, place: EditPlacesDTO): Promise<Places> {
    // Verifica se existe o registro
    const existingPlace = await this.placeRepo.findOne(id);

    if (!existingPlace) {
      const err = `O registro ${id} não foi encontrado.`;
      this.logger.error(`Edit ${err}`);
      throw new NotFoundException(err);
    }

    // Atualiza os campos
    existingPlace.place = place.place;
    existingPlace.month = place.month;
    existingPlace.year = place.year;

    // Atualiza a data de edição
    existingPlace.updated = new Date();

    return existingPlace.save();
  }

  /**
   * Deleta um registro da tabela. (REMOÇÃO FÍSICA)
   * @throw NotFoundException se não encontra o registro
   * TODO: remover as horas do campo de data
   */
  async delete(id: string): Promise<Places> {
    // Verifica se existe o registro
    const existingPlace = await this.placeRepo.findOne(id);

    if (!existingPlace) {
      const err = `O registro ${id} não foi encontrado.`;
      this.logger.error(`Edit ${err}`);
      throw new NotFoundException(err);
    }

    return await this.placeRepo.remove(existingPlace);
  }
}
