import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { Places } from './places.entity';
import { PlacesService } from './places.service';

@Module({
  imports: [TypeOrmModule.forFeature([Places])],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
