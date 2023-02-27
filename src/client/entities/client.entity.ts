import { User } from "src/user";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Client {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	cpf: string;

	@Column()
	birthDate: Date;

	@ManyToOne(() => User)
	createdBy: User;
}
