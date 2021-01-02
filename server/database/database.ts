import { Database, PostgresConnector } from "../deps.ts";
import { config } from "../config/config.ts";
import { QuestionNote, Question, Note, Application, CommitteeChoice } from "./models.ts";

const connector = new PostgresConnector(config.database);

const db = new Database({
    connector,
    // debug: true
});

db.link([Application, CommitteeChoice, Question, Note, QuestionNote]);

export default db;