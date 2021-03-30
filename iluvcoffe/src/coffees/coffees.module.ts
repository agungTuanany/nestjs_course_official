import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity";
import { COFFEE_BRANDS } from "./coffees.constants";

class MockCoffeesService {}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    // providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
    providers: [CoffeesService, { provide: COFFEE_BRANDS, useValue: ["Salemba brew", "nestcafe"] }],
    exports: [CoffeesService],
})
export class CoffeesModule {}
