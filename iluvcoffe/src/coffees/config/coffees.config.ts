import { registerAs } from "@nestjs/config";

export default registerAs("coffees", () => ({
    foo: "bar",
    // database: {
    //     host: process.env.DATABASE_HOST,
    // },
    database: process.env.DATABSE_HOST
}));
