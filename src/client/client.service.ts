import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Client } from "./entities/client.entity";

@Injectable()
export class ClientService {
	constructor(
		@InjectRepository(Client)
		private readonly repo: Repository<Client>,
	) {}

	async create(createClientDto: CreateClientDto) {
		return this.repo.save(createClientDto.create());
	}

	findAll(page: number, size: number) {
		return this.repo
			.createQueryBuilder()
			.skip(page * size)
			.limit(size)
			.getMany();
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
