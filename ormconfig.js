module.exports = {
  "type": "mysql",
  "host": process.env.DB_HOST,
  "port": 3306,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "synchronize": process.env.APP_ENV !== 'production',
  "logging": false,
  "autoLoadEntities": true,
  "entities": ["dist/**/*.entity.js"],
  "migrations": ["dist/migrations/*.js"],
  "cli": {
    "migrationsDir": "src/migrations"
  }
}