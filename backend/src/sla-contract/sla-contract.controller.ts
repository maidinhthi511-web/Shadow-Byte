import { Body, Controller, Get, Post } from '@nestjs/common';
import { SlaContractService } from './sla-contract.service';

@Controller('api/contracts')
export class SlaContractController {
  constructor(private readonly slaContractService: SlaContractService) {}

  @Post('create')
  async create(@Body() createDto: any) {
    return this.slaContractService.createContract(createDto);
  }

  @Get('list')
  async findAll() {
    return this.slaContractService.getAllContracts();
  }
}
