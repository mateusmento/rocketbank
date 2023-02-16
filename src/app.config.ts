import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export class AppConfig {
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
