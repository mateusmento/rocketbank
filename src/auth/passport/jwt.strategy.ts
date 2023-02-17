import { UserService } from "../../user";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {
	JwtFromRequestFunction,
	Strategy,
	StrategyOptions,
} from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService, private userService: UserService) {
		super({
			jwtFromRequest: (req => req?.cookies?.token) as JwtFromRequestFunction,
			ignoreExpiration: false,
			secretOrKey: configService.get("JWT_SECRET"),
		} as StrategyOptions);
	}

	async validate({ email, exp }) {
		const user = await this.userService.findByEmail(email);
		return { ...user, expiresAt: exp };
	}
}
