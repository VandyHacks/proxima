import { Database } from "../deps.ts";
import { config } from "../config/config.ts";
import { QuestionNote, Question, Note, Application, CommitteeChoice } from "./models.ts";


async function connectDB() {
  const db = await new Database('postgres', config.database);
  db.link([QuestionNote, Question, Note, Application, CommitteeChoice]);
  await db.sync()
  console.log("DB Connected")
}

export { connectDB };