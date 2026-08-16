import { Module } from '@nestjs/common';
import { SlaContractService } from './sla-contract.service';
import { SlaContractController } from './sla-contract.controller';
import { Web3Service } from './web3.service';

@Module({
  controllers: [SlaContractController],
  providers: [SlaContractService, Web3Service],
})
export class SlaContractModule {}
