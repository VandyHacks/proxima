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
        year: DataTypes.enum(["freshman", "sophomore", "junior"]),
        status: DataTypes.enum(["applied", "to_interview", "interviewed", "rejected", "unsure"]),
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

    static committees() {
        return this.hasMany(CommitteeChoice);
    }

    static notes() {
        return this.hasMany(Note);
    }
}

class CommitteeChoice extends Model {
    static table = 'committee_choices';
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        committee: DataTypes.enum(["operations", "development", "hacker experience", "design", "sponsorship", "content", "marketing"]),
        isDirector: DataTypes.BOOLEAN,
        applicationId: Relationships.belongsTo(Application),
    };

    static application(){
        return this.hasOne(Application);
    }
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
        applicationId: Relationships.belongsTo(Application),
        reliability: DataTypes.enum([1, 2, 3, 4, 5, 6, 7]),
        interest: DataTypes.enum([1, 2, 3, 4, 5, 6, 7]),
        teamwork: DataTypes.enum([1, 2, 3, 4, 5, 6, 7]),
        overall: DataTypes.enum([1, 2, 3, 4, 5, 6, 7]),
        thoughts: DataTypes.TEXT
    };

    static application(){
        return this.hasOne(Application);
    }
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
        specificity: DataTypes.enum(["general", "operations", "development", "hacker experience", "design", "sponsorship", "content", "marketing"])
    };
}

export { Application, CommitteeChoice, NotesQuestion, Note, Question };