import { Controller, Delete, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("auth")
export class SignOut {
	@Delete("signin")
	signIn(@Res({ passthrough: true }) res: Response) {
		res.clearCookie("token");
	}
}
