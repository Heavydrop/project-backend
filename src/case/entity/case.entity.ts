import { User } from "src/user/enitity/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Case {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: false})
    isApproved: boolean

    @Column()
    respondentEmail: string;

    @Column()
    respondentPhone: string

    @Column({nullable: true, default: false})
    responded: boolean

    @Column({nullable: true})
    respondentDescription: string

    @Column({ nullable: true })
    hearing: Date

    @Column({ default: false})
    paid: boolean

    @ManyToOne(() => User, (user) => user.cases)
    plaintiff: User;

    @ManyToOne(() => User, (user) => user.cases)
    respondent: User;
}