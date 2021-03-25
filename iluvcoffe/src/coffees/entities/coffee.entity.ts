import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()   // sql table === "coffee"
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('json', { nullable: true})
    flavors: string[];
}
