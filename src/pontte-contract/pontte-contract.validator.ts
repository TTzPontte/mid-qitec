import { Injectable } from "@nestjs/common";
import { EscrowAccountManagerDto } from "src/escrow/dto/escrow-account-manager.dto";

@Injectable()
export class PontteContractValidator {
    async validateManager(resource: EscrowAccountManagerDto): Promise<any[]> {
        let errors = [];

        const MANDATORY_FIELD_MSG = "The field {0} is mandotary"

        if (!resource.addressCity) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressCity'));
        }
        if (!resource.addressComplement) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressComplement'));
        }
        if (!resource.addressNeighborhood) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressNeighborhood'));
        }
        if (!resource.addressNumber) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressNumber'));
        }
        if (!resource.addressPostalCode) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressPostalCode'));
        }
        if (!resource.addressState) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressState'));
        }
        if (!resource.addressStreet) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressStreet'));
        }
        if (!resource.cnaeCode) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'cnaeCode'));
        }
        if (!resource.companyDocumentNumber) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'companyDocumentNumber'));
        }
        if (!resource.accountManagerRepresentativeList) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'accountManagerRepresentativeList'));
        } else {


            resource.accountManagerRepresentativeList.forEach(element => {

                if (!element.addressCity) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressCity'));
                }
                if (!element.addressComplement) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressComplement'));
                }
                if (!element.addressNeighborhood) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressNeighborhood'));
                }
                if (!element.addressNumber) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressNumber'));
                }
                if (!element.addressPostalCode) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressPostalCode'));
                }
                if (!element.addressState) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressState'));
                }
                if (!element.addressStreet) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'addressStreet'));
                }
                if (!element.birthDate) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'birthDate'));
                }
                if (!element.email) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'email'));
                }
                if (!element.individualDocumentNumber) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'individualDocumentNumber'));
                }
                if (!element.isPep == undefined) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'isPep'));
                }
                if (!element.motherName) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'motherName'));
                }
                if (!element.name) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'name'));
                }
                if (!element.nationality) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'nationality'));
                }
                if (!element.personType) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'personType'));
                }
                if (!element.phoneAreaCode) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'phoneAreaCode'));
                }
                if (!element.phoneCountryCode) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'phoneCountryCode'));
                }
                if (!element.phoneNumber) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'phoneNumber'));
                }
                if (!element.proofOfResidence) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'proofOfResidence'));
                }
                if (!element.documentIdentification) {
                    errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'documentIdentification'));
                }
            });
        }

        if (!resource.companyStatute) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'companyStatute'));
        }
        if (!resource.directorsElectionMinute) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'directorsElectionMinute'));
        }
        if (!resource.email) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'email'));
        }
        if (!resource.foundationDate) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'foundationDate'));
        }
        if (!resource.name) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'name'));
        }
        if (!resource.personType) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'personType'));
        }

        if (!resource.phoneAreaCode) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'phoneAreaCode'));
        }
        if (!resource.phoneCountryCode) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'phoneCountryCode'));
        }
        if (!resource.phoneNumber) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'phoneNumber'));
        }

        if (!resource.tradingName) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'tradingName'));
        }

        if (!resource.birthDate) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'birthDate'));
        }

        if (!resource.individualDocumentNumber) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'individualDocumentNumber'));
        }

        if (!resource.isPep  == undefined) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'isPep'));
        }
        if (!resource.motherName) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'motherName'));
        }
        if (!resource.nationality) {
            errors.push(MANDATORY_FIELD_MSG.replace('{0}', 'nationality'));
        }


        return errors;
    }
}
