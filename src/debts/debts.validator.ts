import { Injectable } from "@nestjs/common";
import { DebtDto } from "./dto/debt.dto";

@Injectable()
export class DebtValidator {
    async validate(resource: DebtDto): Promise<any[]> {
        let errors = [];

        const MANDATORY_FIELD_MSG = "The field {0} is mandotary"

        if (!resource.borrower) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'borrower'));
        } else {
            if (!resource.borrower.personType) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'personType'));
            }
            if (!resource.borrower.fullName) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'fullName'));
            }
            if (!resource.borrower.email) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'email'));
            }
            if (!resource.borrower.documentIdentificationNumber) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'documentIdentificationNumber'));
            }
            if (!resource.borrower.individualDocumentNumber) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'individualDocumentNumber'));
            }
            if (!resource.borrower.phone) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'phone'));
            }
            if (!resource.borrower.motherName) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'motherName'));
            }

            if (resource.borrower.weddingCertificate) {
                var type = resource.borrower.weddingCertificate.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
				if (type && !(type[0].split("/")[1] == "pdf" || type[0].split("/")[1] == "png"))  {
                    errors.push(`Document type ${type[0].split("/")[1]} is not allowed on weddingCertificate`);
                }
            }

            if (!resource.borrower.proofOfResidence) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'proofOfResidence'));
            }else{

                var type = resource.borrower.proofOfResidence.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
				if (type && !(type[0].split("/")[1] == "pdf" || type[0].split("/")[1] == "png"))  {
                    errors.push(`Document type ${type[0].split("/")[1]} is not allowed on proofOfResidence`);
                }
            }

            if (!resource.borrower.documentIdentification) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'documentIdentification'));
            }else{

                var type = resource.borrower.documentIdentification.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
				if (type && !(type[0].split("/")[1] == "pdf" || type[0].split("/")[1] == "png"))  {
                    errors.push(`Document type ${type[0].split("/")[1]} is not allowed on documentIdentification`);
                }

            }

            if (!resource.borrower.addressPostalCode) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressPostalCode'));
            }
            if (!resource.borrower.addressState) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressState'));
            }
            if (!resource.borrower.addressCity) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressCity'));
            }
            if (!resource.borrower.addressNeighborhood) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressNeighborhood'));
            }
            if (!resource.borrower.addressStreet) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressStreet'));
            }
            if (!resource.borrower.addressNumber) {
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressNumber'));
            }

            if(!resource.destinationAccounts){
                errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'destinationAccounts'));
            }else{
                resource.destinationAccounts.forEach(element => {
                    if (!element.accountBranch) {
                        errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'accountBranch'));
                    }
                    if (!element.accountDigit) {
                        errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'accountDigit'));
                    }
                    if (!element.accountNumber) {
                        errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'accountNumber'));
                    }
                    if (!element.financialInstitutionsCodeNumber) {
                        errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'financialInstitutionsCodeNumber'));
                    }
                    
                });
                
            }

        }

        return errors;
    }
}
