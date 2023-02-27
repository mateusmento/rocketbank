import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserCredential {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	password: string;
}
