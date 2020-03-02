module.exports = {
    "type": process.env.PG_TYPE,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "entities": [
        "dist/**/*.entity{.ts,.js}"
    ],
    "autoLoadEntities": true,
    "logging": true,
    "synchronize": true
}