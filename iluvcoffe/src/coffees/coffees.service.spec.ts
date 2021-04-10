import { Test, TestingModule } from "@nestjs/testing";
import { CoffeesService } from "./coffees.service";
import { Connection, Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";

import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
});

describe("CoffeesService", () => {
    let service: CoffeesService;
    let coffeeRepository: MockRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoffeesService,
                { provide: Connection, useValue: {} },
                { provide: getRepositoryToken(Coffee), useValue: createMockRepository() },
                { provide: getRepositoryToken(Flavor), useValue: createMockRepository() },
            ],
        }).compile();

        service = module.get<CoffeesService>(CoffeesService);
        coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("findOne", () => {
        describe("when Coffee with ID exists", () => {
            it("should return the Coffee - Object", async () => {
                const coffeeId = "1";
                const expectedCoffee = {};

                coffeeRepository.findOne.mockReturnValue(expectedCoffee);
                const coffee = await service.findOne(coffeeId);
                expect(coffee).toEqual(expectedCoffee);
            });
        });

        describe("otherwise", () => {
            it("should throw 'NotFoundException'", async () => {
                const coffeeId = "1";
                coffeeRepository.findOne.mockReturnValue(undefined);

                try {
                    await service.findOne(coffeeId);
                } catch (err) {
                    expect(err).toBeInstanceOf(NotFoundException);
                    expect(err.message).toEqual(`Coffee with 'id: #${coffeeId}' not found`);
                }
            });
        });
    });
});
