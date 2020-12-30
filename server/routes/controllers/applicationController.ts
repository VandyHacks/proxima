import { Application, CommitteeChoice } from "../../database/models.ts"
import { Context, Model } from "../../deps.ts"
import { send } from "../../utils/smtpClient.ts"

/**
 * Parsing is very specific to the kind of form we have right now.
 * For exampl, I am getting 'freshman', 'sophomore', etc. by splitting
 * the year field in the TypeForm. TODO: add typeform entries as a table 
 * and generalize the parsing.
 * @param {request, response} 
 */
const parseTypeForm = async({request, response}: Context) => {
    // populate application
    const application: {form_response: {definition: {fields: any[]}, answers: any}} = await request.body().value;
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
    response.body = "Submission received!";
};

/**
 * Display all applications for the grid on the main page. 
 * {
 * 
 * }
 * @param {response} 
 */
const displayApplications = async({response}: Context) => {
    let applications: any[] = await Application.select('id', 'name', 'email', 'year', 'director', 'status', 'resume_link', 'github_link', 'linkedin_link', 'social_link', 'design_link').orderBy('id').all();

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
 * body: number, representing applicationId
 */
const getApplicationResponses = async({request, response}: Context) => {
    const appId: number = await request.body().value as number;
    response.body = await Application.select('essay1', 'essay2', 'essay3', 'commitments', 'attendedVH', 'feedback', 'source').find(appId);
}



/**
 * Send email based on status update.
 */
const sendEmail = async (email: string, status: string) => {
    let emailMessage: string;
    if (status === "accepted"){
        emailMessage = "Congratualations! You are accepted!"
    }
    else if(status === "rejected"){
        emailMessage = "Unfortunately, we were not able to extend the position on VH boar to you."
    }
    else if(status === "to_interview"){
        emailMessage = "Hey! Let's talk tomorrow 2pm CST."
    }
    else {
        console.log("Wrong status passed to sending emails. We have no emails for this case.")
        return;
    }

    send(email, "VandyHacks Board Decision", emailMessage);
    
    console.log(`Update of status to ${status} email sent to ${email}`);
}


/**
 * ApplicationID and new status are sent in the body.
 * @param {request, response} : body: {applicationId: number, status: string}
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



export { parseTypeForm, displayApplications, updateStatus, getApplicationResponses }