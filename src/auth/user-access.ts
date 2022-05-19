import { User } from "../user";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class UserAccess {
	constructor(public accessToken: string) {}
}

@Injectable()
export class UserAccessFactory {
	constructor(private readonly jwtService: JwtService) {}

	generate({ id, name, email }: User): UserAccess {
		return new UserAccess(this.jwtService.sign({ sub: id, name, email }));
	}
}
