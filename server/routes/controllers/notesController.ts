// import { Application, CommitteeChoice, QuestionNote, Note, Question } from "../../database/models.ts"
import { Context } from "../../deps.ts"
import { CommitteeChoice, Question, QuestionNote } from "../../database/models.ts"
import { createParams } from "https://raw.githubusercontent.com/deno-postgres/deno-postgres/master/connection_params.ts";


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
    let appId: number = await request.body().value as number;

    // Get general questions first
    let questions = await Question.select('content', 'specificity', 'description')
    .where('specificity', 'general');
    
    console.log(questions)

    const committees = await CommitteeChoice.select('committee').where('applicationId');

    console.log(committees);

    // questions.push(await Question.select('content', 'specificity', 'description')
    // .where('specificity', 'ops'));

    response.body = questions;
}

// Get a list of all questions
const getAllQuestions = async(ctx: Context) => {
    ctx.response.body = await Question.select('content', 'specificity', 'description').all();
}

export { questionCreate, getQuestionsForApplicant, getAllQuestions }