import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserCredential {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	password: string;

	static of(partial: Partial<UserCredential>) {
		const credential = new UserCredential();
		credential.id = partial.id;
		credential.password = partial.password;
		return credential;
	}
}
