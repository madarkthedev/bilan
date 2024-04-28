import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';


import { VolumeModule } from './volume/volume.module';
import { SurfaceModule } from './surface/surface.module';
import { EvaporationModule } from './evaporation/evaporation.module';
import { MinmaxeModule } from './minmaxe/minmaxe.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'madark',
      database: 'bilan',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      extra: {
        parseNumericStrings: true
    },
      synchronize: true, // Set to true for development, false for production
    }),
    UsersModule,
    AuthModule,
    VolumeModule, // Add your user module or any other modules that use TypeORM
    SurfaceModule,
     EvaporationModule,
     MinmaxeModule,

  ],
  controllers: [AppController],
  providers: [
   {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }, AppService],
})
export class AppModule {}
