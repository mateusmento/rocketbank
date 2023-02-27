import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class UpdateClientDto {
	@Allow()
	@ApiProperty()
	name?: string;

	@Allow()
	@ApiProperty()
	cpf?: string;

	@Allow()
	@ApiProperty()
	birthDate?: Date;
}
