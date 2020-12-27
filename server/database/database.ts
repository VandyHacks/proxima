import { Database } from "../deps.ts";
import { config } from "../config/config.ts";
import { Question } from "./models/question.ts";


const db = new Database(config.database);

db.link([Question]);

export { db };