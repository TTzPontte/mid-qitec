import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { EscrowService } from 'src/escrow/escrow.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { QitechService } from 'src/qitech/qitech.service';
import { PontteContractController } from './pontte-contract.controller';
import { PontteContractService } from './pontte-contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([Escrow, EscrowAccountDestination, EscrowAudit, EscrowAccountManager, EscrowAccountOwner, EscrowAccountManagerRepresentative, EscrowSigner])],
  controllers: [PontteContractController],
  providers: [QitechService, EscrowService, PontteContractService, GoogleDriveService]
})
export class PontteContractModule {

}
