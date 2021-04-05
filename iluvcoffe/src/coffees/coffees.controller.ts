import { Controller, Get, Param, Body, Post, Patch, Delete, Query, Inject, UsePipes, ValidationPipe } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";

/*-- Global Pipes --*/
// @UsePipes(ValidationPipe)
/*-- Pipes on method --*/
// @UsePipes(ValidationPipe())

@Controller("coffees")
export class CoffeesController {
    constructor(
        //{{{
        private readonly coffeesService: CoffeesService,
        @Inject(REQUEST)
        private readonly request: Request,
    ) {
        console.log("[!!] CoffeesController created");
    } //}}}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        //{{{
        // const { limit, offset } = paginationQuery;
        return this.coffeesService.findAll(paginationQuery);
    } //}}}

    @Get(":id")
    findOne(@Param("id") id: number) {
        //{{{
        // console.log("GET ===>", typeof id);
        return this.coffeesService.findOne("" + id);
    } //}}}

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        //{{{
        // console.log("===>", createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    } //}}}

    /*-- Pipes on parameter --*/
    @Patch(":id")
    update(@Param("id") id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
        //{{{
        return this.coffeesService.update(id, updateCoffeeDto);
    } //}}}

    @Delete(":id")
    remove(@Param("id") id: string) {
        //{{{
        return this.coffeesService.remove(id);
    } //}}}
}
