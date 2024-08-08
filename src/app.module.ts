import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './module/user/user.module';
import {JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './contants/contants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LinkModule } from './module/link/link.module';
@Module({
  imports: [
  TypeOrmModule.forRoot({
      type: 'mysql', // Hoặc 'postgres', 'sqlite', 'mongodb', v.v...
      host: 'aigoox.com',
      port: 3306,
      username: 'u362619076_dev_vd_lopte',
      password: 'Testdb12300@',
      database: 'u362619076_dev_vd_lopte',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      }),JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {
            algorithm: 'HS256',
            expiresIn: '7d',
        },
    }),
      // TypeOrmModule.forRoot({
      // type: 'mysql', // Hoặc 'postgres', 'sqlite', 'mongodb', v.v...
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'mysql',
      // database: 'administrationdb',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      // }),
    UsersModule,
    LinkModule,
  ],
  controllers: [],
  
providers: [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
],
})
export class AppModule {}
