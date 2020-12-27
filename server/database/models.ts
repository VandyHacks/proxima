import { Model, DataTypes, Relationships } from "../deps.ts";

export class Application extends Model {
    static table = 'applications';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        year: { type: DataTypes.ENUM, values: ["freshman", "sophomore", "junior"]},
        status: { type: DataTypes.ENUM, values: ["applied", "to_interview", "interviewed", "rejected"]},
        essay1: DataTypes.TEXT,
        essay2: DataTypes.TEXT,
        essay3: DataTypes.TEXT,
        resume_link: DataTypes.STRING,
        commitments: DataTypes.TEXT,
        attendedVH: DataTypes.BOOLEAN,
        feedback: DataTypes.TEXT,
        github_link: DataTypes.STRING,
        linkedin_link: DataTypes.STRING,
        social_link: DataTypes.STRING,
        design_link: DataTypes.STRING,
        source: DataTypes.TEXT
    };
}

export class CommitteeChoice extends Model {
    static table = 'committee_choices';
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        committee: { type: DataTypes.ENUM, values: ["operations", "development", "hacker experience", "design", "sponsorship", "content", "marketing"]},
        isDirector: DataTypes.BOOLEAN,
        ownerId: Relationships.belongsTo(Application),
    };
}

export class Note extends Model {
    static table = 'notes';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        content: DataTypes.TEXT,
        ownerId: Relationships.belongsTo(Application),
    };
}

export class NotesQuestion extends Model {
    static table = 'notes_to_questions';
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