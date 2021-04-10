import { Test, TestingModule } from "@nestjs/testing";
import { CoffeesService } from "./coffees.service";
import { Connection } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";

describe("CoffeesService", () => {
    let service: CoffeesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoffeesService,
                { provide: Connection, useValue: {} },
                { provide: getRepositoryToken(Coffee), useValue: {} },
                { provide: getRepositoryToken(Flavor), useValue: {} },
            ],
        }).compile();

        service = module.get<CoffeesService>(CoffeesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
