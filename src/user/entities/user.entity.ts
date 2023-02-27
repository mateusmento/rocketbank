import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserCredential } from "./user-credential.entity";

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

	@ManyToOne(() => UserCredential, { cascade: ["insert"] })
	credential: UserCredential;

	async verifyPassword(password: string) {
		return await bcrypt.compare(password, this.credential.password);
	}

	static of(partial: Partial<User>) {
		const user = new User();
		user.id = partial.id;
		user.name = partial.name;
		user.email = partial.email;
		return user;
	}
}
