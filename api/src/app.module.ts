import { Module } from "@nestjs/common";
import { ClientModule } from "./client/client.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfig } from "./app.config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: AppConfig.validate,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get("DATABASE_HOST"),
				port: configService.get("DATABASE_PORT"),
				username: configService.get("POSTGRES_USER"),
				password: configService.get("POSTGRES_PASSWORD"),
				database: configService.get("POSTGRES_DB"),
				synchronize: true,
				autoLoadEntities: true,
				logger: "advanced-console",
				logging: true,
			}),
		}),
		ClientModule,
		UserModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
