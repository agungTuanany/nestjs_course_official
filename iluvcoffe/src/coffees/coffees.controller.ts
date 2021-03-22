import { Controller, Get, Param } from '@nestjs/common';

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

    // Or with constraint params object

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns #${id} the coffers.`;
    }

}
