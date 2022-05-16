import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsCPF } from "brazilian-class-validator";

export class UpdateClientDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsCPF()
	@IsNotEmpty()
	@ApiProperty()
	cpf: string;

	@IsNotEmpty()
	@ApiProperty()
	birthDate: Date;
}
