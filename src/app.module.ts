import { Module } from "@nestjs/common";
import { ClientModule } from "./client/client.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "rocketbank-db",
			port: 5432,
			username: "rocketbank",
			password: "kl1jh2h3k1",
			database: "rocketbank",
			synchronize: true,
			autoLoadEntities: true,
			logger: "advanced-console",
			logging: true,
		}),
		ClientModule,
		UserModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
