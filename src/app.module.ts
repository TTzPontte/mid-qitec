import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { DebtsModule } from "./debts/debts.module";
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
    GoogleDriveModule,
    DebtsModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      expandVariables: true,     
    }),
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
