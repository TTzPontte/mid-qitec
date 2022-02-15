import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import config from "src/config/config";
import { StatusEnum } from "src/escrow/enum/status";
import { Repository } from "typeorm";
import { DebtDto } from "./dto/debt.dto";
import { AdditionalDebtEntity } from "./entities/AdditionalDebt.entity";
import { AttachmentEntity } from "./entities/Attachment.entity";
import { BorrowerEntity } from "./entities/Borrower.entity";
import { DebtEntity } from "./entities/Debt.entity";
import { DestinationAccountEntity } from "./entities/DestinationAccount.entity";
import { DisbursementAccountEntity } from "./entities/DisbursementAccount.entity";
import { FeeEntity } from "./entities/Fee.entity";
import { FinancialEntity } from "./entities/Financial.entity";
import { IncomeCompositionEntity } from "./entities/IncomeComposition.entity";
import { InstallmentEntity } from "./entities/Installment.entity";
import { RealEstateEntity } from "./entities/RealEstate.entity";
import { RelatedPartiesEntity } from "./entities/RelatedParties.entity";
const QITtech = require("qitech-wrapper");
var base64 = require('base-64');

@Injectable()
export class DebtsService {
	qitech_wrapper = QITtech({
		clientKey: config.QITECH_CLIENTKEY,
		privateKey: config.QITECH_PRIVATEKEY,
		publicKey: config.QITECH_PUBLICKEY,
	});
	private relations: {};
	private readonly relatedKeys: string[];

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

		@InjectRepository(BorrowerEntity)
		private borrowerRepository: Repository<BorrowerEntity>,

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

		if (debtDto.borrower.weddingCertificate) {
			var arrayOfStrings = debtDto.borrower.weddingCertificate.split(",");
			debt.borrower.weddingCertificate = Buffer.from(arrayOfStrings[1], "base64");
			let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
				if (type)
			debt.borrower.weddingCertificateAttachTypeFile = type[0].split("/")[1];
		}

		if (debtDto.borrower.documentIdentification) {
			var arrayOfStrings = debtDto.borrower.documentIdentification.split(",");
			debt.borrower.documentIdentification = Buffer.from(arrayOfStrings[1], "base64");
			let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
			if (type)
				debt.borrower.documentIdentificationAttachTypeFile = type[0].split("/")[1];
		}

		if (debtDto.borrower.proofOfResidence) {
			var arrayOfStrings = debtDto.borrower.proofOfResidence.split(",");
			debt.borrower.proofOfResidence = Buffer.from(arrayOfStrings[1], "base64");

			let type = arrayOfStrings[0].match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)
			if (type)
				debt.borrower.proofOfResidenceAttachTypeFile = type[0].split("/")[1];
		}

		if (debtDto.relatedParties) {
			let relatedPartie;
			debtDto.relatedParties.forEach(element => {

				relatedPartie = new RelatedPartiesEntity();
				relatedPartie = Object.assign(relatedPartie, element);


				if (element.weddingCertificate) {
					var arrayOfStrings = element.weddingCertificate.split(",");
					// var bytes = base64.decode(arrayOfStrings[1]);
					relatedPartie.weddingCertificate = Buffer.from(arrayOfStrings[1], "base64");;
				}

				if (element.documentIdentification) {
					var arrayOfStrings = element.documentIdentification.split(",");
					// var bytes = base64.decode(arrayOfStrings[1]);
					relatedPartie.documentIdentification = Buffer.from(arrayOfStrings[1], "base64");;
				}

				if (element.proofOfResidence) {
					var arrayOfStrings = element.proofOfResidence.split(",");
					// var bytes = base64.decode(arrayOfStrings[1]);
					relatedPartie.proofOfResidence = Buffer.from(arrayOfStrings[1], "base64");;
				}
	
			});
			debt.relatedParties.push(relatedPartie);
		}

		for (const key of this.relatedKeys) {
			const list = debtDto[key] || [];
			const repo = this.relations[key];
			debt[key] = await this.buildTableData(list, repo);
		}
		debt.status = StatusEnum.NEW;
		debt = await this.debtRepository.save(debt);
		return debt;
	};

	findAll() {
		return this.debtRepository.find()
	}

	findOne = async (id: number) => {
		const relations = [
			...this.relatedKeys,
			"borrower",
			"disbursementAccount",
			"financial",
			"realEstates.possessionComposition",
		];
		const debts = await this.debtRepository.find({ where: { id }, relations });
		const debt = debts[0];
		console.log({ debt });
		const { financial, realEstates, destinationAccounts } = debt;
		console.log(debt["financial"]);
		console.log(debt["id"]);

		return debt;
	};

	async findByStatus(status: number) {
		const relations = [
			...this.relatedKeys,
			"borrower",
			"disbursementAccount",
			"financial",
			"realEstates.possessionComposition",
		];
		return await this.debtRepository.find({ where: { status }, relations });
	  }

	update = async (id: number, debtDto: DebtDto) => {
		return `This action updates a #${id} debt`;
	};

	async updateDebt(debt: DebtEntity) {
		return await this.debtRepository.save(debt);
	  }

	remove = async (id: number) => {
		return `This action removes a #${id} debt`;
	};

	async createQitech(createQitechDto: string) {
		console.log({ createQitechDto });
		const qitechResponse = await this.qitech_wrapper.debt.post(createQitechDto);
		return qitechResponse;
	}

	async updateBorrower(borrower: BorrowerEntity) {
		await this.borrowerRepository.save(borrower);
	  }
}
