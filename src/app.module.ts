import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { MaterialsModule } from './materials/materials.module';
import { LaboursModule } from './labours/labours.module';
import { WorkteamsModule } from './workteams/workteams.module';
import { ApuModule } from './apu/apu.module';

@Module({
  imports: [ActivitiesModule, MaterialsModule, LaboursModule, WorkteamsModule, ApuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
