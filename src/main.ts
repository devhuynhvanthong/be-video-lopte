import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const CORS_OPTIONS = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
    exposedHeaders: null,
    allowedHeaders: null,
    maxAge: null,
    preflight: true,
    strictPreflight: true,
};
async function bootstrap() {
 const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors(CORS_OPTIONS);
  await app.listen(8080);
}
bootstrap();
