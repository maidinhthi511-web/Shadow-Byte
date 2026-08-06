import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SlaContractModule } from './sla-contract/sla-contract.module';

@Module({
  imports: [PrismaModule, SlaContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
