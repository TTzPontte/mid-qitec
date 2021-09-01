export class c {
  id: number;
  purchaserDocumentNumber: string;
  custodianDocumentNumber: string;
  cciSerialNumber: string;
  realEstateAnalisysExpenses: number;
  realEstateRegistryExpenses: number;
  realEstateDueBalance: number;
  netDebtAmount: number;
  clientAvailableBalance: number;
  externalContractFees: [];
  borrower?: object;
  relatedParties?: [];
  installments?: [];
  additionalDebts?: any;
  destinationAccounts?: any;
  financial?: object;
  disbursementAccount?: object | null;
  incomeComposition: any;
  realEstates?: any;
  attachments: any;
}
