import { RouterContext, Model } from "../../deps.ts"
import { CommitteeChoice, Note, Question, QuestionNote, Comments } from "../../database/models.ts"


/**
 * Adds the question to the database
 * Body: {content: string, specificity: string, description: string}
 */
const questionCreate = async({request, response}: RouterContext) => {
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
 * Return:
 * [{
        "id": number,
        "content": string,
        "specificity": string, (osp, hacker experience, ...)
        "description": string
    }]
 * @param param0
 */
const getQuestionsForApplicant = async({params, response}: RouterContext) => {
    const applicationId: number = params.applicationId as unknown as number;

    // Get general questions first
    let questions: Model[] = await Question.select('id', 'content', 'specificity', 'description')
    .where('specificity', 'general').orderBy('id').get() as Model[];

    // Get committees of this application
    const committees: Model[] = await CommitteeChoice.select('committee').where('applicationId', applicationId).get() as Model[];

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
const getAllQuestions = async({response}: RouterContext) => {
    response.body = await Question.select('id', 'content', 'specificity', 'description').all();
}

/**
 * Add notes for interview questions and for an applicant. 
 * body: { 
 *  interviewer_name: string, 
 *  reliability: number, [1-7]
 *  interest: number, [1-7]
 *  teamwork: number, [1-7]
 *  overall: number [1-7]
 *  thoughts: string [paragraph],
 *  questionAnswers: [{questionId: number, response: string}]
 *  }
 * @param {params, request, response}
 */
const addNotes = async({params, request, response}: RouterContext) => {
    const noteData: {
        interviewer_name: string, 
        reliability: number,
        interest: number, 
        teamwork: number, 
        overall: number 
        thoughts: string,
        questionAnswers: {questionId: number, response: string}[]
    } = await request.body().value;
    const applicationId = params.applicationId as unknown as number;

    // Create Notes row
    let note: Model = await Note.create({
        applicationId: applicationId,
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
 * @param: applicationId
 * return: [{
 *  interviewer_name: string,
    reliability: number [1-7],
    interest: number [1-7],
    teamwork: number [1-7],
    overall: number [1-7],
    thoughts: string,
    responses: [{question: string, description: string, specificity: string, note: string}]
 * }]
 */
const getNotes = async(applicationId: number) => {
    // Get Notes rows
    let notes: any[] = await Note.select('id', 'interviewer_name', 'reliability', 'interest', 'teamwork', 'overall', 'thoughts').where('applicationId', applicationId).get() as Model[];
    
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
    return notes;
}

/**
 * Adds notes to the application. 
 * body:
 * {commenter_name: string, content: string}
 */
const addComments = async({params, request, response}: RouterContext) => {
    const applicationId = params.applicationId as unknown as number;
    const body: {commenter_name: string, content: string} = await request.body().value;

    await Comments.create({
        applicationId: applicationId,
        commenter_name: body.commenter_name,
        content: body.content
    });

    response.body = "Successfully added comments";
}

/**
 * Get comments for the application.
 * params: applicationId
 * return: [{commenter_name: string, content: string}]
 */
const getComments = async(applicationId: number) => {
    return await Comments.select('commenter_name', 'content')
            .where('applicationId', applicationId).get() as Model[];;
}

export { questionCreate, getQuestionsForApplicant, getAllQuestions, addNotes, getNotes, addComments, getComments }