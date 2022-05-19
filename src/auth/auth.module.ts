import { Module } from "@nestjs/common";
import { SignInModule } from "./signin/signin.module";
import { JwtAuthentication } from "./jwt-authentication";

@Module({
	imports: [SignInModule],
	providers: [JwtAuthentication],
})
export class AuthModule {}
