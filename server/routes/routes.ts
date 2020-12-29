import { Router } from "../deps.ts";
import * as applicationController from "./controllers/applicationController.ts"
import * as notesController from "./controllers/notesController.ts"

const router = new Router();

// Application submission
router.post('/typeform/submit', applicationController.parseTypeForm);

// Add questions to interview question list
router.post('/interview/questions/add', notesController.questionCreate);

// Fetch all questions 
router.get('/interview/questions/list', notesController.getAllQuestions);

// Fetch questions for a specific applicant
router.get('/interview/questions', notesController.getQuestionsForApplicant);



// // Creating questions
// router.post('/interview/questions/add', notesController.questionCreate);

// router.get('/interview/:id/questions', notesController.questionCreate)

// router.get('/', notesController.questionCreate)


export { router };