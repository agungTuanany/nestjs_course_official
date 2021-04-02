import { Module } from "@nestjs/common";
import { CoffeesModule } from "../coffees/coffees.module";
import { CoffeeRatingService } from "./coffee-rating.service";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [
        CoffeesModule,
        DatabaseModule.register({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "pass123",
        }),
    ],
    providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
