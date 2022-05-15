import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	async verifyPassword(password: string) {
		return await bcrypt.compare(password, this.password);
	}
}
