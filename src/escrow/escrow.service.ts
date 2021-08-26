import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
import { Repository } from 'typeorm';
import { EscrowDto } from './dto/escrow.dto';
import { Escrow } from './entities/escrow.entity';
import { StatusEnum } from './enum/status';

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
    private escrowAccountManagerRepresentativeRepository: Repository<EscrowAccountManagerRepresentative>,
  ) { }

  async create(escrowDto: EscrowDto) {
    let escrow = new Escrow();
    Object.assign(escrow, escrowDto);

    console.log('escrow');
    console.log(escrow);

    if (escrow.escrowAccountDestinationList != null) {
      const escrowAccountDestinations = [];
      for (let i = 0; i < escrow.escrowAccountDestinationList.length; i++) {

        let escrowAccountDestination = new EscrowAccountDestination();
        Object.assign(escrowAccountDestination, escrow.escrowAccountDestinationList[i]);

        escrowAccountDestination = await this.escrowAccountDestinationRepository.save(escrowAccountDestination);

        escrowAccountDestinations.push(escrowAccountDestination);
      }
      escrow.escrowAccountDestinationList = escrowAccountDestinations;

    }

    if (escrow.escrowSignerList) {

      const escrowSigners = [];
      for (let i = 0; i < escrow.escrowSignerList.length; i++) {
        let escrowSigner = new EscrowSigner();

        Object.assign(escrowSigner, escrow.escrowSignerList[i]);

        escrowSigner = await this.escrowSignerRepository.save(escrowSigner);

        escrowSigners.push(escrowSigner);
      }
      escrow.escrowSignerList = escrowSigners;

    }

    if (escrow.escrowAuditList) {
      const escrowAudits = [];
      for (let i = 0; i < escrow.escrowAuditList.length; i++) {
        let escrowAudit = new EscrowAudit();
        Object.assign(escrowAudit, escrow.escrowAuditList[i]);

        escrowAudit = await this.escrowAuditRepository.save(escrowAudit);

        escrowAudits.push(escrowAudit);
      }
      escrow.escrowAuditList = escrowAudits;

    }

    if (escrow.escrowAccountManager) {
      let escrowAccountManager = new EscrowAccountManager();
      Object.assign(escrowAccountManager, escrow.escrowAccountManager);

      if (escrowAccountManager.escrowAccountManagerRepresentativeList) {

        const escrowAccountManagerRepresentatives = [];
        for (let i = 0; i < escrowAccountManager.escrowAccountManagerRepresentativeList.length; i++) {
          let escrowAccountManagerRepresentative = new EscrowAccountManagerRepresentative();
          Object.assign(escrowAccountManagerRepresentative, escrowAccountManager.escrowAccountManagerRepresentativeList[i]);

          escrowAccountManagerRepresentative = await this.escrowAccountManagerRepresentativeRepository.save(escrowAccountManagerRepresentative);

          escrowAccountManagerRepresentatives.push(escrowAccountManagerRepresentative);
        }
        escrowAccountManager.escrowAccountManagerRepresentativeList = escrowAccountManagerRepresentatives;

      }

      escrowAccountManager = await this.escrowAccountManagerRepository.save(escrowAccountManager);

      escrow.escrowAccountManager = escrowAccountManager;
    }

    if (escrow.escrowAccountOwner) {
      let escrowAccountOwner = new EscrowAccountOwner();
      
      Object.assign(escrowAccountOwner, escrow.escrowAccountOwner);

      escrowAccountOwner = await this.escrowAccountOwnerRepository.save(escrowAccountOwner);

      escrow.escrowAccountOwner = escrowAccountOwner;

    }

    escrow.status = StatusEnum.NEW;
    escrow.createDate = new Date;
    escrow = await this.escrowRepository.save(escrow);
    return escrow;
  }

  findAll() {
    return this.escrowRepository.find();
  }

  async findOne(id: number) {
    const escrow = await this.escrowRepository.createQueryBuilder("escrow")
      .leftJoinAndSelect("escrow.escrowAccountDestinationList", "escrowAccountDestination")
      .leftJoinAndSelect("escrow.escrowSignerList", "escrowSigner")
      .leftJoinAndSelect("escrow.escrowAuditList", "escrowAudit")
      .leftJoinAndSelect("escrow.escrowAccountManagerList", "escrowAccountManager")
      .leftJoinAndSelect("escrow.escrowAccountOwnerList", "escrowAccountOwner")
      .leftJoinAndSelect("escrowAccountManager.escrowAccountManagerRepresentativeList", "escrowAccountManagerRepresentative")
      .where("escrow.id = :id", { id: id })
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

}
