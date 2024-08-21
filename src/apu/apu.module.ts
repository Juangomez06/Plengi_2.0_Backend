import { Module } from '@nestjs/common';
import { ApuService } from './apu.service';
import { ApuController } from './apu.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ApuService, PrismaService],
  controllers: [ApuController]
})
export class ApuModule {} 
