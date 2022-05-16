import { Client } from "./../entities/client.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsCPF } from "brazilian-class-validator";

export class CreateClientDto {
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

	create() {
		const client = new Client();
		client.name = this.name;
		client.cpf = this.cpf;
		client.birthDate = this.birthDate;
		return client;
	}
}
