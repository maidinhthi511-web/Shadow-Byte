import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Thêm dòng này để Frontend kết nối được
  app.enableCors(); 
  
  // Cổng mặc định của Backend là 3000
  await app.listen(3000);
}
bootstrap();
