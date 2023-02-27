import { AuthModule } from "./../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { Client } from "./entities/client.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Client]), AuthModule],
	controllers: [ClientController],
	providers: [ClientService],
})
export class ClientModule {}
