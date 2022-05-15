import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

let sequenceId = 1;
const users: User[] = [];

@Injectable()
export class UserService {
	async create(createUserDto: CreateUserDto) {
		const user = new User();
		for (const key in createUserDto) user[key] = createUserDto[key];
		user.id = sequenceId++;
		user.password = await bcrypt.hash(createUserDto.password, 5);
		users.push(user);
		return user;
	}
}
