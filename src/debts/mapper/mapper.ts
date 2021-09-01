const nestedObjectBuilder = (str, value) =>
	str.split(".").reduceRight((obj, key) => ({ [key]: obj }), value);

const objMerge = (target, source) => {
	for (const key of Object.keys(source)) {
		if (source[key] instanceof Object && key in target)
			Object.assign(source[key], objMerge(target[key], source[key]));
	}

	Object.assign(target || {}, source);
	return target;
};

const objValueMapper = (mappedObj, entityData) => {
	let finalObj = {};
	const baseKeys = Object.keys(mappedObj);

	baseKeys.forEach((baseKey) => {
		let entityValue = entityData[baseKey];
		const item = mappedObj[baseKey];
		const path = [baseKey];
		if (item instanceof Object) {
			path.push(item);
			const itemKeys = Object.keys(item);
			let newObj = {};
			itemKeys.forEach((ik) => {
				const nestedItem = item[ik];
				if (entityData[baseKey] && entityData[baseKey][ik]) {
					entityValue = entityData[baseKey][ik];
				}
				newObj = objMerge(newObj, nestedObjectBuilder(nestedItem, entityValue));
			});
			finalObj = objMerge(finalObj, newObj);
		} else {
			entityValue = entityData[baseKey];
			finalObj = objMerge(finalObj, nestedObjectBuilder(item, entityValue));
		}
	});
	return finalObj;
};

const objKeyMapper = (firstObject) => {
	let newObj = {};
	let firstObjectName = Object.keys(firstObject)[0];
	const secondObject = firstObject[firstObjectName];

	for (const i in secondObject) {
		const iValue = secondObject[i];
		newObj[i] = firstObjectName + "." + iValue;
	}
	return newObj;
};
const objKeyValueMapper = (mainObj = {}) => {
	let mainObjClone = { ...mainObj };
	let newObject = {};
	const path = Object.keys(mainObj);
	const mainObjSpread = objKeyMapper(mainObj);
	const nestedObjKeys = Object.keys(debt).filter((val) => debt[val] instanceof Object);
	const nestedObjs = {};
	nestedObjKeys.forEach((i) => {
		nestedObjs[i] = debt[i];
		const nextPath = [...path, i];
		const nextObj = { [nextPath.join(".")]: { ...nestedObjs }[i] };
		const mappedItem = objKeyMapper(nextObj);
		console.log({ mappedItem });
		newObject[i] = mappedItem;
		// newObject = { ...newObject, ...mappedItem };
		delete mainObjSpread[i];
	});
	return { ...mainObjSpread, ...newObject };
};

const createqitec = () => {
	let payload = {
		id: 5,
		purchaserDocumentNumber: "32491039000134",
		custodianDocumentNumber: "22610500000188",
		cciSerialNumber: "202102",
		realEstateAnalisysExpenses: 234,
		realEstateRegistryExpenses: 10040,
		realEstateDueBalance: 1000,
		netDebtAmount: 589960,
		clientAvailableBalance: 500000,
		externalContractFees: [
			{
				id: 5,
				feeType: "warranty_analysis",
				amountType: "absolute",
				amount: "10500",
			},
		],
		relatedParties: [],
		realEstates: [
			{
				id: 5,
				addressCity: "Recife",
				addressComplement: "163A",
				addressNeighborhood: "Fund�o",
				addressNumber: "137",
				addressPostalCode: "52221110",
				addressState: "PE",
				addressStreet: "Rua Camapu�",
				addressCountry: "Brazil",
				enrollmentNumber: "54545",
				municipalInscription: "6556",
				insurancePolicyNumber: "6565650",
				warrantyType: "mortgage",
				notaryOfficeCode: 2222,
				description:
					"O referido im�vel foi havido pelos devedores por for�a do registro R.05, na matr�cula n� 221.400, do Livro N�2de Registro Geral do 18� Oficial de Registro de Im�veis da Comarca de S�o Paulo/SP.",
				incraCode: null,
				estimatedValue: 5265464,
				possessionComposition: [
					{ id: 5, name: "MARICELIO SOARES FELINTO", percentage: "0.8" },
					{ id: 6, name: "Maria Maricelio Wife", percentage: "0.2" },
				],
			},
		],
		installments: [
			{
				id: 9,
				principalAmortizationAmount: "300000",
				dueDate: "2020-12-27",
				prefixedInterestAmount: "500",
				costTsa: "500",
				costMip: "20",
				costDfi: "20",
			},
			{
				id: 10,
				principalAmortizationAmount: "300000",
				dueDate: "2020-12-27",
				prefixedInterestAmount: "500",
				costTsa: "500",
				costMip: "20",
				costDfi: "20",
			},
		],
		destinationAccounts: [],
		additionalDebts: [],
		incomeComposition: [],
		attachments: [
			{ id: 9, img: "https://url.de.imagem.da.certid�o/j320b4je5nmes" },
			{ id: 10, img: "https://url.do.laudo.do.im�vel/jdp230kdml9vc" },
		],
		borrower: {
			id: 5,
			cnaeCode: "1234",
			companyDocumentNumber: "",
			companyStatute: "",
			companyRepresentatives: "",
			companyType: "",
			email: "mo@hotmail.com",
			foundationDate: "",
			fullName: "MARICELIO SOARES FELINTO",
			personType: "natural",
			phone: "05516991722315",
			tradingName: "MARICELIO SOARES FELINTO LTDA",
			motherName: "MARICELIO MOM",
			birthDate: "1990-10-31",
			profession: "DIRETOR DE TRANSPORTADORA",
			nationality: "BRASILEIRA",
			maritalStatus: "totalCommunion",
			isPep: "0",
			propertySystem: "",
			individualDocumentNumber: "05521723404",
			documentIdentificationNumber: " 529403500",
			spouse: "",
			weddingCertificate: "",
			documentIdentification: "",
			proofOfResidence: "",
			addressCity: "S�o Paulo",
			addressComplement: "apto 15",
			addressNeighborhood: "Bairro",
			addressNumber: "121",
			addressPostalCode: "01415001",
			addressState: "SP",
			addressStreet: "RUA PADRE SAB�I",
			addressCountry: "BR",
		},
		disbursementAccount: {
			id: 5,
			accountBranch: "0001",
			accountNumber: "90348",
			accountDigit: "1",
			documentNumber: "03154443479",
			name: "MARICELIO SOARES FELINTO",
			financialInstitutionsCodeNumber: "329",
		},
		financial: {
			id: 5,
			amount: 600000,
			creditOperationType: "cci",
			issueDate: "2020-12-03",
			disbursementDate: "2020-12-04",
			effectivePrefixedInterestRate: 0,
			principalAmortizationMonthPeriod: 1,
			interestGracePeriod: 0,
			interestType: "prePrice",
			financialIndex: "ipca",
			numberOfInstallments: 2,
			totalEffectiveCost: 0,
			principalGracePeriod: 0,
			fineConfigContractFineRate: 0,
			fineConfigInterestBase: "calendarDays",
			fineConfigMonthlyRate: 0,
			earlySettlementConfigurationType: "diRate",
			earlySettlementConfigurationFixedInterestRate: 0,
			prefixedInterestRateInterestBase: "calendarDays",
			prefixedInterestRateAnnualRate: 0,
		},
	};

	const mappedKeys = objKeyValueMapper({ debt });
	console.log({ mappedKeys });
	return objValueMapper(mappedKeys, payload);
};
