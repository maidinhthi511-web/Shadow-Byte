import { Test, TestingModule } from '@nestjs/testing';
import { SlaContractController } from './sla-contract.controller';
import { SlaContractService } from './sla-contract.service';

describe('SlaContractController', () => {
  let controller: SlaContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlaContractController],
      providers: [SlaContractService],
    }).compile();

    controller = module.get<SlaContractController>(SlaContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
