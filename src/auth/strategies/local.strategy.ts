import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService) {
		super({ usernameField: "email" });
	}

	async validate(email: string, password: string) {
		const user = this.userService.findByEmail(email);
		if (user && user.verifyPassword(password)) return user;
		throw new UnauthorizedException();
	}
}
