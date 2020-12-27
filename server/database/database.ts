import { Database } from "../deps.ts";
import { config } from "../config/config.ts";
import { Question } from "./models/question.ts";
import { NotesQuestion } from "./models/notes-question.ts"


const db = new Database(config.database);

db.link([NotesQuestion, Question]);

db.sync();

export { db };