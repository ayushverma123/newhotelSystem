import { ValidationPipe} from '@nestjs/common';
import { Module } from '@nestjs/common';              
import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';  
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';    
    
async function bootstrap() {
  const app = await NestFactory.create(AppModule);  

  // Swagger configuration
  const config = new DocumentBuilder()   
    .setTitle('Hotel Booking System')
    .setDescription('API documentation for hotels, customers, and bookings')
    .setVersion('1.0')
    .addTag('Hotels')
    .addTag('Customers')
    .addTag('Bookings')
    .addTag('Frontend')
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  ); 
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT);
}
bootstrap();