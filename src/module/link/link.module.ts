import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LinkController } from './controllers/link.controller';
import { LinkService } from './services/link.service';
import { Link } from './entities/link.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [ { useClass: LinkService, provide: 'ILinkService' }],
  controllers: [LinkController],
})
export class LinkModule {}
