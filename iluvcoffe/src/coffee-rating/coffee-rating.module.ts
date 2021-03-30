import { Module } from "@nestjs/common";
import { CoffeesModule } from "../coffees/coffees.module";
import { CoffeeRatingService } from "./coffee-rating.service";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [
        DatabaseModule.register({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "pass123",
            // database: "postgres1",
            // autoLoadEntities: true,
            // synchronize: true, // COMMENT THIS in production - mode
        }),
        CoffeesModule
    ],
    providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
