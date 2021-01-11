import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('TYPEORM_HOST', 'localhost'),
      port: this.configService.get<number>('TYPEORM_PORT', 5432),
      username: this.configService.get<string>('TYPEORM_USERNAME', 'postgres'),
      password: this.configService.get<string>('TYPEORM_PASSWORD', 'password'),
      database: this.configService.get<string>('TYPEORM_DATABASE', 'pmi'),
      synchronize: false,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      logging: JSON.parse(
        this.configService.get<string>('TYPEORM_LOGGING', 'false'),
      ),
      keepConnectionAlive: false,
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
}
