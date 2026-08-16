import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SlaContractModule } from './sla-contract/sla-contract.module';
import { OracleService } from './sla-contract/oracle.service';
import { Web3Service } from './sla-contract/web3.service';

@Module({
  imports: [PrismaModule, SlaContractModule, ScheduleModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService, OracleService, Web3Service],
})
export class AppModule {}
