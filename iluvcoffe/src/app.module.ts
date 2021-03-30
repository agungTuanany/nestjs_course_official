import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesModule } from "./coffees/coffees.module";
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module";

@Module({
    imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "pass123",
            // database: "postgres",
            database: "postgres1",
            autoLoadEntities: true,
            synchronize: true, // COMMENT THIS in production - mode
        }),
        CoffeeRatingModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
