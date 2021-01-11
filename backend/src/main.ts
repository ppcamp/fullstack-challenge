import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Set level for nestjs (only) loggers, if you don't want put all logs, remove 'log' tag
    logger: ['log', 'verbose', 'debug', 'error', 'warn'],
  });
  // Every request will be raised from here
  app.setGlobalPrefix('api');

  // Create api reference
  const options = new DocumentBuilder()
    .setTitle('API 4 CP challenge')
    .setVersion('1.0')
    .setLicense('MIT', 'https://choosealicense.com/licenses/mit/')
    .setDescription(
      'Documentação para a api desenvolvido para o desafio do clube petro',
    )
    .setContact(
      'ppcamp',
      'https://github.com/ppcamp/',
      'p.augustocampos@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // Main page of api reference
  SwaggerModule.setup('api', app, document);

  // Allowed requisition
  // const whitelist = ['http://0.0.0.0', 'http://127.0.0.1'];
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const configService = new ConfigService();
  const host = configService.get<string>('HOST', '0.0.0.0');
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port, host);
  const url = await app.getUrl();

  console.log(`💻 API running on: ${url}/api`);
}
bootstrap();
