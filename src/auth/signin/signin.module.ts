import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user";
import {
	BasicAuthentication,
	CredentialsService,
} from "./basic-authentication";
import { SignIn } from "./signin";

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
	providers: [CredentialsService, BasicAuthentication],
})
export class SignInModule {}
