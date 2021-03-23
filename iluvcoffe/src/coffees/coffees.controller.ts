import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Res, Patch, Delete, Query } from '@nestjs/common';
import { CoffeesService }from './coffees.service';

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService:  CoffeesService) {}

    @Get()
    findAll(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.coffeesService.findAll();
        // return `This action returns all the coffees. Limit ${limit}, offset: ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeesService.findOne(id);
        // return `This action returns #${id} the coffees.`;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return this.coffeesService.create(body);
        // return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.coffeesService.update(id, body);
        // return `This action returns #${id} the coffees.`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
        // return `This action removes #${id} coffee`;
    }
}
