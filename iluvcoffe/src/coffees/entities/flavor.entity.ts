import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Coffee } from "./coffee.entity";

@Entity() // sql tabel === "flavor"
export class Flavor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Coffee, (coffee) => coffee.flavors)
    coffees: Coffee[];
}
