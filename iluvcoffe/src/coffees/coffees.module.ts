import { Injectable, Module, Scope } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity";

// non class based providers
import { COFFEE_BRANDS } from "./coffees.constants";

// factory based providers
@Injectable()
export class CoffeeBrandsFactory {
    create() {
        /* -- do soemthing here --*/

        return ["Salemba brew", "nestcafe"];
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
            useFactory: () => ["Salemba brew", "nestcafe"],
            scope: Scope.TRANSIENT,
        },

        //{{{ factory based providers
        /* -- OR -- */
        // {
        //     provide: COFFEE_BRANDS,
        //     useFactory: async (connection: Connection): Promise<string[]> => {
        //         // const coffeeBrands = await connection.query(`SELECT * ...`);
        //         const coffeeBrands = await Promise.resolve(["Salemba brew", "nestcafe"]);

        //         console.log("[!] async factory");
        //         return coffeeBrands;
        //     },
        //     scope: Scope.TRANSIENT,
        //     inject: [Connection],
        // },
        // }}}

    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
