import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { QitechDto } from "./dto/qitech.dto";
import { QitechService } from "./qitech.service";

@Controller("qitech")
export class QitechController {
  constructor(private readonly qitechService: QitechService) {}

  @Get("/upload")
  public async upload(): Promise<string> {
    const QITtech = require("qitech-wrapper");
    let qitech_wrapper = QITtech({
      clientKey: "3fb54232-00c3-44c1-bd99-883f3c50da46",
      privateKey: "jwtECDSASHA512.key",
      publicKey: "jwtECDSASHA512.key.pub",
    });

    let fileContent = "/opt/pontte/arquivos/teste.pdf";
    let qitechResponse: any;

    try {
      qitechResponse = await qitech_wrapper.upload.post(fileContent);
      console.log(qitechResponse.decoded);
    } catch (error) {
      console.error(error.decoded);
    }

    return qitechResponse.decoded;
  }

  @Get("/account")
  public async createAccount(): Promise<string> {
    const QITtech = require("qitech-wrapper");
    let qitech_wrapper = QITtech({
      clientKey: "3fb54232-00c3-44c1-bd99-883f3c50da46",
      privateKey: "jwtECDSASHA512.key",
      publicKey: "jwtECDSASHA512.key.pub",
    });

    let data = {
      account_manager: {
        address: {
          city: "São Paulo",
          complement: "7 andar",
          neighborhood: "Jardim Paulistano",
          number: "2391",
          postal_code: "01452960",
          state: "SP",
          street: "Av. Brigadeiro Faria Lima",
        },
        cnae_code: "6499-9/99",
        company_document_number: "09456933000162",
        company_representatives: [
          {
            address: {
              city: "Ananindeua",
              complement: "complemento",
              neighborhood: "Águas Lindas",
              number: "660",
              postal_code: "67118003",
              state: "PA",
              street: "Passagem Mariana",
            },
            birth_date: "1990-05-06",
            document_identification: "1dada03f-7381-4659-b3f1-e939ac4ac2f4",
            email: "aurora.nogueira@yopmail.com",
            individual_document_number: "08141163701",
            is_pep: false,
            mother_name: "Maria Mariane",
            name: "Aurora Simone Catarina Nogueira",
            nationality: "Brasileira",
            person_type: "natural",
            phone: {
              area_code: "11",
              country_code: "055",
              number: "9128281359",
            },
            proof_of_residence: "1dada03f-7381-4659-b3f1-e939ac4ac2f4",
          },
        ],
        company_statute: "1dada03f-7381-4659-b3f1-e939ac4ac2f4",
        directors_election_minute: "1dada03f-7381-4659-b3f1-e939ac4ac2f4",
        email: "kaiqueegiovannacontabilme@yopmail.com",
        foundation_date: "2014-08-21",
        name: "Kaique e Giovanna Contábil ME",
        person_type: "legal",
        phone: {
          area_code: "11",
          country_code: "055",
          number: "999999999",
        },
        trading_name: "Kaique e Giovanna Contábil ME",
      },
      account_owner: {
        address: {
          city: "Ananindeua",
          complement: "complemento",
          neighborhood: "Águas Lindas",
          number: "660",
          postal_code: "67118003",
          state: "PA",
          street: "Passagem Mariana",
        },
        birth_date: "1990-05-06",
        document_identification: "1dada03f-7381-4659-b3f1-e939ac4ac2f4",
        email: "caio.dias@yopmail.com",
        individual_document_number: "85324558400",
        is_pep: false,
        mother_name: "Maria Mariane",
        name: "Caio Bruno Dias",
        nationality: "Brasileira",
        person_type: "natural",
        phone: {
          country_code: "055",
          area_code: "11",
          number: "9128281359",
        },
        proof_of_residence: "1dada03f-7381-4659-b3f1-e939ac4ac2f4",
      },
      destination_list: [
        {
          account_branch: "0001",
          account_digit: "2",
          account_number: "532312",
          document_number: "49067117153",
          financial_institutions_code_number: "341",
          name: "Juan Anthony Farias",
        },
        {
          account_branch: "0002",
          account_digit: "9",
          account_number: "537612",
          document_number: "49067117153",
          financial_institutions_code_number: "033",
          name: "Juan Anthony Farias",
        },
      ],
    };
    let qitechResponse: any;

    try {
      qitechResponse = await qitech_wrapper.escrow.post(data);
      console.log(qitechResponse.decoded);
    } catch (error) {
      console.error(error.decoded);
    }

    return qitechResponse.decoded;
  }

  @Get("/createEscrow")
  public async getPending(): Promise<any> {
    return this.qitechService.createEscrowAccount();
  }
}
