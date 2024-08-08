import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { ILinkService } from './ilink.service';
import { Link } from '../entities/link.entity';
import { formatDateTime } from 'src/core/helpers/datetime.helper';

@Injectable()
export class LinkService implements ILinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
     
  ) {}

  async findAll(): Promise<Link[]> {
     
    return await this.linkRepository.find();
  }
  async create(data: any): Promise<any> {
    try {
      data['link_short'] = this.generateRandomKey(10);
      data['created_at'] = formatDateTime('YYYY-MM-DD HH:mm:ss');
      console.log(data);
      return await this.linkRepository.save(data);
    } catch (error) {
      throw new Error(error);
      
    }
    

  }
  async update(id: number, data: any): Promise<any> {
    try {
      let link = await this.linkRepository.findOne({ where: { id: id } });
      if (!link) {
        throw new Error('Không tìm thấy link');
      }
      let dataUpdate = await this.linkRepository.update(id, data);
      if(dataUpdate && dataUpdate.affected > 0){
        return await this.linkRepository.findOne({ where: { id: id } });
      }
      return null;
    } catch (error) {
      throw new Error(error);

    }
  }
  async remove(id: number): Promise<any> {
    
    try {
      let link = await this.linkRepository.findOne({ where: { id: id } });
      if (!link) {
        throw new Error('Không tìm thấy link');
      }
      return await this.linkRepository.delete(id);
    } catch (error) {
     
      
    }
  }
  async findLinhOriginalByKey(key: string) {
    try {
      let result = await this.linkRepository.findOne({ where: { link_short: key } });
      return result;
    } catch (error) {
       throw new Error(error);
    }
  }

  async fillter(query: any): Promise<{items:any[],total:number}> {
    try {
      let objWhere = {};
      if (query.nameSearch) {
        objWhere['link_original'] = ILike(`%${query.nameSearch}%`) ;
      }
      let page = query.page ? query.page : 1;
      let limit = query.limit ? query.limit : 10;
      let result = await this.linkRepository.findAndCount({
        where: objWhere,
        order: { created_at: 'DESC' },
        take: limit,
        skip: page && (page - 1) * limit,
      });
      return {items:result[0],total:result[1]};
    } catch (error) {
      throw new Error(error);
      
    }
  }
  
  generateRandomKey(length:number):string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
