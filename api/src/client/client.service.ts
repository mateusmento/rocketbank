import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Client } from "./entities/client.entity";
import { User } from "src/user";

@Injectable()
export class ClientService {
	constructor(
		@InjectRepository(Client)
		private readonly repo: Repository<Client>,
	) {}

	async create(createClientDto: CreateClientDto, user: User) {
		return this.repo.save(createClientDto.create(user));
	}

	async findAll(user: User, page: number, size: number) {
		const [clients, count] = await this.repo
			.createQueryBuilder("c")
			.where("c.createdBy = :user", { user: user.id })
			.orderBy("c.id", "DESC")
			.offset(page * size)
			.limit(size)
			.getManyAndCount();

		return { content: clients, totalCount: count };
	}

	async findOne(id: number) {
		const client = await this.repo.findOne(id);
		if (!client) throw new NotFoundException();
		return client;
	}

	async update(id: number, updateClientDto: UpdateClientDto) {
		const client = await this.findOne(id);
		return this.repo.save({ ...client, ...updateClientDto });
	}

	async remove(id: number) {
		const { affected } = await this.repo.delete(id);
		if (!affected) throw new NotFoundException();
	}
}
