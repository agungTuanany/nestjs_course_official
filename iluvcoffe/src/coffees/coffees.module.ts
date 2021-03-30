import { Injectable, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity";
import { COFFEE_BRANDS } from "./coffees.constants";

class ConfigService {} 			// <<<
class DevelopmentConfigService {} 	// <<<
class ProductionConfigService {} 	// <<<
// class MockCoffeesService {}


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
    // providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
    // providers: [CoffeesService, { provide: COFFEE_BRANDS, useValue: ["Salemba brew", "nestcafe"] }],
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        // {
        //     provide: ConfigService,
        //     useClass: process.env.NODE_ENV === "development" ? DevelopmentConfigService : ProductionConfigService,
        // },
        {
            // provide: COFFEE_BRANDS, useValue: ["Salemba brew", "nestcafe"]
            provide: COFFEE_BRANDS,
            useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
            inject: [CoffeeBrandsFactory],
        }
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
