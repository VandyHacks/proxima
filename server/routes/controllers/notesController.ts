// import { Application, CommitteeChoice, QuestionNote, Note, Question } from "../../database/models.ts"
import { Context } from "../../deps.ts"
import { CommitteeChoice, Question, QuestionNote } from "../../database/models.ts"
import { Model } from "https://deno.land/x/denodb@v1.0.18/lib/model.ts";


// Get array of objects: {content: string, specificity: string}
const questionCreate = async(ctx: Context) => {
    // populate committee
    const questionData: any = await ctx.request.body().value;

    await Question.create(
        {
            content: questionData.content,
            specificity: questionData.specificity,
            description: questionData.description
        }
    );
    ctx.response.body = "Questions Added";
};

// Get the committees for the application 
// pre: body value is a number that shows the Id for an application
const getQuestionsForApplicant = async({request, response}: Context) => {
    const appId: number = await request.body().value as number;

    // Get general questions first
    let questions: Model[] = await Question.select('content', 'specificity', 'description')
    .where('specificity', 'general').get() as Model[];

    // Get committees of this application
    const committees: Model[] = await CommitteeChoice.select('committee').where('applicationId', appId).get() as Model[];


    // Get questions for all committees of this applicaiton
    for (let committee of committees){
        let comQuestion: Model[] = await Question.select('content', 'specificity', 'description')
        .where('specificity', committee.committee as string).get() as Model[];
        questions.push(...comQuestion);
    }

    response.body = questions;
}

// Get a list of all questions
const getAllQuestions = async(ctx: Context) => {
    ctx.response.body = await Question.select('content', 'specificity', 'description').all();
}

export { questionCreate, getQuestionsForApplicant, getAllQuestions }