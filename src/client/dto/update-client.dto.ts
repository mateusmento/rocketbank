import { ApiProperty } from "@nestjs/swagger";

export class UpdateClientDto {
	@ApiProperty()
	name?: string;

	@ApiProperty()
	cpf?: string;

	@ApiProperty()
	birthDate?: Date;
}
