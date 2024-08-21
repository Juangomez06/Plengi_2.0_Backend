import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // Importa esta línea

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    //! Disable temporarily
    // origin: [
    //   process.env.URL_DEPLOY_LOCAL,
    //   process.env.URL_DEPLOY_REMOTE
    // ],
    origin: '*',
    credentials: true,
  });
  app.setGlobalPrefix('api');

  // Configuración del documento OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Plengi')
    .setDescription('Herramienta para crear tu presupuesto')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
