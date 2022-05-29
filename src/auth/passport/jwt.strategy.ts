import { UserService } from "../../user";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {
	ExtractJwt,
	JwtFromRequestFunction,
	Strategy,
	StrategyOptions,
} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req => req?.cookies?.token) as JwtFromRequestFunction,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: "secret",
		} as StrategyOptions);
	}

	validate({ email }) {
		return this.userService.findByEmail(email);
	}
}
