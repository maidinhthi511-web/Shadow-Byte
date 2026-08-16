import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OracleService {
  private readonly logger = new Logger(OracleService.name);

  constructor(private prisma: PrismaService) {}

  // Cài đặt chạy tự động mỗi 30 giây 
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.debug(' Oracle Hub đang quét dữ liệu KPI từ các hệ thống giám sát...');

    // 1. Lấy tất cả các hợp đồng đang ở trạng thái ACTIVE (Đang chạy)
    const activeContracts = await this.prisma.slaContract.findMany({
      where: { status: 'ACTIVE' },
    });

    if (activeContracts.length === 0) return;

    for (const contract of activeContracts) {
      // 2. Giả lập tỉ lệ Uptime thực tế (Random từ 98.0% đến 100.0%)
      const currentUptime = 98 + Math.random() * 2;
      
      let newStatus = contract.status;
      let isViolation = false;

      // 3. Logic check vi phạm (Dưới target -> VIOLATED, Sát target -> WARNING)
      if (currentUptime < contract.uptimeTarget) {
        newStatus = 'VIOLATED';
        isViolation = true;
        this.logger.warn(`❌ Phát hiện vi phạm HĐ ${contract.contractCode}! Uptime đo được: ${currentUptime.toFixed(2)}%`);
      } else if (currentUptime - contract.uptimeTarget <= 0.05) {
        newStatus = 'WARNING';
        this.logger.warn(`⚠️ Cảnh báo HĐ ${contract.contractCode}. Uptime đang ở ngưỡng nguy hiểm: ${currentUptime.toFixed(2)}%`);
      }

      // 4. Ghi lại nhật ký vào database (Để trang Dashboard xuất Báo cáo đối soát)
      await this.prisma.slaEventLog.create({
        data: {
          contractId: contract.id,
          kpiCode: 'UPTIME_CHECK',
          metricValue: currentUptime,
          isViolation: isViolation,
          description: `Hệ thống ghi nhận Uptime đạt ${currentUptime.toFixed(2)}% (Mục tiêu: ${contract.uptimeTarget}%)`,
        }
      });

      // 5. Cập nhật trạng thái Hợp đồng nếu có biến biến đổi
      if (newStatus !== contract.status) {
        await this.prisma.slaContract.update({
          where: { id: contract.id },
          data: { status: newStatus },
        });
      }
    }
  }
}