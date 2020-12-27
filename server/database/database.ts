import { Database } from "../deps.ts";
import { config } from "../config/config.ts";
import { Question, NotesQuestion } from "./models.ts";


const db = new Database(config.database);

db.link([NotesQuestion, Question]);

db.sync();

export { db };