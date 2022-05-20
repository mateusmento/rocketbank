import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Authentication } from "../domain/authentication";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly auth: Authentication) {
		super({ usernameField: "email" });
	}

	async validate(email: string, password: string) {
		return this.auth.authenticate(email, password);
	}
}
