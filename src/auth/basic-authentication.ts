import { UserService } from "../user";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class BasicAuthenticated extends AuthGuard("local") {}

@Injectable()
export class BasicAuthentication extends PassportStrategy(Strategy) {
	constructor(private readonly credentialsValidator: CredentialsService) {
		super({ usernameField: "email" });
	}

	async validate(email: string, password: string) {
		return this.credentialsValidator.validate(email, password);
	}
}

@Injectable()
export class CredentialsService {
	constructor(private readonly userService: UserService) {}

	async validate(email: string, password: string) {
		const user = await this.userService.findByEmail(email);
		if (user && (await user.verifyPassword(password))) return user;
		throw new UnauthorizedException();
	}
}
