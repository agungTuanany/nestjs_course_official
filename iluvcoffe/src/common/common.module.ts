import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ApiKeyGuard } from "../common/guard/api-key.guard";

import { LoggingMiddleware } from "./middleware/logging.middleware";

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard,
        },
    ],
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggingMiddleware).forRoutes("coffees");
        // consumer.apply(LoggingMiddleware).exclude.forRoutes("*");
        // consumer.apply(LoggingMiddleware).forRoutes({ path: "coffees", method: RequestMethod.GET });
        consumer.apply(LoggingMiddleware).forRoutes("*");
    }
}
