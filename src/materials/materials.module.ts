import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService, PrismaService]
})
export class MaterialsModule {}
