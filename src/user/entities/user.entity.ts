import * as bcrypt from "bcrypt";

export class User {
	id: number;
	name: string;
	email: string;
	password: string;

	async verifyPassword(password: string) {
		return await bcrypt.compare(password, this.password);
	}
}
