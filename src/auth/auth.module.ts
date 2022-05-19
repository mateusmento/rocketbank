import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user";
import {
	BasicAuthentication,
	CredentialsService,
} from "./basic-authentication";
import { JwtAuthentication } from "./jwt-authentication";
import { SignIn } from "./signin.feature";

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: "secret",
			signOptions: { expiresIn: "30m" },
		}),
	],
	controllers: [SignIn],
	providers: [CredentialsService, BasicAuthentication, JwtAuthentication],
})
export class AuthModule {}
