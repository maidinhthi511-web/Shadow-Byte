import { Test, TestingModule } from '@nestjs/testing';
import { SlaContractService } from './sla-contract.service';

describe('SlaContractService', () => {
  let service: SlaContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlaContractService],
    }).compile();

    service = module.get<SlaContractService>(SlaContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
