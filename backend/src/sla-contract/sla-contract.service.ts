import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Web3Service } from './web3.service'; // <-- Import Web3 Service

@Injectable()
export class SlaContractService {
  // Bơm Web3Service vào đây
  constructor(
    private prisma: PrismaService,
    private web3Service: Web3Service 
  ) {}

  async createContract(data: any) {
    // 1. Tạo Client & Provider tạm
    const clientName = data.client || "Default Client";
    const clientEmail = `${clientName.toLowerCase().replace(/\s/g, '')}@sladex.io`;
    
    const client = await this.prisma.organization.upsert({
      where: { email: clientEmail },
      update: {},
      create: { name: clientName, email: clientEmail }
    });

    const providerName = data.provider || "Amazon Web Services";
    const provider = await this.prisma.provider.upsert({
      where: { name: providerName },
      update: {},
      create: { name: providerName, serviceType: data.service || "Cloud" }
    });

    // 2. Lưu hợp đồng vào Database (Chưa có txHash)
    const contractCode = `SLA-${Math.floor(1000 + Math.random() * 9000)}`;
    let contract = await this.prisma.slaContract.create({
      data: {
        contractCode: contractCode,
        clientId: client.id,
        providerId: provider.id,
        serviceName: data.service,
        uptimeTarget: parseFloat(data.uptime) || 99.9,
        responseMaxMs: parseInt(data.responseTime) || 200,
        penaltyRule: data.penalty,
        status: "ACTIVE",
      },
    });
    // 3. GỌI WEB3 SERVICE ĐỂ BĂM HASH VÀ ĐẨY LÊN CHAIN
    const txHash = await this.web3Service.pushSlaToInjective(contract);

    // 4. Cập nhật lại txHash vào Database
    contract = await this.prisma.slaContract.update({
      where: { id: contract.id },
      data: { txHash: txHash }
    });

    return contract;
  }

  async getAllContracts() {
    return this.prisma.slaContract.findMany({
      include: { client: true, provider: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}