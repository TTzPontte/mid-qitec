import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DebtDto } from "./dto/debt.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DebtEntity } from "./entities/Debt.entity";
import { FeeEntity } from "./entities/Fee.entity";
import { AttachmentEntity } from "./entities/Attachment.entity";
import { RelatedPartiesEntity } from "./entities/RelatedParties.entity";
import { AdditionalDebtEntity } from "./entities/AdditionalDebt.entity";
import { IncomeCompositionEntity } from "./entities/IncomeComposition.entity";
import { DestinationAccountEntity } from "./entities/DestinationAccount.entity";
import { InstallmentEntity } from "./entities/Installment.entity";
import { RealEstateEntity } from "./entities/RealEstate.entity";
import { DisbursementAccountEntity } from "./entities/DisbursementAccount.entity";
import { FinancialEntity } from "./entities/Financial.entity";

@Injectable()
export class DebtsService {
  private relations: {};
  private readonly relatedKeys: string[];
  private OneRelation: {};
  private oneRelationKeys: string[];

  constructor(
    @InjectRepository(DebtEntity)
    private debtRepository: Repository<DebtEntity>,
    @InjectRepository(FeeEntity)
    private feeRepository: Repository<FeeEntity>,
    @InjectRepository(AttachmentEntity)
    private attachmentRepository: Repository<AttachmentEntity>,
    @InjectRepository(RelatedPartiesEntity)
    private relatedPartiesRepository: Repository<RelatedPartiesEntity>,
    @InjectRepository(AdditionalDebtEntity)
    private additionalDebtRepository: Repository<AdditionalDebtEntity>,
    @InjectRepository(IncomeCompositionEntity)
    private incomeCompositionRepository: Repository<IncomeCompositionEntity>,
    @InjectRepository(DestinationAccountEntity)
    private destinationAccountRepository: Repository<DestinationAccountEntity>,
    @InjectRepository(DisbursementAccountEntity)
    private disbursementAccountRepository: Repository<DisbursementAccountEntity>,
    @InjectRepository(InstallmentEntity)
    private installmentRepository: Repository<InstallmentEntity>,
    @InjectRepository(RealEstateEntity)
    private realEstateRepository: Repository<RealEstateEntity>,
    @InjectRepository(FinancialEntity)
    private financialRepository: Repository<FinancialEntity>
  ) {
    this.relations = {
      externalContractFees: { repo: feeRepository, entity: FeeEntity },
      relatedParties: {
        repo: relatedPartiesRepository,
        entity: RelatedPartiesEntity,
      },
      realEstates: { repo: realEstateRepository, entity: RealEstateEntity },
      installments: { repo: installmentRepository, entity: InstallmentEntity },
      destinationAccounts: {
        repo: destinationAccountRepository,
        entity: DestinationAccountEntity,
      },
      additionalDebts: {
        repo: additionalDebtRepository,
        entity: AdditionalDebtEntity,
      },
      incomeComposition: {
        repo: incomeCompositionRepository,
        entity: IncomeCompositionEntity,
      },
      attachments: { repo: attachmentRepository, entity: AttachmentEntity },
    };
    this.relatedKeys = Object.keys(this.relations);
  }

  buildTableData = async (list, relationObj) => {
    const { repo, entity } = relationObj;
    const returnList = [];
    for (const item of list) {
      const itemEntity = new entity();
      let itemObject = Object.assign(itemEntity, item);
      itemObject = await repo.save(itemObject);
      returnList.push(itemObject);
    }
    return returnList;
  };
  create = async (debtDto: DebtDto) => {
    let debt = new DebtEntity();
    debt = Object.assign(debt, debtDto);
    for (const key of this.relatedKeys) {
      console.log({ key });
      const list = debtDto[key] || [];
      const repo = this.relations[key];
      const data = await this.buildTableData(list, repo);
      console.log({ data });
      debt[key] = data;
    }

    debt = await this.debtRepository.save(debt);
    return debt;
  };

  findAll() {
    return `This action returns all debts`;
  }

  findOne = async (id: number) => {
    const relations = [
      ...this.relatedKeys,
      "borrower",
      "disbursementAccount",
      "financial",
      "realEstates.possessionComposition",
    ];
    return await this.debtRepository.find({ where: { id }, relations });
  };

  update = async (id: number, debtDto: DebtDto) => {
    return `This action updates a #${id} debt`;
  };

  remove = async (id: number) => {
    return `This action removes a #${id} debt`;
  };
}
