import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user";
import { Authentication } from "./domain/authentication";
import { UserAccessFactory } from "./domain/user-access";
import { SignIn } from "./features/signin";
import { SignOut } from "./features/signout";
import { UserAuth } from "./features/user-auth";
import { JwtStrategy } from "./passport/jwt.strategy";
import { LocalStrategy } from "./passport/local.strategy";

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get("JWT_SECRET"),
				signOptions: {
					expiresIn: configService.get("JWT_EXPIRES_IN"),
				},
			}),
		}),
	],
	controllers: [SignIn, SignOut, UserAuth],
	providers: [Authentication, LocalStrategy, JwtStrategy, UserAccessFactory],
})
export class AuthModule {}
