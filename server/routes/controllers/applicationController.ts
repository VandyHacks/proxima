import { Application, CommitteeChoice } from "../../database/models.ts"
import { Context } from "../../deps.ts"


const parseTypeForm = async(ctx: Context) => {
    // populate application
    const application: {form_response: {definition: {fields: any[]}, answers: any}} = await ctx.request.body().value;
    let responses: any = {};
    let committees: [string] = [""];

    application.form_response.answers.forEach((answer: any) => {
        // Map field reference name (set in TypeForm) to the response
        if (answer.field.ref === "year"){
            responses["year"] = answer.choice.label.split(' ')[0].toLowerCase();
        }
        else if (answer.field.ref === "committees"){
            committees = answer.choices.labels.map((c: string) => c.toLowerCase());
        }
        else{
            responses[answer.field.ref] = answer[answer.type];
        }
    });


    let newApplication = await Application.create({
        name: `${responses.firstName} ${responses.lastName}`,
        email: responses.email,
        year: responses.year,
        director: responses.director,
        status: "applied",
        essay1: responses.essay1,
        essay2: responses.essay2,
        essay3: responses.essay3,
        resume_link: responses.resume_link,
        commitments: responses.commitments,
        attendedVH: responses.attendedVH,
        feedback: responses.feedback,
        github_link: responses.github_link,
        linkedin_link: responses.linkedin_link,
        social_link: responses.social_link,
        design_link: responses.design_link,
        source: responses.source
    });

    console.log(newApplication);

    for(let i = 0; i < committees.length; i++){
        await CommitteeChoice.create({
            committee: committees[i],
            applicationId: 2,
        });
    }

    ctx.response.body = "Submission received!";
};

const displayApplications = async(ctx: Context) => {
    
};


export { parseTypeForm }