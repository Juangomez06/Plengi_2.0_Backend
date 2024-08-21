import { Module } from '@nestjs/common';
import { WorkteamsController } from './workteams.controller';
import { WorkteamsService } from './workteams.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WorkteamsController],
  providers: [WorkteamsService, PrismaService]
})
export class WorkteamsModule {}
