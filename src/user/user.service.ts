import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly repo: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto) {
		createUserDto.password = await bcrypt.hash(createUserDto.password, 5);
		return this.repo.insert(createUserDto);
	}

	findByEmail(email: string) {
		return this.repo
			.createQueryBuilder("user")
			.where("user.email = :email", { email })
			.getOne();
	}
}
