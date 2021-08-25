import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hrmm',
      password: 'hrmm',
      database: 'hrmm-voting',
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
