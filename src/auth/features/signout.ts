import { Controller, Delete, Res, UseGuards } from "@nestjs/common";
import { JwtAuthenticated } from "../contracts/auth-guards";
import { Response } from "express";

@Controller("auth")
export class SignIn {
	@Delete("signin")
	@UseGuards(JwtAuthenticated)
	signIn(@Res({ passthrough: true }) res: Response) {
		res.clearCookie("token");
	}
}
