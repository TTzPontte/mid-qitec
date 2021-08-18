import { PartialType } from '@nestjs/mapped-types';
import { CreatePontteContractDto } from './create-pontte-contract.dto';

export class UpdatePontteContractDto extends PartialType(CreatePontteContractDto) {}
