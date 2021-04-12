import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoffeesModule } from "../../src/coffees/coffees.module";

describe("[Feaute] Coffees - /coffees", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CoffeesModule,
                TypeOrmModule.forRoot({
                    type: "postgres",
                    host: "localhost",
                    port: 5433,
                    username: "postgres",
                    password: "pass123",
                    database: "postgres1",
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it.todo("Create [Post /]");
    it.todo("Get all [Get /]");
    it.todo("Get one [Get /:id]");
    it.todo("Update one [PATCH /:id]");
    it.todo("Delete on [DELETE /:id]");

    afterAll(async () => {
        await app.close();
    });
});
