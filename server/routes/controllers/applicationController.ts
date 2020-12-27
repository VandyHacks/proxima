import { Application, CommitteeChoice } from "../../database/models.ts"
import { Context } from "../../deps.ts"

const parseTypeForm = async(ctx: Context) => {
    // populate application
    const formData = ctx.request.body();
    console.log(formData);
    // await Application.create([{
    //     name: DataTypes.STRING,
    //     email: DataTypes.STRING,
    //     year: DataTypes.enum(["freshman", "sophomore", "junior"]),
    //     status: DataTypes.enum(["applied", "to_interview", "interviewed", "rejected", "unsure"]),
    //     essay1: DataTypes.TEXT,
    //     essay2: DataTypes.TEXT,
    //     essay3: DataTypes.TEXT,
    //     resume_link: DataTypes.STRING,
    //     commitments: DataTypes.TEXT,
    //     attendedVH: DataTypes.BOOLEAN,
    //     feedback: DataTypes.TEXT,
    //     github_link: DataTypes.STRING,
    //     linkedin_link: DataTypes.STRING,
    //     social_link: DataTypes.STRING,
    //     design_link: DataTypes.STRING,
    //     source: DataTypes.TEXT
    // }]);

    // // populate committee
    // await CommitteeChoice.create([{
    //     committee: DataTypes.enum(["operations", "development", "hacker experience", "design", "sponsorship", "content", "marketing"]),
    //     isDirector: DataTypes.BOOLEAN,
    //     applicationId: Relationships.belongsTo(Application),
    // }]);

    ctx.response.body = "Submission received!";
};

const displayApplications = async(ctx: Context) => {
    
};


export { parseTypeForm }