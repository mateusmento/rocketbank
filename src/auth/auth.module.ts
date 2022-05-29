import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user";
import { Authentication } from "./domain/authentication";
import { SignIn } from "./features/signin";
import { JwtStrategy } from "./passport/jwt.strategy";
import { LocalStrategy } from "./passport/local.strategy";

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
	providers: [Authentication, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
