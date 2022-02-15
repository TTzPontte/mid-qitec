import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtDto } from 'src/debts/dto/debt.dto';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
import { Repository } from 'typeorm';
import { EscrowAccountManagerDto } from './dto/escrow-account-manager.dto';
import { EscrowAccountOwnerDto } from './dto/escrow-account-owner.dto';
import { EscrowDto } from './dto/escrow.dto';
import { Escrow } from './entities/escrow.entity';
import { ManagerStatusEnum } from './enum/manager-status';
import { StatusEnum } from './enum/status';
let dateFormat = require('dateformat');
var base64 = require('base-64');

@Injectable()
export class EscrowService {
  constructor(
    @InjectRepository(Escrow)
    private escrowRepository: Repository<Escrow>,
    @InjectRepository(EscrowAccountDestination)
    private escrowAccountDestinationRepository: Repository<EscrowAccountDestination>,
    @InjectRepository(EscrowSigner)
    private escrowSignerRepository: Repository<EscrowSigner>,
    @InjectRepository(EscrowAudit)
    private escrowAuditRepository: Repository<EscrowAudit>,
    @InjectRepository(EscrowAccountManager)
    private escrowAccountManagerRepository: Repository<EscrowAccountManager>,
    @InjectRepository(EscrowAccountOwner)
    private escrowAccountOwnerRepository: Repository<EscrowAccountOwner>,
    @InjectRepository(EscrowAccountManagerRepresentative)
    private escrowAccountManagerRepresentativeRepository: Repository<EscrowAccountManagerRepresentative>
  ) {
  }

  async create(escrowDto: EscrowDto) {
    let escrow = new Escrow();
    Object.assign(escrow, escrowDto);
    console.log("escrow");
    console.log(escrow);

    escrow.status = StatusEnum.NEW;
    escrow.createDate = new Date;
    escrow = await this.escrowRepository.save(escrow);
    return escrow;
  }

  findAll() {
    return this.escrowRepository.find();
  }

  async saveEscrowAccountManager(accountManager: EscrowAccountManager) {
    //verificar se existe manager ativo
    let accountManagerActive = new EscrowAccountManager();
    accountManagerActive = await this.findManagerByStatus(ManagerStatusEnum.ACTIVE);

    if (accountManagerActive) {
      accountManagerActive.status = ManagerStatusEnum.INACTIVE;
      await this.escrowAccountManagerRepository.save(accountManagerActive);
    }

    //se existir, desativar e cadastar um novo
    accountManager.status = ManagerStatusEnum.ACTIVE;
    return await this.escrowAccountManagerRepository.save(accountManager);

  }


  async documentsAccountManager(accountManager: EscrowAccountManager, accontManagerDto: EscrowAccountManagerDto) {


    if (accontManagerDto.documentIdentification) {
      var arrayOfStrings = accontManagerDto.documentIdentification.split(",");
      accountManager.documentIdentificationAttach = Buffer.from(arrayOfStrings[1], "base64");

      let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
      if (type)
        accountManager.documentIdentificationAttachTypeFile = type[0].split("/")[1];
    }

    if (accontManagerDto.directorsElectionMinute) {
      var arrayOfStrings = accontManagerDto.directorsElectionMinute.split(",");
      accountManager.directorsElectionMinuteAttach = Buffer.from(arrayOfStrings[1], "base64");

      let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
      if (type)
        accountManager.directorsElectionMinuteAttachTypeFile = type[0].split("/")[1];
    }
    if (accontManagerDto.proofOfResidence) {
      var arrayOfStrings = accontManagerDto.proofOfResidence.split(",");
      accountManager.proofOfResidenceAttach = Buffer.from(arrayOfStrings[1], "base64");

      let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
      if (type)
        accountManager.proofOfResidenceAttachTypeFile = type[0].split("/")[1];
    }
    if (accontManagerDto.companyStatute) {
      var arrayOfStrings = accontManagerDto.companyStatute.split(",");
      accountManager.companyStatuteAttach = Buffer.from(arrayOfStrings[1], "base64");

      let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
      if (type)
        accountManager.companyStatuteAttachTypeFile = type[0].split("/")[1];
    }

let accountManagerRepresentativeList = [];
    if (accontManagerDto.accountManagerRepresentativeList) {
			let accountManagerRepresentative;
			accontManagerDto.accountManagerRepresentativeList.forEach(element => {

				accountManagerRepresentative = new EscrowAccountManagerRepresentative();
				accountManagerRepresentative = Object.assign(accountManagerRepresentative, element);

				if (element.proofOfResidence) {

          var arrayOfStrings = element.proofOfResidence.split(",");
          accountManagerRepresentative.proofOfResidenceAttach = Buffer.from(arrayOfStrings[1], "base64");
    
          let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
          if (type)
          accountManagerRepresentative.proofOfResidenceAttachTypeFile = type[0].split("/")[1];

				}

				if (element.documentIdentification) {
					var arrayOfStrings = element.documentIdentification.split(",");
					accountManagerRepresentative.documentIdentificationAttach = Buffer.from(arrayOfStrings[1], "base64");

          let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
          if (type)
          accountManagerRepresentative.documentIdentificationAttachTypeFile = type[0].split("/")[1];
				}
        accountManagerRepresentativeList.push(accountManagerRepresentative);
			});
			
		}
    accountManager.accountManagerRepresentativeList = accountManagerRepresentativeList;

    return accountManager;
    // return  await this.updateAccountManager(accountManager);
  }

