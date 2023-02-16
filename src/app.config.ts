import { plainToInstance } from "class-transformer";
import { IsNumber, IsString, IsUrl, validateSync } from "class-validator";

export class AppConfig {
	@IsUrl()
	APP_URL: string;

	@IsString()
	DATABASE_HOST: string;

	@IsString()
	DATABASE_PORT: string;

	@IsString()
	POSTGRES_USER: string;

	@IsString()
	POSTGRES_PASSWORD: string;

	@IsString()
	POSTGRES_DB: string;

	@IsNumber()
	PASSWORD_SALT_ROUNDS: number;

	@IsNumber()
	JWT_COOKIE_MAX_AGE: number;

	@IsNumber()
	JWT_EXPIRES_IN: number;

	static validate(config: Record<string, any>): Record<string, any> {
		const appConfig = plainToInstance(AppConfig, config, {
			enableImplicitConversion: true,
			exposeDefaultValues: true,
		});
		const errors = validateSync(appConfig, {
			skipMissingProperties: false,
		});
		if (errors.length > 0) throw new Error("\n" + errors.toString());
		return appConfig;
	}
}
