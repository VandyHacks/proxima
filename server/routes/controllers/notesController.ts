import { Context, Model } from "../../deps.ts"
import { CommitteeChoice, Note, Question, QuestionNote } from "../../database/models.ts"

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
 * body's value is a number for applicationId
 * @param param0
 */
const getQuestionsForApplicant = async({request, response}: Context) => {
    const appId: number = await request.body().value as number;

    // Get general questions first
    let questions: Model[] = await Question.select('id', 'content', 'specificity', 'description')
    .where('specificity', 'general').orderBy('id').get() as Model[];

    // Get committees of this application
    const committees: Model[] = await CommitteeChoice.select('committee').where('applicationId', appId).get() as Model[];

    // Get questions for all committees of this applicaiton
    for (const committee of committees){
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
    // Create Notes row


    // Create QuestionNote row

}


/**
 * Get notes on interviews for a specific applicant
 * body: number, representing applicationId
 * response: {[
 *  interviewer_name: string,
    reliability: number ([1, 2, 3, 4, 5, 6, 7]),
    interest: number ([1, 2, 3, 4, 5, 6, 7]),
    teamwork: number ([1, 2, 3, 4, 5, 6, 7]),
    overall: number ([1, 2, 3, 4, 5, 6, 7]),
    thoughts: string,
    responses: [{question: string, description: string, specificity: string, note: string}]
 * ]}
 */
const getNotes = async({request, response}: Context) => {
    const appId: number = await request.body().value as number;

    // Get Notes rows
    let notes: any[] = await Note.select('id', 'interviewer_name', 'reliability', 'interest', 'teamwork', 'overall', 'thoughts').where('applicationId', appId).get() as Model[];
    
    // For every Notes row, add respective QuestionNote rows
    for (let note of notes){
        note.responses = [];
        const questionNotes = await QuestionNote.select('questionId', 'response').where('noteId', note.id).get() as Model[];
        for(let questionNote of questionNotes){
            const question = await Question.select('content', 'description', 'specificity').find(questionNote.questionId as number) as Model;
            note.responses.push({
                question: question.content as string,
                description: question.description as string,
                specificity: question.specificity as string,
                note: questionNote.response as string
            });
        }
    }
    response.body = notes;
}

export { questionCreate, getQuestionsForApplicant, getAllQuestions, addNotes }