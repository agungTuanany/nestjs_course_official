import { Injectable, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Coffee } from "./entities/coffee.entity";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@Injectable()
export class CoffeesService {
    //private coffees: Coffee[] = [
    //    //{{{
    //    {
    //        id: 1,
    //        name: "Salemba Roast",
    //        brand: "Salemba Brand",
    //        flavors: ["chocolate", "vanilla"],
    //    },
    //]; //}}}

    constructor(
        //{{{
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) {} //}}}

    findAll() {
        //{{{
        return this.coffeeRepository.find();
    } //}}}

    async findOne(id: string) {
        //{{{
        // throw "A Random Error";
        const coffee = await this.coffeeRepository.findOne(id);

        if (!coffee) {
            throw new NotFoundException(`Coffee with 'id: #${id}' not found`);
        }

        return coffee;
    } //}}}

    create(createCoffeeDto: CreateCoffeeDto) {
        //{{{
        const coffee = this.coffeeRepository.create(createCoffeeDto);

        return this.coffeeRepository.save(coffee);
    } //}}}

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        //{{{
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
        });

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeeRepository.save(coffee);
    } //}}}

    async remove(id: string) {
        //{{{
        const coffee = await this.findOne(id);

        return this.coffeeRepository.remove(coffee);
    } //}}}
}
