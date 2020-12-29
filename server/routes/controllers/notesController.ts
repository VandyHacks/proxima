// import { Application, CommitteeChoice, QuestionNote, Note, Question } from "../../database/models.ts"
import { Context } from "../../deps.ts"
import { CommitteeChoice, Question, QuestionNote } from "../../database/models.ts"


// Get array of objects: {content: string, specificity: string}
const questionCreate = async(ctx: Context) => {
    // populate committee
    const questionData: {content: string, specificity: string, description: string} = await ctx.request.body().value;
    await Question.create(
        {
            content: questionData.content,
            specificity: questionData.specificity,
            description: questionData.description
        }
    );
    ctx.response.body = "Questions Added";
};

// Get the id of application
const getQuestions = async(ctx: Context) => {
    // Get the committees for the application 

    ctx.response.body = await Question.select('content, specificity')
    .where('', '');
}

export { questionCreate, getQuestions }