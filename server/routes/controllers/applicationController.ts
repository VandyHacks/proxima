// import { Application, CommitteeChoice } from "../../database/database.ts"
import app from "../../app.ts";
import { Context } from "../../deps.ts"


const parseTypeForm = async(ctx: Context) => {
    // populate application
    const application: {form_response: {definition: {fields: any[]}, answers: any}} = await ctx.request.body().value;
    let responses: any = {};
    let committees: [string];

    application.form_response.answers.forEach((answer: any) => {
        // Map field reference name (set in TypeForm) to the response
        if (answer.field.ref === "year"){
            responses["year"] = answer.choice.label.split(' ')[0].toLowerCase();
        }
        else if (answer.field.ref === "committees"){
            committees = answer.choices.label.map((c: string) => c.toLowerCase());
        }
        else{
            responses[answer.field.ref] = answer[answer.type];
        }
    });

    console.log(committees);
    console.log(responses)

    // Add their year
    responses[answer.field.]

    console.log(application);
    // await Application.create([{
    //     name: DataTypes.STRING,
    //     email: DataTypes.STRING,
    //     year: DataTypes.enum(["freshman", "sophomore", "junior"]),
    //     status: "applied",
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