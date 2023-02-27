import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsEmail()
	@ApiProperty()
	email: string;

	@MinLength(8)
	@IsNotEmpty()
	@ApiProperty()
	password: string;
}
