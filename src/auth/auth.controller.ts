import { Controller, Post, UseGuards } from "@nestjs/common";

@Controller("auth")
export class AuthController {
	@Post("signin")
	@UseGuards()
	signIn() {
		return null;
	}
}
