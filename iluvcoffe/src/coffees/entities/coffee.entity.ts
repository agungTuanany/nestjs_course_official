import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity() // sql table === "coffee"
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({ default: 0 })
    recomendations: number;

    @JoinTable()
    @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
        cascade: true, //["insert"]
    })
    flavors: Flavor[];
}
