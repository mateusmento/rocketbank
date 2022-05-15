import { Module } from "@nestjs/common";
import { ClientModule } from "./client/client.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [ClientModule, UserModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
