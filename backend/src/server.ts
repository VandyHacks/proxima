import app from './app/app';
import databaseConnection from './database/database.connection';

const PORT = Number(process.env.PORT) || 3000;

databaseConnection
  .then(() => {
    app.listen(PORT);
    console.log(`Server is listening on ${PORT}`);
  })
  .catch(console.error);
