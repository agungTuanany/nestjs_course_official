import { DynamicModule, Module } from "@nestjs/common";
import { createConnection, ConnectionOptions } from "typeorm";

//{{{ /*-- static module --*/
// @Module({
//     providers: [
//         {
//             provide: "CONNECTION",
//             useValue: createConnection({
//                 type: "postgres",
//                 host: "localhost",
//                 port: 5432,
//                 username: "postgres",
//                 password: "pass123",
//             }),
//         },
//     ],
// })
// export class DatabaseModule {}
//}}}

/*-- dynamic module --*/
@Module({})
export class DatabaseModule {
    constructor() {
        // console.log("[!] DatabaseModule - dynamic module instantiated");
    }

    static register(options: ConnectionOptions): DynamicModule {
        console.log("[!] DatabaseModule - instantiated");
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: "CONNECTION",
                    useValue: createConnection(options),
                },
            ],
        };
    }
}
