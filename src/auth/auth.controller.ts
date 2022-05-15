import { AuthService } from "./auth.service";
import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthUser } from "./auth-user.decorator";
import { LocalAuthGuard } from "./guards/local.auth-guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signin")
	@UseGuards(LocalAuthGuard)
	signIn(@AuthUser() user) {
		return this.authService.signIn(user);
	}
}
