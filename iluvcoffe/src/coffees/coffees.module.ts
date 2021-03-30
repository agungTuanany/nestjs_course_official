import { Injectable, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity";
import { COFFEE_BRANDS } from "./coffees.constants";

// Async Providers Mock from database
import { Connection } from "typeorm";

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        /* -- do something here --*/

        return ["Salemba nrew", "nestcafe"];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: async (connection: Connection): Promise<string[]> => {
                // const coffeeBrands = await connection.query(`SELECT * ...`);
                const coffeeBrands = await Promise.resolve(["Salemba brew", "nestcafe"]);

                console.log("[!] async factory");
                return coffeeBrands;
            },
            inject: [Connection],
        },
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
