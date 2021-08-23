import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hrmm',
      password: 'hrmm',
      database: 'hrmm_voting',
      autoLoadEntities: true,
      logging: true,
      synchronize: process.env.NODE_ENV !== 'prod',
    }),
    AuthModule,
  ],
})
export class AppModule {}
