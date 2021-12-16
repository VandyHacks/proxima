import Applicants from '../routes/ApplicantsPage.svelte';
import Applicant from '../routes/ApplicantsPage.svelte';
import NotesSubmission from '../routes/NotesSubmission.svelte';
import QuestionsPage from '../routes/QuestionsPage.svelte';
// import NotFound from '~/routes/NotFound.svelte';

export const routes = [
  {
    path: '/',
    component: () => import('../routes/ApplicantsPage.svelte')
  },
  {
    path: '/applicants/:applicantid',
    component: () => import('../routes/ApplicantPage.svelte')
  },
  {
    path: '/applicants/:applicantid/notes',
    component: () => import('../routes/NotesSubmission.svelte')
  },
  {
    path: '/questions',
    component: () => import('../routes/QuestionsPage.svelte')
  }
  // {
  //   path: '*',
  //   component: NotFound
  // }
];
