import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../user";

@Injectable()
export class Authentication {
	constructor(private readonly userService: UserService) {}

	async authenticate(email: string, password: string) {
		const user = await this.userService.findByEmail(email);
		if (user && (await user.verifyPassword(password))) return user;
		throw new UnauthorizedException();
	}
}
