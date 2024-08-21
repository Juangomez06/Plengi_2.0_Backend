import { Module } from '@nestjs/common';
import { LaboursController } from './labours.controller';
import { LaboursService } from './labours.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LaboursController],
  providers: [LaboursService, PrismaService]
})
export class LaboursModule {}
