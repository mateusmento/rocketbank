import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user";
import { BasicAuthenticated, JwtAuthenticated } from "./contracts/auth-guards";
import { Authentication } from "./domain/authentication";
import { SignIn } from "./features/signin";

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
	providers: [Authentication, BasicAuthenticated, JwtAuthenticated],
})
export class AuthModule {}
