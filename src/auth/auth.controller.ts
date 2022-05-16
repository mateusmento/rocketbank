import { AuthService } from "./auth.service";
import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthUser } from "./auth-user.decorator";
import { LocalAuthGuard } from "./guards/local.auth-guard";
import { ApiBody, ApiProperty } from "@nestjs/swagger";

class SignInDto {
	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;
}

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signin")
	@ApiBody({ type: SignInDto })
	@UseGuards(LocalAuthGuard)
	signIn(@AuthUser() user) {
		return this.authService.signIn(user);
	}
}
