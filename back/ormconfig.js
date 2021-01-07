module.exports = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: 5432,
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  synchronize: true,
  logging: false,
  entities: ['dist/app/database/entity/*.js'],
  migrations: ['dist/app/database/migration/*.js'],
};
