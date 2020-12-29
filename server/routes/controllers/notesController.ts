// import { Application, CommitteeChoice, QuestionNote, Note, Question } from "../../database/models.ts"
import { Context } from "../../deps.ts"
import { CommitteeChoice, Question, QuestionNote } from "../../database/models.ts"
import { Model } from "https://deno.land/x/denodb@v1.0.18/lib/model.ts";

/**
 * Adds the question to the database
 * Body: {content: string, specificity: string, description: string}
 * @param ctx 
 */
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


/**
 *  
 * @param param0 - body's value is a number for applicationId
 */
const getQuestionsForApplicant = async({request, response}: Context) => {
    const appId: number = await request.body().value as number;

    // Get general questions first
    let questions: Model[] = await Question.select('id', 'content', 'specificity', 'description')
    .where('specificity', 'general').orderBy('id').get() as Model[];

    // Get committees of this application
    const committees: Model[] = await CommitteeChoice.select('committee').where('applicationId', appId).get() as Model[];


    // Get questions for all committees of this applicaiton
    for (let committee of committees){
        let comQuestion: Model[] = await Question.select('id', 'content', 'specificity', 'description')
        .where('specificity', committee.committee as string).orderBy('id').get() as Model[];
        questions.push(...comQuestion);
    }

    response.body = questions;
}

/**
 * Return a list of all questions.
 * @param ctx 
 */
const getAllQuestions = async(ctx: Context) => {
    ctx.response.body = await Question.select('id', 'content', 'specificity', 'description').all();
}

/**
 * Add notes for interview questions and for an applicant. 
 * Body: {
 *  applicationId: number, 
 *  interviewer_name: string, 
 *  reliability: number, [1-7]
 *  interest: number, [1-7]
 *  teamwork: number, [1-7]
 *  overall: number [1-7]
 *  thoughts: string [paragraph],
 *  questionAnswers: [{questionId: number, response: string}]
 * ] }
 * @param {request, response}
 */
const addNotes = async({request, response}: Context) => {

}


/**
 * 
 */


export { questionCreate, getQuestionsForApplicant, getAllQuestions, addNotes }