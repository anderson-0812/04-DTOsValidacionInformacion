import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // agrego de manera global el pipeValidator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quita la data que no esta en el dto es decir, si mando 4 parametros pero solo se esperaba 2 remueve los dos que no constan en eldto
      forbidNonWhitelisted: true, // valida que si hay propiedades o parametros no esperados devuelve un msj de error con los nombresde las propiedades no esperadas 
    })
  );
  await app.listen(3000);
}
bootstrap();
