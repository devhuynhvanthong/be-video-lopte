import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ { useClass: UsersService, provide: 'IUsersService' },JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
