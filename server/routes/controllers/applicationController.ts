import { Application, CommitteeChoice } from "../../database/models.ts"
import { Context, Model } from "../../deps.ts"

/**
 * Parsing is very specific to the kind of form we have right now.
 * For exampl, I am getting 'freshman', 'sophomore', etc. by splitting
 * the year field in the TypeForm. TODO: add typeform entries as a table 
 * and generalize the parsing.
 * @param ctx 
 */
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

    // Create committee relations for an applicant
    for(let i = 0; i < committees.length; i++){
        await CommitteeChoice.create({
            committee: committees[i],
            applicationId: newApplication.id as number,
        });
    }
    ctx.response.body = "Submission received!";
};

/**
 * Display all applications for the grid on the main page. 
 * @param param0 
 */
const displayApplications = async({response}: Context) => {
    let applications: any[] = await Application.select('id', 'name', 'email', 'year', 'director', 'status', 'resume_link').orderBy('id').all();
    
    for(let application of applications) {
        application.committees = [];
        let committees = await CommitteeChoice.select('committee').where('applicationId', application.id as number).get() as Model[];
        for(let committeeObj of committees){
            application.committees.push(committeeObj.committee)
        }
    }
    response.body = applications;
};


/**
 * Send email based on status update.
 */
const sendEmail = async (email: string, status: string) => {
    console.log(`Update of status to ${status} email sent to ${email}`);
    // TODO: email send out
}


/**
 * ApplicationID and new status are sent in the body.
 * @param ctx : body: {applicationId: number, status: string}
 */
const updateStatus = async({request, response}: Context) => {
    const body: {applicationId: number, status: string} = await request.body().value;
    const appId: number = body.applicationId;
    const newStatus: string = body.status;

    // Get application to update
    const application: Model = await Application.select('id', 'status', 'email').find(appId);

    // Logic for emails
    sendEmail(application.email as string, newStatus);

    // Update status
    application.status = newStatus; 
    await application.update();
    response.body = `Updated status to ${newStatus} for ${application.email}`;
};

export { parseTypeForm, displayApplications, updateStatus }