import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtDto } from '../debts/dto/debt.dto';
import { EscrowAccountDestination } from '../escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from '../escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from '../escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from '../escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from '../escrow/entities/escrow-audit.entity';
import { EscrowSigner } from '../escrow/entities/escrow-signer.entity';
import { Repository } from 'typeorm';
import { EscrowAccountManagerDto } from './dto/escrow-account-manager.dto';
import { EscrowAccountOwnerDto } from './dto/escrow-account-owner.dto';
import { EscrowDto } from './dto/escrow.dto';
import { Escrow } from './entities/escrow.entity';
import { StatusEnum } from './enum/status';
let dateFormat = require('dateformat');

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

    // if (escrow.destinationAccounts != null) {
    //   const escrowAccountDestinations = [];
    //   for (let i = 0; i < escrow.destinationAccounts.length; i++) {

    //     let escrowAccountDestination = new EscrowAccountDestination();
    //     Object.assign(escrowAccountDestination, escrow.destinationAccounts[i]);

    //     escrowAccountDestination = await this.escrowAccountDestinationRepository.save(escrowAccountDestination);

    //     escrowAccountDestinations.push(escrowAccountDestination);
    //   }
    //   escrow.destinationAccounts = escrowAccountDestinations;
    // }

    // if (escrow.signerList) {
    //   const escrowSigners = [];
    //   for (let i = 0; i < escrow.signerList.length; i++) {
    //     let escrowSigner = new EscrowSigner();

    //     Object.assign(escrowSigner, escrow.signerList[i]);

    //     escrowSigner = await this.escrowSignerRepository.save(escrowSigner);

    //     escrowSigners.push(escrowSigner);
    //   }
    //   escrow.signerList = escrowSigners;
    // }

    // if (escrow.auditList) {
    //   const escrowAudits = [];
    //   for (let i = 0; i < escrow.auditList.length; i++) {
    //     let escrowAudit = new EscrowAudit();
    //     Object.assign(escrowAudit, escrow.auditList[i]);

    //     escrowAudit = await this.escrowAuditRepository.save(escrowAudit);

    //     escrowAudits.push(escrowAudit);
    //   }
    //   escrow.auditList = escrowAudits;
    // }

    if (escrow.accountManager) {
      let escrowAccountManager = new EscrowAccountManager();
      Object.assign(escrowAccountManager, escrow.accountManager);

      if (escrowAccountManager.accountManagerRepresentativeList) {

        const escrowAccountManagerRepresentatives = [];
        for (let i = 0; i < escrowAccountManager.accountManagerRepresentativeList.length; i++) {
          let escrowAccountManagerRepresentative = new EscrowAccountManagerRepresentative();
          Object.assign(escrowAccountManagerRepresentative, escrowAccountManager.accountManagerRepresentativeList[i]);

          escrowAccountManagerRepresentative = await this.escrowAccountManagerRepresentativeRepository.save(escrowAccountManagerRepresentative);

          escrowAccountManagerRepresentatives.push(escrowAccountManagerRepresentative);
        }
        escrowAccountManager.accountManagerRepresentativeList = escrowAccountManagerRepresentatives;

      }

      escrowAccountManager = await this.escrowAccountManagerRepository.save(escrowAccountManager);

      escrow.accountManager = escrowAccountManager;
    }

    // if (escrow.accountOwner) {
    //   let escrowAccountOwner = new EscrowAccountOwner();

    //   Object.assign(escrowAccountOwner, escrow.accountOwner);

    //   escrowAccountOwner = await this.escrowAccountOwnerRepository.save(escrowAccountOwner);

    //   escrow.accountOwner = escrowAccountOwner;

    // }

    escrow.status = StatusEnum.NEW;
    escrow.createDate = new Date;
    escrow = await this.escrowRepository.save(escrow);
    return escrow;
  }

  findAll() {
    return this.escrowRepository.find();
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
    await this.escrowAccountManagerRepository.save(accountManager);
  }

  async updateAccountManagerRepresentative(escrowAccountManagerRepresentative: EscrowAccountManagerRepresentative) {
    await this.escrowAccountManagerRepresentativeRepository.save(escrowAccountManagerRepresentative);
  }

  async findByStatus(status: number) {
    return await this.escrowRepository.createQueryBuilder("escrow")
      .leftJoinAndSelect("escrow.escrowAccountDestinationList", "escrowAccountDestination")
      .leftJoinAndSelect("escrow.escrowSignerList", "escrowSigner")
      .leftJoinAndSelect("escrow.escrowAuditList", "escrowAudit")
      .leftJoinAndSelect("escrow.escrowAccountManager", "escrowAccountManager")
      .leftJoinAndSelect("escrow.escrowAccountOwner", "escrowAccountOwner")
      .leftJoinAndSelect("escrowAccountManager.escrowAccountManagerRepresentativeList", "escrowAccountManagerRepresentative")
      .where("escrow.status = :status", { status })
      .getOne();
  }

  async findListByStatus(status: number) {
    return await this.escrowRepository.createQueryBuilder("escrow")
      .leftJoinAndSelect("escrow.escrowAccountDestinationList", "escrowAccountDestination")
      .leftJoinAndSelect("escrow.escrowSignerList", "escrowSigner")
      .leftJoinAndSelect("escrow.escrowAuditList", "escrowAudit")
      .leftJoinAndSelect("escrow.escrowAccountManager", "escrowAccountManager")
      .leftJoinAndSelect("escrow.escrowAccountOwner", "escrowAccountOwner")
      .leftJoinAndSelect("escrowAccountManager.escrowAccountManagerRepresentativeList", "escrowAccountManagerRepresentative")
      .where("escrow.status = :status", { status })
      .getMany();
  }

  async escrowConverter(debit: DebtDto) {
    let escrow = new EscrowDto();
    escrow.destinationAccounts = [];
    escrow.accountOwner = new EscrowAccountOwnerDto();
    escrow.accountManager = new EscrowAccountManagerDto();
    let accountManager = {
      "type": "PJ",
      "name": "Kaique e Giovanna Contábil ME",
      "cnaeCode": "6499-9/99",
      "companyDocumentNumber": "09456933000162",
      "companyStatuteAttach": "123",
      "email": "kaiqueegiovannacontabilme@yopmail.com",
      "foundationDate": new Date("2014-08-21"),
      "personType": "legal",
      "addressStreet": "Av. Brigadeiro Faria Lima",
      "addressState": "SP",
      "addressCity": "São Paulo",
      "addressNeighborhood": "Jardim Paulistano",
      "addressNumber": "2391",
      "addressPostalCode": "01452960",
      "addressComplement": "7 andar",
      "phoneCountryCode": "055",
      "phoneAreaCode": "11",
      "phoneNumber": "999999999",
      "motherName": "123",
      "birthDate": new Date("2021-05-05"),
      "nationality": "Brasileira",
      "isPep": false,
      "individualDocumentNumber": "85324558400",
      "documentIdentificationAttach": "123",
      "proofOfResidenceAttach": "123",
      "tradingName": "TESTE",
      "accountManagerRepresentativeList": [
        {
          "personType": "natural",
          "name": "Aurora Simone Catarina Nogueira",
          "motherName": "Maria Mariane",
          "birthDate": new Date("1990-05-06"),
          "nationality": "Brasileira",
          "isPep": false,
          "individualDocumentNumber": "08141163701",
          "documentIdentificationAttach": "123",
          "email": "aurora.nogueira@yopmail.com",
          "phoneCountryCode": "055",
          "phoneAreaCode": "11",
          "phoneNumber": "9128281359",
          "addressStreet": "Passagem Mariana",
          "addressState": "PA",
          "addressCity": "Ananindeua",
          "addressNeighborhood": "Águas Lindas",
          "addressNumber": "660",
          "addressPostalCode": "67118003",
          "addressComplement": "complemento",
          "proofOfResidenceAttach": "123"
        }

      ]

    }

    Object.assign(escrow.destinationAccounts, debit.destinationAccounts);
    Object.assign(escrow.accountOwner, debit.borrower);
    Object.assign(escrow.accountManager, accountManager);

    escrow.accountOwner.name = debit.borrower.fullName;
    escrow.accountOwner.type = 'PF';
    escrow.accountOwner.phoneCountryCode = "055";
    escrow.accountOwner.phoneAreaCode = "11";
    escrow.accountOwner.phoneNumber = "999999999";

    return escrow;

  }

}
