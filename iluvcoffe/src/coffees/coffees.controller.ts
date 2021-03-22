import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get()
    findAll() {
        return "This action returns all the coffers.";
    }

    // Or with native handle status use '@Res()'
    // XXX CAUTION: it's not the best practice to use native handle status code. XXX
    // @Get()
    // findAll(@Res() response) {
    //     response.status(200).send("This action returns all the coffers.");
    //     // return "This action returns all the coffers.";
    // }

    // @Get(':id')
    // findOne(@Param() params) {
    //     return `This action returns ==> #${params.id} the coffers.`;
    // }

    // Or with constraint Param object

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns #${id} the coffers.`;
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

}
