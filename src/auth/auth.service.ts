import { User } from "./../user/entities/user.entity";
import { UserService } from "./../user/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	validateCredentials(email: string, password: string) {
		const user = this.userService.findByEmail(email);
		if (user && user.verifyPassword(password)) return user;
		throw new UnauthorizedException();
	}

	signIn(user: User): UserAccessDto {
		return { accessToken: null };
	}
}
