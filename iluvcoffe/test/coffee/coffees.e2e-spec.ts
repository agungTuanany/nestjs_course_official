/*
 * Credit: to "jstrother"
 * https://raw.githubusercontent.com/jstrother/iluvcoffee/master/test/coffees/coffees.e2e-spec.ts
 */

import { HttpServer, HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";

import { CoffeesModule } from "../../src/coffees/coffees.module";
import { CreateCoffeeDto } from "../../src/coffees/dto/create-coffee.dto";
import { UpdateCoffeeDto } from "../../src/coffees/dto/update-coffee.dto";
import { HttpExceptionFilter } from "../../src/common/filters/http-exception.filter";

describe("[Feature] Coffees - /coffees", () => {
    const coffee = {
        name: "Salemba Roast",
        brand: "Buddy Brew",
        flavors: ["Chocolate", "Vanilla"],
    };

    const expectedPartialCoffee = jasmine.objectContaining({
        ...coffee,
        flavors: jasmine.arrayContaining(coffee.flavors.map((name) => jasmine.objectContaining({ name }))),
    });

    let app: INestApplication;
    let httpServer: HttpServer;

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
                    database: "postgres",
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
        app.useGlobalFilters(new HttpExceptionFilter());

        await app.init();
        httpServer = app.getHttpServer();
    });

    it("Create [POST /]", async () => {
        return request(httpServer)
            .post("/coffees")
            .send(coffee as CreateCoffeeDto)
            .expect(HttpStatus.CREATED)
            .then(({ body }) => {
                expect(body).toEqual(expectedPartialCoffee);
            });
    });

    it("Get All [GET /]", async () => {
        return request(httpServer)
            .get("/coffees")
            .then(({ body }) => {
                expect(body.length).toBeGreaterThan(0);
                expect(body[0]).toEqual(expectedPartialCoffee);
            });
    });

    it("Get One [GET /:id]", async () => {
        return request(httpServer)
            .get("/coffees/1")
            .then(({ body }) => {
                expect(body).toEqual(expectedPartialCoffee);
            });
    });

    it("Update One [PATCH /:id]", async () => {
        const updatedCoffeeDto: UpdateCoffeeDto = {
            ...coffee,
            name: "New and Improved Salemba Roast",
        };

        return request(httpServer)
            .patch("/coffees/1")
            .send(updatedCoffeeDto)
            .then( async ({ body }) => {
                expect(body.name).toEqual(updatedCoffeeDto.name);

                return request(httpServer)
                    .get("/coffees/1")
                    .then(({ body }) => {
                        expect(body.name).toEqual(updatedCoffeeDto.name);
                    });
            });
    });

    it("Delete One [DELETE /:id]", async () => {
        return request(httpServer)
            .delete("/coffees/1")
            .expect(HttpStatus.OK)
            .then(() => {
                return request(httpServer).get("/coffees/1").expect(HttpStatus.NOT_FOUND);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
