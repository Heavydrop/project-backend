import { Case } from 'src/case/entity/case.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    JUDGE = 'JUDGE',
    LITIGATOR = 'LITIGATOR',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    age: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @OneToMany(() => Case, (caseEntity) => caseEntity.plaintiff)
    cases?: Case[];
}
