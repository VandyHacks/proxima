import { Model, DataTypes, Relationships } from "../deps.ts";

class Application extends Model {
    static table = 'applications';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        year: { type: DataTypes.ENUM, values: ["freshman", "sophomore", "junior"]},
        status: { type: DataTypes.ENUM, values: ["applied", "to_interview", "interviewed", "rejected", "unsure"]},
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

class CommitteeChoice extends Model {
    static table = 'committee_choices';
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        committee: { type: DataTypes.ENUM, values: ["operations", "development", "hacker experience", "design", "sponsorship", "content", "marketing"]},
        isDirector: DataTypes.BOOLEAN,
        ownerId: Relationships.belongsTo(Application),
    };
}

class Note extends Model {
    static table = 'notes';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        interviewer_name: DataTypes.STRING,
        ownerId: Relationships.belongsTo(Application),

    };
}

class NotesQuestion extends Model {
    static table = 'notes_to_questions';
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: DataTypes.TEXT
    };
}

class Question extends Model {
    static table = 'questions';
    static timestamps = true;
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: DataTypes.TEXT,
        specificity: { type: DataTypes.ENUM, values: ["general", "operations", "development", "hacker experience", "design", "sponsorship", "content", "marketing"]}
    };
}

export { Application, CommitteeChoice, Note, NotesQuestion, Question };