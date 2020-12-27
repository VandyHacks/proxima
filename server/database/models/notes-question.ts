import { Model, DataTypes } from "../../deps.ts";

export class NotesQuestion extends Model {
    static table = 'NotesQuestions';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: DataTypes.TEXT
    };
}