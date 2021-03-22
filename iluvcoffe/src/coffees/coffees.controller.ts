import { Controller, Get, Param, Body, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll() {
        return "This action returns all the coffers.";
    }

    // @Get(':id')
    // findOne(@Param() params) {
    //     return `This action returns ==> #${params.id} the coffers.`;
    // }

    // Or with constraint Param object

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns #${id} the coffers.`;
    }

    // @Post()
    create(@Body() body) {
        return body;
    }


    // Or with constrain Body object
    // XXX CAUTION: other properties WON'T be validated XXX
    // @Post()
    // create(@Body('name') body) {
    //     return body;
    // }

}
