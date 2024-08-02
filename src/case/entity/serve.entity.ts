import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Serve {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    plaintiffId: string

    @Column()
    fullname: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    caseId: string
}