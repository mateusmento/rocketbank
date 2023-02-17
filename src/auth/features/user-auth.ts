import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthenticated } from "../contracts/auth-guards";

@Controller("auth")
export class UserAuth {
	@Get("/user")
	@UseGuards(JwtAuthenticated)
	getUser(@Req() req: Request) {
		return req.user;
	}
}
