import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Res, Patch, Delete, Query } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get()
    findAll(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        return `This action returns all the coffees. Limit ${limit}, offset: ${offset}`;
    }

    // @Get()
    // findAll() {
    //     return "This action returns all the coffees.";
    // }


    // Or with native handle status use '@Res()'
    // XXX CAUTION: it's not the best practice to use native handle status code. XXX
    // @Get()
    // findAll(@Res() response) {
    //     response.status(200).send("This action returns all the coffees.");
    //     // return "This action returns all the coffees.";
    // }

    // @Get(':id')
    // findOne(@Param() params) {
    //     return `This action returns ==> #${params.id} the coffees.`;
    // }

    // Or with constraint Param object
    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns #${id} the coffees.`;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return body;
    }

    // Or with constrain Body object
    // XXX CAUTION: other properties WON'T be validated XXX
    // @Post()
    // create(@Body('name') body) {
    //     return body;
    // }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `This action returns #${id} the coffees.`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes #${id} coffee`;
    }
}
