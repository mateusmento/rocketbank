import { UserService } from "../../user";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

@Injectable()
export class JwtAuthentication extends PassportStrategy(Strategy) {
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: "secret",
		} as StrategyOptions);
	}

	validate({ email }) {
		return this.userService.findByEmail(email);
	}
}