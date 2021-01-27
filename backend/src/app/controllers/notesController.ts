import * as Koa from 'koa';
import { getRepository, Repository } from 'typeorm';
import { CommitteeChoice } from '../../database/entities/CommitteeChoice';
import {
  Question,
  QuestionSpecificity
} from '../../database/entities/Question';
import { Note } from '../../database/entities/Note';
import {
  Application,
  ApplicationStatus
} from '../../database/entities/Application';
import { QuestionNote } from '../../database/entities/QuestionNote';
import { Comment } from '../../database/entities/Comments';

/**
 * Adds the question to the database
 * Body: {content: string, specificity: string, description: string}
 */
const questionCreate = async ({
  request,
  response
}: Koa.Context): Promise<void> => {
  const questionRepo: Repository<Question> = getRepository(Question);

  // populate committee
  const questionData:
    | {
        content: string;
        specificity: QuestionSpecificity;
        description: string;
      }
    | any = request.body;

  const question: Question = questionRepo.create({
    content: questionData.content,
    specificity: questionData.specificity,
    description: questionData.description
  });

  await questionRepo.save(question);

  response.body = question;
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
const getQuestionsForApplicant = async ({ params, response }: Koa.Context) => {
  const questionRepo: Repository<Question> = getRepository(Question);
  const committeeChoiceRepo: Repository<CommitteeChoice> = getRepository(
    CommitteeChoice
  );

  const applicationId: number = (params.applicationId as unknown) as number;

  // Get general questions first
  const questions: Question[] = await questionRepo.find({
    select: ['id', 'content', 'specificity', 'description'],
    where: { specificity: QuestionSpecificity.GENERAL },
    order: {
      id: 'ASC'
    }
  });

  // Get committees of this application
  const committeeChoices: CommitteeChoice[] = await committeeChoiceRepo.find({
    select: ['committee'],
    where: { applicationId: applicationId }
  });

  // Get questions for all committees of this applicaiton
  for (const committeeChoice of committeeChoices) {
    const comQuestion: Question[] = await questionRepo.find({
      select: ['id', 'content', 'specificity', 'description'],
      where: { specificity: committeeChoice.committee },
      order: {
        id: 'ASC'
      }
    });

    questions.push(...comQuestion);
  }

  // Add wrap-up questions to the list
  const wrapUpQuestions: Question[] = await questionRepo.find({
    select: ['id', 'content', 'specificity', 'description'],
    where: { specificity: QuestionSpecificity.WRAPUP },
    order: {
      id: 'ASC'
    }
  });

  questions.push(...wrapUpQuestions);

  response.body = questions;
};

/**
 * Return a list of all questions.
 * @param ctx
 */
const getAllQuestions = async ({ response }: Koa.Context) => {
  const questionRepo: Repository<Question> = getRepository(Question);
  response.body = await questionRepo.find({
    select: ['id', 'content', 'specificity', 'description'],
    order: {
      id: 'ASC'
    }
  });
};

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
const addNotes = async ({ params, request, response }: Koa.Context) => {
  const applicationRepo: Repository<Application> = getRepository(Application);
  const noteRepo: Repository<Note> = getRepository(Note);
  const questionNoteRepo: Repository<QuestionNote> = getRepository(
    QuestionNote
  );

  const applicationId = (params.applicationId as unknown) as number;

  const noteData:
    | {
        interviewer_name: string;
        reliability: number;
        interest: number;
        teamwork: number;
        overall: number;
        thoughts: string;
        questionAnswers: { questionId: number; response: string }[];
      }
    | any = request.body;

  const application: Application | undefined = await applicationRepo.findOne(
    applicationId,
    {
      select: ['id', 'status']
    }
  );

  if (
    application &&
    application.status !== ApplicationStatus.REJECTED &&
    application.status !== ApplicationStatus.ACCEPTED
  ) {
    application.status = ApplicationStatus.INREVIEW;

    await applicationRepo.save(application);
  }

  // Create Notes row
  const note: Note = noteRepo.create({
    interviewer_name: noteData.interviewer_name,
    reliability: noteData.reliability,
    interest: noteData.interest,
    teamwork: noteData.teamwork,
    overall: noteData.overall,
    thoughts: noteData.thoughts,
    application: application
  });

  await noteRepo.save(note);

  // Create QuestionNote row
  for (const questionNote of noteData.questionAnswers) {
    const questionResponse = questionNoteRepo.create({
      response: questionNote.response,
      noteId: note.id as number,
      questionId: questionNote.questionId
    });
    await questionNoteRepo.save(questionResponse);
  }

  response.body = `Notes and responses successfully added from ${noteData.interviewer_name}`;
};

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
const getNotes = async (applicationId: number) => {
  // Note repository
  const noteRepository: Repository<Note> = getRepository(Note);

  const notes: any[] = await noteRepository.find({
    select: [
      'id',
      'interviewer_name',
      'reliability',
      'interest',
      'teamwork',
      'overall',
      'thoughts'
    ],
    where: { applicationId: applicationId },
    relations: ['notesToQuestions']
  });

  // For every Notes row, add respective QuestionNote rows
  for (const note of notes) {
    note.responses = [];

    const questionNotes: QuestionNote[] = note.notesToQuestions;
    for (const questionNote of questionNotes) {
      const question: Question = questionNote.question;

      note.responses.push({
        question: question.content as string,
        description: question.description as string,
        specificity: question.specificity as string,
        note: questionNote.response as string
      });
    }
  }
  return notes;
};

/**
 * Adds notes to the application.
 * body:
 * {commenter_name: string, content: string}
 */
const addComments = async ({
  params,
  request,
  response
}: Koa.Context): Promise<void> => {
  const commentRepo: Repository<Comment> = getRepository(Comment);
  const applicationId = (params.applicationId as unknown) as number;
  const body: { commenter_name: string; content: string } | any = request.body;

  const newComment = commentRepo.create({
    applicationId,
    commenter_name: body.commenter_name,
    content: body.content
  });

  await commentRepo.save(newComment);
  response.body = 'Successfully added comments';
};

/**
 * Get comments for the application.
 * params: applicationId
 * return: [{commenter_name: string, content: string}]
 */
const getComments = async (applicationId: number): Promise<Comment[]> => {
  const commentRepo: Repository<Comment> = getRepository(Comment);
  return await commentRepo.find({
    select: ['id', 'commenter_name', 'content'],
    where: { applicationId: applicationId }
  });
};

const deleteQuestion = async ({ params, response }: Koa.Context) => {
  const questionRepo: Repository<Question> = getRepository(Question);
  const questionId: number = (params.questionId as unknown) as number;

  await questionRepo.delete(questionId);
  response.body = `Successfully deleted ${questionId}`;
};

const getSpecificQuestions = async ({ params, response }: Koa.Context) => {
  const questionRepo: Repository<Question> = getRepository(Question);
  const specificity: QuestionSpecificity = params.specificity;

  response.body = await questionRepo.find({
    select: ['id', 'content', 'specificity', 'description'],
    where: { specificity: specificity },
    order: {
      id: 'ASC'
    }
  });
};

export {
  questionCreate,
  getQuestionsForApplicant,
  getAllQuestions,
  addNotes,
  getNotes,
  addComments,
  getComments,
  deleteQuestion,
  getSpecificQuestions
};
