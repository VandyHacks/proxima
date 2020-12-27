import { Database } from "../deps.ts";
import { config } from "../config/config.ts";
import { QuestionNote, Question, Note, Application, CommitteeChoice } from "./models.ts";


const db = new Database('postgres', config.database);


async function connectDB() {
  console.log("DB Connected")
  db.link([QuestionNote, Question, Note, Application, CommitteeChoice]);
  await db.sync({ drop: true })
}


export { connectDB };