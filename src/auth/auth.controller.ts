import { Controller, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local.auth-guard";

@Controller("auth")
export class AuthController {
	@Post("signin")
	@UseGuards(LocalAuthGuard)
	signIn() {
		return null;
	}
}
