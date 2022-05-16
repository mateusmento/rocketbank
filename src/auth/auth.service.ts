import { User } from "./../user/entities/user.entity";
import { UserService } from "./../user/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserAccessDto } from "./user-access.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateCredentials(email: string, password: string) {
		const user = await this.userService.findByEmail(email);
		if (user && (await user.verifyPassword(password))) return user;
		throw new UnauthorizedException();
	}

	signIn(user: User): UserAccessDto {
		return {
			accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
		};
	}
}
