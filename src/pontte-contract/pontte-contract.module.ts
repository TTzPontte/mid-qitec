import { Module } from '@nestjs/common';
import { PontteContractService } from './pontte-contract.service';
import { PontteContractController } from './pontte-contract.controller';
import { QitechService } from 'src/qitech/qitech.service';
import { EscrowService } from 'src/escrow/escrow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
import { Escrow } from 'src/escrow/entities/escrow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escrow, EscrowAccountDestination, EscrowAudit, EscrowAccountManager, EscrowAccountOwner, EscrowAccountManagerRepresentative, EscrowSigner])],
  controllers: [PontteContractController],
  providers: [PontteContractService, QitechService, EscrowService]
})
export class PontteContractModule {





  
}
