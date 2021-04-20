import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Coffee } from "./entities/coffee.entity";

@Injectable()
export class CoffeesService {

    constructor(@InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>) {}

    findAll() {
        //{{{
        return this.coffeeModel.find().exec();
    } //}}}

    async findOne(id: string) {
        //{{{
        // throw "A Random Error";
        const coffee = await this.coffeeModel.findOne({ _id: id }).exec()

        if (!coffee) {
            // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return coffee;
        // return this.coffees.find(item => item.id === +id);
    } //}}}

    create(createCoffeeDto: any) {
        //{{{
        const coffee = new this.coffeeModel(createCoffeeDto);
    } //}}}

    update(id: string, updateCoffeeDto: any) {
        //{{{
        const existingCoffee = this.findOne(id);

        if (existingCoffee) {
            // update the existing entity
        }
    } //}}}

    remove(id: string) {
        //{{{
        const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);

        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
    } //}}}
}
