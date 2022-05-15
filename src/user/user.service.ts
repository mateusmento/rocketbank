import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

let sequenceId = 1;
const users = [];

@Injectable()
export class UserService {
	create(createUserDto: CreateUserDto) {
		const user = { id: sequenceId++, ...createUserDto };
		users.push(user);
		return user;
	}
}
