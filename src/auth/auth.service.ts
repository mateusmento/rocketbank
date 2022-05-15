import { User } from "./../user/entities/user.entity";
import { UserService } from "./../user/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

	validateCredentials(email: string, password: string) {
		const user = this.userService.findByEmail(email);
		if (user && user.verifyPassword(password)) return user;
		throw new UnauthorizedException();
	}

	signIn(user: User): UserAccessDto {
		return { accessToken: this.jwtService.sign({ sub: user.id, email: user.email }) };
	}
}
