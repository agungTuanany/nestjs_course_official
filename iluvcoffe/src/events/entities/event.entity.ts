import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Index(["name", "type"])
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Index()
    @Column()
    name: string;

    @Column("json")
    payload: Record<string, any>;
}
