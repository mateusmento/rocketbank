import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	cpf: string;

	@ApiProperty()
	birthDate: Date;
}
