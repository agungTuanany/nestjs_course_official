import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Coffee } from "./entities/coffee.entity";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";

@Injectable()
export class CoffeesService {

    constructor(@InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>) {}

    findAll(paginationQuery: PaginationQueryDto) {
        //{{{
        const { limit, offset } = paginationQuery;
        return this.coffeeModel.find().skip(offset).limit(limit).exec();
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

    create(createCoffeeDto: CreateCoffeeDto) {
        //{{{
        const coffee = new this.coffeeModel(createCoffeeDto);

        return coffee.save();
    } //}}}

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        //{{{
        const existingCoffee = await this.coffeeModel
        .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
        .exec();

        if (!existingCoffee) {
            throw new NotFoundException(`[!!]UPDATE: Coffee #${id} not found`);
        }

        return existingCoffee;
    } //}}}

    async remove(id: string) {
        //{{{
        const coffee = await this.findOne(id);

        return coffee.remove();
    } //}}}
}
