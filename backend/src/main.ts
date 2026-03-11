import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use validation types globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Taskflow API')
    .setDescription('API documentation for Taskflow application')
    .setTermsOfService('https://example.com/terms')
    .setVersion('1.0')
    .addServer('http://localhost:3001', 'Local server')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);
  app.enableCors({
    origin: 'https://localhost:3001',

    credentials: true,
  });
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('port', 3000));
  console.log(configService.get<string>('NODE_ENV'));
}
bootstrap();
