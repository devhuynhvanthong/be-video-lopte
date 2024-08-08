import { Controller, Get, Post, Body, Param, Delete, Inject, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUsersService } from '../services/iusers.service';
import { BaseController } from 'src/core/controllers/base.controllers';
import { LoginDto } from '../dto/login.dto';
import { Public } from 'src/auth/auth.guard';



@Controller('users')
export class UsersController extends BaseController {
    
    constructor(
        @Inject('IUsersService')
        private readonly usersService: IUsersService) {
        super();
         }

  @Get()
  public async findAll(): Promise<any> {
      try {
          
          let result = await this.usersService.findAll();
          console.log("ádsa",result)
          return  this.sendOkResponse(result, 'success');
      } catch (error) {
       return this.sendFailedResponse(error.message, error.status);
        
      }
    
  }
    @Public()
    @Post('/login')
    public async login(@Body() user: LoginDto): Promise<any> {
        try {
            
            let result = await this.usersService.login(user);
            if (!result) {
                return this.sendFailedResponse("user name incorrect", HttpStatus.UNAUTHORIZED);
            }
            console.log("sads",result)
            return this.sendOkResponse(result, 'success');
        } catch (error) {
            return this.sendFailedResponse(error.message, error.status);
        }
    }


//   @Get(':id')
//   findOne(@Param('id') id: number): Promise<User> {
//     return this.usersService.findOne(id);
//   }

//   @Post()
//   create(@Body() user: User): Promise<User> {
//     return this.usersService.create(user);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: number): Promise<void> {
//     return this.usersService.remove(id);
//   }
}
