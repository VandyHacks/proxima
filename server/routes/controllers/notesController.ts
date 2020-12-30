import { Context, Model } from "../../deps.ts"
import { CommitteeChoice, Note, Question, QuestionNote } from "../../database/models.ts"
import { send } from "../../utils/smtpClient.ts"


/**
 * Adds the question to the database
 * Body: {content: string, specificity: string, description: string}
 * @param { request, response } 
 */
const questionCreate = async({request, response}: Context) => {
    // populate committee
    const questionData: any = await request.body().value;

    await Question.create(
        {
            content: questionData.content,
            specificity: questionData.specificity,
            description: questionData.description
        }
    );
    response.body = "Questions Added";
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
const getAllQuestions = async({response}: Context) => {
    response.body = await Question.select('id', 'content', 'specificity', 'description').all();
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
 *  }
 * @param {request, response}
 */
const addNotes = async({request, response}: Context) => {
    const noteData: {
        applicationId: number, 
        interviewer_name: string, 
        reliability: number,
        interest: number, 
        teamwork: number, 
        overall: number 
        thoughts: string,
        questionAnswers: {questionId: number, response: string}[]
    } = await request.body().value;

    // Create Notes row
    let note: Model = await Note.create({
        applicationId: noteData.applicationId,
        interviewer_name: noteData.interviewer_name,
        reliability: noteData.reliability,
        interest: noteData.reliability,
        teamwork: noteData.teamwork,
        overall: noteData.overall,
        thoughts: noteData.thoughts
    });

    // Create QuestionNote row
    for(let questionNote of noteData.questionAnswers){
        await QuestionNote.create({
            response: questionNote.response,
            noteId: note.id as number,
            questionId: questionNote.questionId
        });
    }

    response.body = `Notes and responses successfully added from ${noteData.interviewer_name}`;
}


/**
 * Get notes on interviews for a specific applicant
 * body: number, representing applicationId
 * response: {[
 *  interviewer_name: string,
    reliability: number [1-7],
    interest: number [1-7],
    teamwork: number [1-7],
    overall: number [1-7],
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

export { questionCreate, getQuestionsForApplicant, getAllQuestions, addNotes, getNotes }