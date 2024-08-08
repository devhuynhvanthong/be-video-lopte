import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/contants/contants';
import { IUsersService } from './iusers.service';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
     private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
     
    return await this.usersRepository.find();
  }
    async login(user: any): Promise<any> {
        try {
          let infoData = await this.usersRepository.findOne({ where: { username: user.username, password: user.password } });
          console.log("first",infoData)
               const access_token = this.jwtService.sign(
                 { username: infoData?.username },
                { secret: jwtConstants.secret, expiresIn: '7d' },
               );
          if (!infoData) {
              throw new Error('Username hoặc Password không chính xác!');
          }
          const { password, ...result } = infoData;
          result['access_token'] = access_token;
            return result;
        } catch (error) {
             throw new Error(error);
        }
    }

//   findOne(id: number): Promise<User> {
//     return this.usersRepository.findOneBy({ id });
//   }

//   create(user: User): Promise<User> {
//     return this.usersRepository.save(user);
//   }

//   async remove(id: number): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
}
