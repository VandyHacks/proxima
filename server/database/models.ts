import { Model, DataTypes, Relationships } from "../deps.ts";

export class Note extends Model {
    static table = 'notes';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: DataTypes.TEXT,
        ownerId: Relationships.belongsTo(Owner),
    };
}

export class NotesQuestion extends Model {
    static table = 'notes_to_questions';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: DataTypes.TEXT
    };
}

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