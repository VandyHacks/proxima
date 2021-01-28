import app from './app';
import databaseConnection from './database.connection';

const PORT = Number(process.env.PORT) || 3000;

databaseConnection
  .then(async connection => {
    // console.log(connection);
    app.listen(PORT);
    console.log(`Server is listening on ${PORT}`);
  })
  .catch(console.error);
