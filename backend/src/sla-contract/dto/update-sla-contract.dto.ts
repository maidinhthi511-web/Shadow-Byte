import { PartialType } from '@nestjs/mapped-types';
import { CreateSlaContractDto } from './create-sla-contract.dto';

export class UpdateSlaContractDto extends PartialType(CreateSlaContractDto) {}
