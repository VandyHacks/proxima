module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'postgres',
  logging: false,
  entities: ['src/database/entities/**/*{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations'
  },
  synchronize: false
};
