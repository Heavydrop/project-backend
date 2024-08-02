import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true
  });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true })
);
await app.listen(process.env.PORT || 3000, () =>
      console.log('Listening on port: ' + process.env.PORT)
  );}
bootstrap();
