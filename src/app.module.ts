import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscrowModule } from './escrow/escrow.module';
import { GoogleDriveModule } from './google-drive/google-drive.module';
import { PontteContractModule } from './pontte-contract/pontte-contract.module';
import { QitechModule } from './qitech/qitech.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    EscrowModule,
    QitechModule,
    PontteContractModule,
    GoogleDriveModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

