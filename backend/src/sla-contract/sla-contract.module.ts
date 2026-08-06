import { Module } from '@nestjs/common';
import { SlaContractService } from './sla-contract.service';
import { SlaContractController } from './sla-contract.controller';

@Module({
  controllers: [SlaContractController],
  providers: [SlaContractService],
})
export class SlaContractModule {}
