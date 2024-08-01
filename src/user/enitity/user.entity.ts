import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

export enum UserRole {
    RESPONDENT = 'RESPONDENT',
    APPELLANT = 'APPELLANT',
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
    age: number;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @ManyToMany(() => Case, (caseEntity) => caseEntity.users)
    @JoinTable({
        name: 'user_case',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'case_id',
            referencedColumnName: 'id',
        },
    })
    cases: Case[];
}

@Entity()
export class Case {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => User, (user) => user.cases)
    users: User[];
}
