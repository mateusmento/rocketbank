import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { UserAccess, UserAccessFactory } from "../domain/user-access";
import { User } from "../../user";
import { AuthUser } from "../contracts/auth-user.decorator";
import { BasicAuthenticated } from "../contracts/auth-guards";
import { Response } from "express";

class Credentials {
	@ApiProperty()
	public email: string;

	@ApiProperty()
	public password: string;
}

@Controller("auth")
export class SignIn {
	constructor(private readonly userAccessFactory: UserAccessFactory) {}

	@Post("signin")
	@ApiBody({ type: Credentials })
	@UseGuards(BasicAuthenticated)
	signIn(@AuthUser() user: User, @Res() res: Response): UserAccess {
		const userAccess = this.userAccessFactory.generate(user);
		res.cookie("token", userAccess.accessToken, { maxAge: 1800 });
		res.json(userAccess);
		return userAccess;
	}
}
