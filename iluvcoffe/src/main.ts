import { NestFactory } from "@nestjs/core";
import { HttpException, ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3002);

    // console.log("app is run on port: 3002");
}
bootstrap();
