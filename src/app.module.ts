import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();

const {
  CONF_RDB_HOST,
  CONF_RDB_PORT,
  CONF_RDB_USERNAME,
  CONF_RDB_PASSWORD,
  CONF_RDB_DATABASE,
} = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONF_RDB_HOST,
      port: parseInt(CONF_RDB_PORT),
      username: CONF_RDB_USERNAME,
      password: CONF_RDB_PASSWORD,
      database: CONF_RDB_DATABASE,
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    AuthModule,
    AdminModule,
    ApiModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
