import * as Router from 'koa-router';

import * as notesController from '../controllers/notesController';

const router = new Router({
  prefix: '/api/v1/questions'
});

// Add questions to interview question list
router.post('/', notesController.questionCreate);

// Fetch all questions
router.get('/', notesController.getAllQuestions);

// Delete question
router.delete('/:questionId', notesController.deleteQuestion);

export default router.routes();
