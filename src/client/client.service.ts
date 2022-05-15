import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

let sequenceId = 1;
let clients = [];

@Injectable()
export class ClientService {
	create(createClientDto: CreateClientDto) {
		const client = { id: sequenceId++, ...createClientDto };
		clients.push(client);
		return client;
	}

	findAll() {
		return clients;
	}

	findOne(id: number) {
		const client = clients.find(c => c.id === id);
		if (!client) throw new NotFoundException();
		return client;
	}

	update(id: number, updateClientDto: UpdateClientDto) {
		const client = clients.find(c => c.id === id);
		if (!client) throw new NotFoundException();
		for (const key in updateClientDto) client[key] = updateClientDto[key];
		return client;
	}

	remove(id: number) {
		clients = clients.filter(c => c.id === id);
	}
}
