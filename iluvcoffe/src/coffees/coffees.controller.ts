import { Controller, Get, Param, Body, Post, Patch, Delete, Query, Inject, ValidationPipe } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";

import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { Public } from "../common/decorators/public.decorator";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { Protocol } from "../common/decorators/protocol.decorator";

@ApiTags("coffees")
@Controller("coffees")
export class CoffeesController {
    constructor(
        //{{{
        private readonly coffeesService: CoffeesService,
        @Inject(REQUEST)
        private readonly request: Request,
    ) {
        console.log("[!!] CoffeesController created");
        console.log("[!!] CoffeesController REQUEST", request.body);
    } //}}}

    @ApiForbiddenResponse({ description: "Forbidden" })
    @Public()
    @Get()
    async findAll(@Protocol("https") protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        //{{{
        // const { limit, offset } = paginationQuery;
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        // console.log(`[!!] Protocol instantiated: "${protocol}"`);
        return this.coffeesService.findAll(paginationQuery);
    } //}}}

    // @Public()
    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        //{{{
        console.log("GET ===>", id);
        return this.coffeesService.findOne("" + id);
    } //}}}

    // @Public()
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        //{{{
        // console.log("===>", createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    } //}}}

    /*-- Pipes on parameter --*/
    // @Public()
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
