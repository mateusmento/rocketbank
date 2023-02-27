import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthenticated extends AuthGuard("jwt") {}

@Injectable()
export class BasicAuthenticated extends AuthGuard("local") {}
