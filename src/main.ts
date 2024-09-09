import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { NavigationMiddleware } from './middlewares/navigation.middleware';

// const navigationMiddleware = new NavigationMiddleware();


async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // app.use(navigationMiddleware);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
