import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/user";

export const AuthUser = createParamDecorator(
	(data: unknown, context: ExecutionContext) =>
		User.of(context.switchToHttp().getRequest().user),
);
