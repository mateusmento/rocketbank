import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { User } from "src/user";
import { AuthUser, JwtAuthenticated } from "../auth";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Controller("clients")
@ApiBearerAuth()
@UseGuards(JwtAuthenticated)
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Post()
	create(@Body() createClientDto: CreateClientDto, @AuthUser() user: User) {
		return this.clientService.create(createClientDto, user);
	}

	@Get()
	findAll(
		@Query("page") page: number,
		@Query("size") size: number,
		@AuthUser() user: User,
	) {
		return this.clientService.findAll(user, page, size);
	}

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.clientService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: number, @Body() updateClientDto: UpdateClientDto) {
		return this.clientService.update(id, updateClientDto);
	}

	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.clientService.remove(id);
	}
}
