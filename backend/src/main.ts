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
    origin: true,

    credentials: true,
  });
  const configService = app.get(ConfigService);

  const port =
    process.env.PORT || configService.get<number>('APP_PORT') || 3000;

  await app.listen(port);

  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${configService.get<string>('NODE_ENV')}`);
}
// explicitly ignore the returned promise to satisfy the linter/ts‑check
void bootstrap();
