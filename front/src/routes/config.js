import Applicants from '../routes/ApplicantsPage.svelte';
import Applicant from '../routes/ApplicantsPage.svelte';
// import NotFound from '~/routes/NotFound.svelte';

export const routes = [
  {
    path: '/',
    component: () => import('../routes/ApplicantsPage.svelte')
  },
  {
    path: '/applicants/:applicantid',
    component: () => import('../routes/ApplicantPage.svelte')
  }
  // {
  //   path: '*',
  //   component: NotFound
  // }
];
