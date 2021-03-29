module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pass123",
    // database: "postgres",        // XXX NOTE: uncomment this if your database is 'postgres' in docker-compose.yml. Since I use 'postgres1'.
    database: "postgres1",          // XXX NOTE: comment this if your database is 'postgres' in docker-compose.yml
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migrations/*.js"],
    cli: {
        migrationsDir: "src/migrations",
    },
};
