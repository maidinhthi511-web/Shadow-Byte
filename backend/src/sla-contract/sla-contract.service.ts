import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSlaContractDto } from './dto/create-sla-contract.dto';
import { UpdateSlaContractDto } from './dto/update-sla-contract.dto';

@Injectable()
export class SlaContractService {
  constructor(private prisma: PrismaService) {}

  create(createSlaContractDto: CreateSlaContractDto) {
    return 'This action adds a new slaContract';
  }

  // Hàm lấy danh sách hợp đồng (Đã nối với Database thật)
  findAll() {
    return this.prisma.slaContract.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} slaContract`;
  }

  update(id: number, updateSlaContractDto: UpdateSlaContractDto) {
    return `This action updates a #${id} slaContract`;
  }

  remove(id: number) {
    return `This action removes a #${id} slaContract`;
  }
}