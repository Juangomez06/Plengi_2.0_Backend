import { Test, TestingModule } from '@nestjs/testing';
import { ApuService } from './apu.service';

describe('ApuService', () => {
  let service: ApuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApuService],
    }).compile();

    service = module.get<ApuService>(ApuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