  async findOne(id: number) {
    const escrow = await this.escrowRepository
      .createQueryBuilder("escrow")
      .leftJoinAndSelect(
        "escrow.escrowAccountDestinationList",
        "escrowAccountDestination"
      )
      .leftJoinAndSelect("escrow.escrowSignerList", "escrowSigner")
      .leftJoinAndSelect("escrow.escrowAuditList", "escrowAudit")
      .leftJoinAndSelect(
        "escrow.escrowAccountManagerList",
        "escrowAccountManager"
      )
      .leftJoinAndSelect("escrow.escrowAccountOwnerList", "escrowAccountOwner")
      .leftJoinAndSelect(
        "escrowAccountManager.escrowAccountManagerRepresentativeList",
        "escrowAccountManagerRepresentative"
      )
      .where("escrow.id = :id", { id })
      .getOne();
    return escrow;
  }

  async update(id: number, escrowDto: EscrowDto) {
    let escrow = await this.findOne(id);
    Object.assign(escrow, escrowDto);
    return await this.escrowRepository.save(escrow);
  }

  async updateEscrow(escrow: Escrow) {
    return await this.escrowRepository.save(escrow);
  }

  remove(id: number) {
    return this.escrowRepository.delete(id);
  }

  async updateAccountOwner(accountOwner: EscrowAccountOwner) {
    await this.escrowAccountOwnerRepository.save(accountOwner);
  }

  async updateAccountManager(accountManager: EscrowAccountManager) {
    return await this.escrowAccountManagerRepository.save(accountManager);
  }

  async updateAccountManagerRepresentative(escrowAccountManagerRepresentative: EscrowAccountManagerRepresentative) {
    await this.escrowAccountManagerRepresentativeRepository.save(escrowAccountManagerRepresentative);
  }

  async findManagerById(id: number) {
    return await this.escrowAccountManagerRepository.createQueryBuilder("accountManager")
      .leftJoinAndSelect("accountManager.accountManagerRepresentativeList", "accountManagerRepresentativeList")
      .where("accountManager.id = :id", { id })
      .getOne();
  }

  async findManagerByStatus(status: number) {
    return await this.escrowAccountManagerRepository.createQueryBuilder("accountManager")
      .leftJoinAndSelect("accountManager.accountManagerRepresentativeList", "accountManagerRepresentativeList")
      .where("accountManager.status = :status", { status })
      .getOne();
  }

  async findListByStatus(status: number) {
    return await this.escrowRepository.createQueryBuilder("escrow")
      .leftJoinAndSelect("escrow.escrowAccountDestinationList", "escrowAccountDestination")
      .leftJoinAndSelect("escrow.escrowSignerList", "escrowSigner")
      .leftJoinAndSelect("escrow.escrowAuditList", "escrowAudit")
      .leftJoinAndSelect("escrow.escrowAccountOwner", "escrowAccountOwner")
      .where("escrow.status = :status", { status })
      .getMany();
  }

  async escrowConverter(debt: DebtDto) {
    let escrow = new EscrowDto();
    escrow.destinationAccounts = [];
    escrow.accountOwner = new EscrowAccountOwnerDto();

    Object.assign(escrow.destinationAccounts, debt.destinationAccounts);
    Object.assign(escrow.accountOwner, debt.borrower);

    if (debt.borrower.documentIdentification) {
      escrow.accountOwner.documentIdentificationAttach = Buffer.from(debt.borrower.documentIdentification);
      escrow.accountOwner.documentIdentificationAttachTypeFile = debt.borrower.documentIdentificationAttachTypeFile;
    }

    if (debt.borrower.proofOfResidence) {
      escrow.accountOwner.proofOfResidenceAttach = Buffer.from(debt.borrower.proofOfResidence);
      escrow.accountOwner.proofOfResidenceAttachTypeFile = debt.borrower.proofOfResidenceAttachTypeFile;
    }

    escrow.accountOwner.type = debt.borrower.personType;
    escrow.accountOwner.phoneCountryCode = debt.borrower.phone.substring(0, 3);
    escrow.accountOwner.phoneAreaCode = debt.borrower.phone.substring(4, 6);
    escrow.accountOwner.phoneNumber = debt.borrower.phone.substring(7, 16);
    escrow.accountOwner.name = debt.borrower.fullName;

    return escrow;

  }

}
