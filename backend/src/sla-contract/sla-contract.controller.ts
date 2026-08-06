import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SlaContractService } from './sla-contract.service';
import { CreateSlaContractDto } from './dto/create-sla-contract.dto';
import { UpdateSlaContractDto } from './dto/update-sla-contract.dto';

@Controller('sla-contract')
export class SlaContractController {
  constructor(private readonly slaContractService: SlaContractService) {}

  @Post()
  create(@Body() createSlaContractDto: CreateSlaContractDto) {
    return this.slaContractService.create(createSlaContractDto);
  }

  @Get()
  findAll() {
    return this.slaContractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slaContractService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlaContractDto: UpdateSlaContractDto) {
    return this.slaContractService.update(+id, updateSlaContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slaContractService.remove(+id);
  }
}
