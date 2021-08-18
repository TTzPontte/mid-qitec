import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscrowModule } from './escrow/escrow.module';
import { EscrowService } from './escrow/escrow.service';
import { QitechModule } from './qitech/qitech.module';
import { PontteContractModule } from './pontte-contract/pontte-contract.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    EscrowModule,
    QitechModule,
    PontteContractModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

