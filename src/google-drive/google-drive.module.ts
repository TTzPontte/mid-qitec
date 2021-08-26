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
import { PontteContractService } from 'src/pontte-contract/pontte-contract.service';
import { QitechService } from 'src/qitech/qitech.service';
import { GoogleDriveController } from './google-drive.controller';
import { GoogleDriveService } from './google-drive.service';

@Module({
  providers: [GoogleDriveService]
})
export class GoogleDriveModule { }
