import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NavigationMiddleware } from './middlewares/navigation.middleware';

@Module({
  // imports: [MongooseModule.forRoot('mongodb+srv://bdak:bdak@bdak2401.o9vhjmk.mongodb.net/'),UsersModule],
  imports: [MongooseModule.forRoot('mongodb+srv://bdak:bdak@bdak2401.o9vhjmk.mongodb.net/'),UsersModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

