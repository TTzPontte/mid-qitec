import { AttachmentDto } from "./Attachment.dto";
import { RelatedPartiesDto } from "./RelatedParties.dto";
import { InstallmentDto } from "./Installment.dto";
import { AdditionalDebtDto } from "./AdditionalDebt.dto";
import { FinancialDto } from "./Financial.dto";
import { DisbursementAccountDto } from "./DisbursementAccount.dto";
import { IncomeCompositionDto } from "./IncomeComposition.dto";
import { RealEstateDto } from "./RealEstate.dto";
import { FeeDto } from "./Fee.dto";
import { DestinationAccountDto } from "./destinationAccount.dto";
import { BorrowerDto } from "./Borrower.dto";

export class DebtDto {
  id: number;
  purchaserDocumentNumber: string;
  custodianDocumentNumber: string;
  cciSerialNumber: string;
  realEstateAnalisysExpenses: number;
  realEstateRegistryExpenses: number;
  realEstateDueBalance: number;
  netDebtAmount: number;
  clientAvailableBalance: number;
  externalContractFees: FeeDto[];
  borrower?: BorrowerDto;
  relatedParties?: RelatedPartiesDto[];
  installments?: InstallmentDto[];
  additionalDebts?: AdditionalDebtDto[];
  destinationAccounts?: DestinationAccountDto[];
  financial?: FinancialDto;
  disbursementAccount?: DisbursementAccountDto | null;
  incomeComposition: IncomeCompositionDto[];
  realEstates?: RealEstateDto[];
  attachments: AttachmentDto[];
  
}
