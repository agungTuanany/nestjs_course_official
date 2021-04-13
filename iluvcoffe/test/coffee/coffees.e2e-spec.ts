import { INestApplication, ValidationPipe, HttpStatus } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";

import { CoffeesModule } from "../../src/coffees/coffees.module";
import { CreateCoffeeDto } from "src/coffees/dto/create-coffee.dto";

describe("[Feaute] Coffees - /coffees", () => {
    let app: INestApplication;
    const coffee = {
        name: "Salemba Roast#1",
        brand: "Salemba Brew",
        flavors: ["chocolate", "vanilla"],
    };

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
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
                transformOptions: {
                    enableImplicitConversion: true,
                },
            }),
        );
        await app.init();
    });

    it("Create [Post /]", () => {
        return request(app.getHttpServer())
            .post("/coffees")
            .send(coffee as CreateCoffeeDto)
            .expect(HttpStatus.CREATED)
            .then(({ body }) => {
                const expectedCoffee = jasmine.objectContaining({
                    ...coffee,
                    flavors: jasmine.arrayContaining(coffee.flavors.map((name) => jasmine.objectContaining({ name }))),
                });
                expect(body).toEqual(expectedCoffee);
            });
    });
    it.todo("Get all [Get /]");
    it.todo("Get one [Get /:id]");
    it.todo("Update one [PATCH /:id]");
    it.todo("Delete on [DELETE /:id]");

    afterAll(async () => {
        await app.close();
    });
});
