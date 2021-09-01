// export class CreateQitechDto {
//   external_contract_fees: [
//     {
//       fee_type: "warranty_analysis",
//       amount: 10500.0,
//       amount_type: "absolute",
//     },
//   ],
//   related_parties: [
//     {
//       name: "MARICELIO SOARES FELINTO",
//       email: "mo@hotmail.com",
//       role_type: "co_borrower",
//       person_type: "natural",
//       individual_document_number: "05521723404",
//       document_identification_number: " 529403500",
//       issuer_institution: "SSP/PR",
//       mother_name: "MARICELIO MOM",
//       birth_date: "1990-10-31",
//       profession: "DIRETOR DE TRANSPORTADORA",
//       nationality: "BRASILEIRA",
//       marriage_status: "total_communion",
//       is_pep: false,
//       address: {
//         street: "RUA PADRE SAB�I",
//         state: "SP",
//         city: "S�o Paulo",
//         neighborhood: "Bairro",
//         number: "121",
//         postal_code: "01415001",
//         complement: "apto 15",
//       },
//       phone: {
//         country_code: "055",
//         area_code: "16",
//         number: "991722315",
//       },
//     },
//     {
//       name: "Maria Maricelio Wife",
//       email: "mo@hotmail.com",
//       role_type: "co_borrower",
//       person_type: "natural",
//       individual_document_number: "03154443479",
//       document_identification_number: " 53681185",
//       issuer_institution: "SSP/PR",
//       mother_name: "MARIA MOM",
//       birth_date: "1991-02-28",
//       profession: "DIRETORA",
//       nationality: "BRASILEIRA",
//       is_pep: false,
//       marriage_status: "total_communion",
//       address: {
//         street: "RUA PADRE SAB�I",
//         state: "SP",
//         city: "S�o Paulo",
//         neighborhood: "Bairro",
//         number: "121",
//         postal_code: "01415001",
//         complement: "apto 15",
//       },
//       phone: {
//         country_code: "055",
//         area_code: "16",
//         number: "991722315",
//       },
//     },
//   ],
//   borrower: {
//     name: "MARICELIO SOARES FELINTO",
//     email: "mo@hotmail.com",
//     role_type: "co_borrower",
//     person_type: "natural",
//     individual_document_number: "05521723404",
//     issuer_institution: "SSP/PR",
//     document_identification_number: " 529403500",
//     mother_name: "MARICELIO MOM",
//     birth_date: "1990-10-31",
//     profession: "DIRETOR DE TRANSPORTADORA",
//     nationality: "BRASILEIRA",
//     marriage_status: "total_communion",
//     is_pep: false,
//     address: {
//       street: "RUA PADRE SAB�I",
//       state: "SP",
//       city: "S�o Paulo",
//       neighborhood: "Bairro",
//       number: "121",
//       postal_code: "01415001",
//       complement: "apto 15",
//     },
//     phone: {
//       country_code: "055",
//       area_code: "16",
//       number: "991722315",
//     },
//   },
//   real_estate: [
//     {
//       address: {
//         city: "Recife",
//         complement: "163A",
//         neighborhood: "Fund�o",
//         number: "137",
//         postal_code: "52221110",
//         state: "PE",
//         street: "Rua Camapu�",
//         country: "Brazil",
//       },
//       enrollment_number: "54545",
//       municipal_inscription: "6556",
//       insurance_policy_number: "6565650",
//       warranty_type: "mortgage",
//       notary_office_code: 2222,
//       description:
//           "O referido im�vel foi havido pelos devedores por for�a do registro R.05, na matr�cula n� 221.400, do Livro N�2de Registro Geral do 18� Oficial de Registro de Im�veis da Comarca de S�o Paulo/SP.",
//       incra_code: null,
//       estimated_value: 5265464,
//       possession_composition: [
//         {
//           name: "MARICELIO SOARES FELINTO",
//           percentage: 0.8,
//         },
//         {
//           name: "Maria Maricelio Wife",
//           percentage: 0.2,
//         },
//       ],
//     },
//     {
//       address: {
//         city: "Recife",
//         complement: "163B",
//         neighborhood: "Fund�o",
//         number: "137",
//         postal_code: "52221110",
//         state: "PE",
//         street: "Rua Camapu�",
//         country: "Brazil",
//       },
//       enrollment_number: "22233",
//       municipal_inscription: "24444",
//       insurance_policy_number: "6565650",
//       warranty_type: "mortgage",
//       notary_office_code: 1233,
//       description:
//           "O referido im�vel foi havido pelos devedores por for�a do registro, na matr�cula n� 22233, do Livro N�2de Registro Geral do 18� Oficial de Registro de Im�veis da Comarca de S�o Paulo/SP.",
//       incra_code: null,
//       estimated_value: 5265464,
//       possession_composition: [
//         {
//           name: "MARICELIO SOARES FELINTO",
//           percentage: 0.45,
//         },
//         {
//           name: "Maria Maricelio Wife",
//           percentage: 0.55,
//         },
//       ],
//     },
//   ],
//   financial: {
//     amount: 600000,
//     credit_operation_type: "cci",
//     issue_date: "2020-12-03",
//     disbursement_date: "2020-12-04",
//     fine_configuration: {
//       contract_fine_rate: 0.02,
//       interest_base: "calendar_days",
//       monthly_rate: 0.01,
//     },
//     early_settlement_configuration: {
//       early_settlement_configuration_type: "di_rate",
//       fixed_interest_rate: 0.01,
//     },
//     effective_prefixed_interest_rate: 0,
//     prefixed_interest_rate: {
//       interest_base: "calendar_days",
//       annual_rate: 0.126825,
//     },
//     principal_amortization_month_period: 1,
//     interest_grace_period: 0,
//     interest_type: "pre_price",
//     financial_index: "ipca",
//     number_of_installments: 2,
//     total_effective_cost: 0.145122,
//     principal_grace_period: 0,
//   },
//   purchaser_document_number: 32491039000134,
//   custodian_document_number: 22610500000188,
//   installments: [
//     {
//       principal_amortization_amount: 300000,
//       due_date: "2020-12-27",
//       prefixed_interest_amount: 500,
//       additional_costs: [
//         {
//           cost_denomination: "tsa",
//           amount: 500,
//         },
//         {
//           cost_denomination: "mip",
//           amount: 20,
//         },
//         {
//           cost_denomination: "dfi",
//           amount: 20,
//         },
//       ],
//     },
//     {
//       principal_amortization_amount: 300000,
//       due_date: "2021-01-27",
//       prefixed_interest_amount: 500,
//       additional_costs: [
//         {
//           cost_denomination: "tsa",
//           amount: 500,
//         },
//         {
//           cost_denomination: "mip",
//           amount: 20,
//         },
//         {
//           cost_denomination: "dfi",
//           amount: 20,
//         },
//       ],
//     },
//   ],
//   disbursement_account: {
//     account_branch: "0001",
//     account_digit: "1",
//     account_number: "90348",
//     document_number: "03154443479",
//     financial_institutions_code_number: "329",
//     name: "MARICELIO SOARES FELINTO",
//   },
//   additional_data: {
//     cci_serial_number: "202102",
//     total_credit_value: {
//       real_estate_analisys_expenses: 234,
//       real_estate_registry_expenses: 10040,
//       real_estate_due_balance: 1000,
//       net_debt_amount: 589960,
//       client_available_balance: 500000,
//     },
//     destination_accounts: [
//       {
//         account_branch: "1234",
//         account_digit: "5",
//         account_number: "019302",
//         document_number: "03154443479",
//         financial_institutions_code_number: "341",
//         name: "MARICELIO SOARES FELINTO",
//       },
//       {
//         account_branch: "1221",
//         account_digit: "1",
//         account_number: "123123441",
//         document_number: "32910491000134",
//         financial_institutions_code_number: "104",
//         name: "Cart�rio Fidelis Delfino Palaria",
//       },
//       {
//         account_branch: "0101",
//         account_digit: "2",
//         account_number: "11611",
//         document_number: "03154441000143",
//         financial_institutions_code_number: "033",
//         name: "HE SOLUTIONS",
//       },
//     ],
//     debts: [
//       {
//         amount: 22685.39,
//         description:
//             "100% (cem por cento) do valor referente � d�vida proveniente do processo n� 1000917-38.2019.8.26.0001, em tr�mite perante a 1� Vara C�vel do Foro Regional de Santana, no qual figuram como Requerente o Banco Bradesco S/A, e como Requerido Maricelio Soares Felinto, perfazendo o valor de R$ 22.685,39.",
//       },
//       {
//         amount: 2421,
//         description: "D�vida com o z�zim da esquina no valor de R$ 2.421,00.",
//       },
//     ],
//     income_composition: [
//       {
//         name: "MARICELIO SOARES FELINTO",
//         percentage: 1,
//       },
//     ],
//     attachements: [
//       {
//         img: "https://url.de.imagem.da.certid�o/j320b4je5nmes",
//       },
//       {
//         img: "https://url.do.laudo.do.im�vel/jdp230kdml9vc",
//       },
//     ],
//   },
// }