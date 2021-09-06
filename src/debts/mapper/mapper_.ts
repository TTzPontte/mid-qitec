// const borrower = {
// 	cnaeCode: "cnae_code",
// 	companyDocumentNumber: "company_document_number",
// 	companyStatute: "",
// 	companyRepresentatives: "",
// 	companyType: "company_type",
// 	email: "email",
// 	foundationDate: "borrowe.foundation_date",
// 	fullName: "full_name",
// 	personType: "person_type",
// 	phone: "phone",
// 	tradingName: "trading_name",
// 	documentIdentificationNumber: "document_identification_number",
// 	motherName: "mother_name",
// 	birthDate: "birth_date",
// 	profession: "profession",
// 	nationality: "nationality",
// 	maritalStatus: "marriage_status",
// 	isPep: "is_pep",
// 	propertySystem: "property_system",
// 	individualDocumentNumber: "individual_document_number",
// 	spouse: "spouse",
// 	// weddingCertificate: "",
// 	documentIdentification: "document_identification_number",
// 	proofOfResidence: "proof_of_residence",
// 	addressCity: "address.city",
// 	addressStreet: "address.street",
// 	addressComplement: "address.complement",
// 	addressNeighborhood: "address.neighborhood",
// 	addressNumber: "address.number",
// 	addressPostalCode: "address.postal_code",
// 	addressState: "address.state",
// 	addressCountry: "address.country",
// };
// const financial = {
// 	id: "id",
// 	amount: "amount",
// 	creditOperationType: "credit_operation_type",
// 	issueDate: "issue_date",
// 	disbursementDate: "disbursement_date",
// 	effectivePrefixedInterestRate: "effective_prefixed_interest_rate",
// 	principalAmortizationMonthPeriod: "principal_amortization_month_period",
// 	interestGracePeriod: "interest_grace_period",
// 	interestType: "interest_type",
// 	index: "index",
// 	numberOfInstallments: "number_of_installments",
// 	// totalEffectiveCost: "",
// 	fineConfigContractFineRate: "fine_configuration.contract_fine_rate",
// 	fineConfigInterestBase: "fine_configuration.interest_base",
// 	fineConfiMonthlyRate: "fine_configuration.monthly_rate",
// 	earlySettlementConfigurationType:
// 		"early_settlement_configuration.early_settlement_configuration_type",
// 	earlySettlementConfigurationFixedInterestRate:
// 		"early_settlement_configuration.fixed_interest_rate",
// 	prefixedInterestRateInterestBase: "prefixed_interest_rate.annual_rate",
// 	prefixedInterestRateAnnualRate: "prefixed_interest_rate.annual_rate",
// 	principalGracePeriod: "principal_grace_period",
// };
// const realEstates = {
// 	id: "id",
// 	addressCity: "address.city",
// 	addressComplement: "address.complement",
// 	addressNeighborhood: "address.neighborhood",
// 	addressNumber: "address.number",
// 	addressPostalCode: "address.postal_code",
// 	addressState: "address.state",
// 	addressStreet: "address.street",
// 	addressCountry: "address.country",
// 	enrollmentNumber: "enrollment_number",
// 	municipalInscription: "municipal_inscription",
// 	insurancePolicyNumber: "insurance_policy_number",
// 	warrantyType: "warranty_type",
// 	notaryOfficeCode: "notary_office_code",
// 	description: "description",
// 	incraCode: "incra_code",
// 	estimatedValue: "estimated_value",
// 	possessionComposition: "possession_composition",
// };
// const additional_data = {
// 	realEstateAnalisysExpenses: "additional_data.total_credit_value.real_estate_analisys_expenses",
// 	realEstateRegistryExpenses: "additional_data.total_credit_value.real_estate_registry_expenses",
// 	realEstateDueBalance: "additional_data.total_credit_value.real_estate_due_balance",
// 	netDebtAmount: "additional_data.total_credit_value.net_debt_amount",
// 	clientAvailableBalance: "additional_data.total_credit_value.client_available_balance",
// 	disbursementAccount: "additional_data.disbursement_account",
// 	cciSerialNumber: "additional_data.cci_serial_number",
// 	destinationAccounts: "additional_data.destination_accounts",
// 	additionalDebts: "additional_data.debts",
// 	incomeComposition: "additional_data.income_composition",
// 	attachments: "additional_data.attachments",
// };

// const debt = {
// 	externalContractFees: "external_contract_fees",
// 	relatedParties: "related_parties",
// 	purchaserDocumentNumber: "purchaser_document_number",
// 	custodianDocumentNumber: "custodian_document_number",
// 	installments: "installments",
// 	financial,
// 	borrower,
// 	realEstates,
// 	...additional_data,
// };


// const buildObject = (str, value) => str.split(".").reduceRight((obj, key) => ({ [key]: obj }), value);

// const merge = (target, source) => {
// 	for (const key of Object.keys(source)) {
// 		if (source[key] instanceof Object && key in target)
// 			Object.assign(source[key], merge(target[key], source[key]));
// 	}

// 	Object.assign(target || {}, source);
// 	return target;
// };

// const objMapper1 = (mappedObj, entityData) => {
// 	let finalObj = {};
// 	const baseKeys = Object.keys(mappedObj);

// 	baseKeys.forEach((baseKey) => {
// 		console.log({ baseKeys });
// 		let entityValue = entityData[baseKey];
// 		console.log({ entityValue });
// 		const item = mappedObj[baseKey];
// 		const path = [baseKey];
// 		if (item instanceof Object) {
// 			path.push(item);
// 			const itemKeys = Object.keys(item);
// 			let newObj = {};
// 			itemKeys.forEach((ik) => {
// 				const nestedItem = item[ik];
// 				if (entityData[baseKey] && entityData[baseKey][ik]) {
// 					entityValue = entityData[baseKey][ik];
// 				}
// 				newObj = merge(newObj, buildObject(nestedItem, entityValue));
// 			});
// 			finalObj = merge(finalObj, newObj);
// 		} else {
// 			entityValue = entityData[baseKey];
// 			finalObj = merge(finalObj, buildObject(item, entityValue));
// 		}
// 	});
// 	return finalObj;
// };

// const mapObjects = (firstObject) => {
// 	let newObj = {};
// 	let firstObjectName = Object.keys(firstObject)[0];
// 	const secondObject = firstObject[firstObjectName];

// 	for (const i in secondObject) {
// 		const iValue = secondObject[i];
// 		newObj[i] = firstObjectName + "." + iValue;
// 	}
// 	return newObj;
// };
// // const dbt: Object = (mainObj = {}) => {
// const dbt = (mainObj = {}) => {
// 	let mainObjClone = { ...mainObj };
// 	let newObject = {};
// 	const path = Object.keys(mainObj);
// 	const mainObjSpread = mapObjects(mainObj);
// 	const nestedObjKeys = Object.keys(debt).filter((val) => debt[val] instanceof Object);
// 	const nestedObjs = {};
// 	nestedObjKeys.forEach((i) => {
// 		nestedObjs[i] = debt[i];
// 		const nextPath = [...path, i];
// 		const nextObj = { [nextPath.join(".")]: { ...nestedObjs }[i] };
// 		const mappedItem = mapObjects(nextObj);
// 		console.log({ mappedItem });
// 		newObject[i] = mappedItem;
// 		// newObject = { ...newObject, ...mappedItem };
// 		delete mainObjSpread[i];
// 	});
// 	return { ...mainObjSpread, ...newObject };
// };

// const createqitec = () => {
// 	const mappedKeys = dbt({ debt });
// 	console.log({ mappedKeys });
// 	return objMapper1(mappedKeys, payload);
// };
