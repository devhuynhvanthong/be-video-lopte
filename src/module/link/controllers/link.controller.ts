import { Controller, Get, Post, Body, Param, Delete, Inject, HttpStatus, Put, Query } from '@nestjs/common';

import { BaseController } from 'src/core/controllers/base.controllers';

import { Public } from 'src/auth/auth.guard';
import { ILinkService } from '../services/ilink.service';
import { CreateLinkDto, LinkFillterDto } from '../dto/link.dto';



@Controller('link')
export class LinkController extends BaseController {
    
    constructor(
        @Inject('ILinkService')
        private readonly linkService: ILinkService) {
        super();
         }

    @Get()
    @Public()
  public async findAll(): Promise<any> {
      try {
          
          let result = await this.linkService.findAll();
          console.log("ádsa",result)
          return  this.sendOkResponse(result, 'success');
      } catch (error) {
       return this.sendFailedResponse(error.message, error.status);
        
      }
    
    }
    @Get('fillter')
    public async fillter(@Query() query: LinkFillterDto): Promise<any> {
        
        try {
            let result = await this.linkService.fillter(query);
            return this.sendOkResponse(result, 'success');
        } catch (error) {
            return this.sendFailedResponse(error.message, error.status);
        }
    }

  @Post()
  public async create(@Body() linkCreate: CreateLinkDto): Promise<any> {
      try {
          let result = await this.linkService.create(linkCreate);
          return this.sendOkResponse(result, 'success');
      } catch (error) {
        return this.sendFailedResponse(error.message, error.status);
      }
   
  }
    @Put('/:id')
    public async update(@Param('id') id: number, @Body() linkCreate: CreateLinkDto): Promise<any> {
        try {
            let result = await this.linkService.update(id, linkCreate);
            return this.sendOkResponse(result, 'success');
        } catch (error) {
            return this.sendFailedResponse(error.message, error.status);
        }
    }

  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<any> {
      
      try {
          let result = await this.linkService.remove(id);
          return this.sendOkResponse(result, 'success');
      } catch (error) {
        return this.sendFailedResponse(error.message, error.status);
      }
  }
     @Public()
    @Get('/linkOriginByKey/:key')
    public async findLinhOriginalByKey(@Param('key') key: string): Promise<any> {
        try {
            let result = await this.linkService.findLinhOriginalByKey(key);
            return this.sendOkResponse(result, 'success');
        } catch (error) {
            return this.sendFailedResponse(error.message, error.status);
        }
    }
}
