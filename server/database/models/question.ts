import { Model, DataTypes } from "../../deps.ts";

export class Question extends Model {
    static table = 'questions';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: DataTypes.TEXT
    };
}