import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

let sequenceId = 1;
const users = [];

@Injectable()
export class UserService {
	async create(createUserDto: CreateUserDto) {
		const user = { id: sequenceId++, ...createUserDto };
		user.password = await bcrypt.hash(createUserDto.password, 5);
		users.push(user);
		return user;
	}
}
