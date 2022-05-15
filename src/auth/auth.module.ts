import { Module } from "@nestjs/common";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";

@Module({
	providers: [LocalStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
