import { Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { BasicAuthenticated } from "./basic-authentication";
import { UserAccess, UserAccessFactory } from "./user-access";
import { User } from "../../user";
import { AuthUser } from "../contracts/auth-user.decorator";

@Controller("auth")
export class SignIn {
	constructor(private readonly userAccessFactory: UserAccessFactory) {}

	@Post("signin")
	@ApiBody({ type: Credentials })
	@UseGuards(BasicAuthenticated)
	signIn(@AuthUser() user: User): UserAccess {
		return this.userAccessFactory.generate(user);
	}
}

class Credentials {
	@ApiProperty()
	public email: string;

	@ApiProperty()
	public password: string;

	constructor({ email, password }: Credentials) {
		this.email = email;
		this.password = password;
	}
}
