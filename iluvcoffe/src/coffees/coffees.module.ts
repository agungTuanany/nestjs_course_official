import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee, CoffeeSchema } from "./entities/coffee.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Coffee.name,
                schema: CoffeeSchema,
            },
        ]),
    ],
    controllers: [CoffeesController],
    providers: [CoffeesService],
})
export class CoffeesModule {}
