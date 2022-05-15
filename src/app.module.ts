import { Module } from "@nestjs/common";
import { ClientModule } from "./client/client.module";
import { UserModule } from './user/user.module';

@Module({
	imports: [ClientModule, UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
