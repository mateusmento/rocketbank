import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserCredential } from "./entities/user-credential.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly repo: Repository<User>,
		@InjectRepository(UserCredential)
		private readonly credentialRepo: Repository<UserCredential>,
	) {}

	async create(createUserDto: CreateUserDto) {
		const password = await bcrypt.hash(createUserDto.password, 5);
		const credential = await this.credentialRepo.save({ password });
		return this.repo.save({ ...createUserDto, credential });
	}

	findByEmail(email: string) {
		return this.repo
			.createQueryBuilder("user")
			.where("user.email = :email", { email })
			.getOne();
	}

	findByEmailWithCredential(email: string) {
		return this.repo
			.createQueryBuilder("user")
			.leftJoinAndSelect("user.credential", "credential")
			.where("user.email = :email", { email })
			.getOne();
	}
}
