import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscrowModule } from './escrow/escrow.module';
import { QitechModule } from './qitech/qitech.module';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    EscrowModule,
    QitechModule,
    DebtsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

