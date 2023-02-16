import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.enableCors({
		origin: configService.get("APP_URL"),
		credentials: true,
	});

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const config = new DocumentBuilder()
		.setTitle("Rocket Bank API")
		.setDescription("RESTful API da Rocket Bank")
		.setVersion("1.0")
		.addTag("rocket-bank")
		.addBearerAuth()
		.addCookieAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api-doc", app, document);

	await app.listen(3000);
}

bootstrap();
