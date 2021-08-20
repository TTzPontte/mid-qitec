import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { QitechDto } from './dto/qitech.dto';
import * as fs from 'fs';
import { single } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Escrow } from 'src/escrow/entities/escrow.entity';
import { Repository } from 'typeorm';
import { EscrowService } from 'src/escrow/escrow.service';
import { EscrowAccountDestination } from 'src/escrow/entities/escrow-account-destination.entity';
import { EscrowAccountManagerRepresentative } from 'src/escrow/entities/escrow-account-manager-representative.entity';
import { EscrowAccountManager } from 'src/escrow/entities/escrow-account-manager.entity';
import { EscrowAccountOwner } from 'src/escrow/entities/escrow-account-owner.entity';
import { EscrowAudit } from 'src/escrow/entities/escrow-audit.entity';
import { EscrowSigner } from 'src/escrow/entities/escrow-signer.entity';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const FormData = require('form-data')
var dateFormat = require('dateformat');



@Injectable()
export class QitechService {
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
    private readonly escrowService: EscrowService


  ) { }

  public async createAccount(data) {
    
    const QITtech = require('qitech-wrapper');
    let qitech_wrapper = QITtech({
      clientKey: "3fb54232-00c3-44c1-bd99-883f3c50da46",
      privateKey: "/opt/pontte/arquivos/jwtECDSASHA512.key",
      publicKey: "/opt/pontte/arquivos/jwtECDSASHA512.key.pub"
    });

    let qitechResponse: any;

    try {
      qitechResponse = await qitech_wrapper.escrow.post(data);
      console.log(qitechResponse.decoded);

    } catch (error) {
      console.error(error.decoded);
    }
    console.log(qitechResponse.decoded);
    return qitechResponse.decoded;
  }

  async upload(fileContent) {
    const QITtech = require('qitech-wrapper');
    let qitech_wrapper = QITtech({
      clientKey: "3fb54232-00c3-44c1-bd99-883f3c50da46",
      privateKey: "/opt/pontte/arquivos/jwtECDSASHA512.key",
      publicKey: "/opt/pontte/arquivos/jwtECDSASHA512.key.pub"
    });

    // let fileContent = '/opt/pontte/arquivos/teste.pdf';
    let qitechResponse: any;

    try {
      qitechResponse = await qitech_wrapper.upload.post(fileContent);
      console.log(qitechResponse.decoded);

    } catch (error) {
      console.error(error.decoded);
      return { document_key: null, document_md5: null };
    }

    return qitechResponse.decoded;
  }

}
