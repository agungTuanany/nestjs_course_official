import { NestFactory } from "@nestjs/core";
import { HttpException, ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { ApiKeyGuard } from "./common/guard/api-key.guard";
import { WrapResponseInterceptor } from "./common/interceptor/wrap-response.interceptor";

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
    // app.useGlobalGuards(new ApiKeyGuard());
    app.useGlobalInterceptors(new WrapResponseInterceptor());
    await app.listen(3002);

    // console.log("app is run on port: 3002");
}
bootstrap();
