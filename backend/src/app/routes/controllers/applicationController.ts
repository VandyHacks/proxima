import * as Koa from "koa";

import { getRepository, Repository } from "typeorm";
import {
  AcceptedCommitteeType,
  Application,
  ApplicationStatus,
} from "../../../database/entities/Application";
import {
  CommitteeChoice,
  CommitteeType,
} from "../../../database/entities/CommitteeChoice";

import { send } from "../../utils/smtpClient";
import { getNotes, getComments } from "./notesController";

/**
 * Parsing is very specific to the kind of form we have right now.
 * For exampl, I am getting 'freshman', 'sophomore', etc. by splitting
 * the year field in the TypeForm. TODO: add typeform entries as a table
 * and generalize the parsing.
 * @param {request, response}
 */
const parseTypeForm = async ({ request, response }: Koa.Context) => {
  // populate application
  const application:
    | {
        form_response: { definition: { fields: any[] }; answers: any };
      }
    | any = request.body;
  let responses: any = {};
  let committees: CommitteeType[];

  application.form_response.answers.forEach((answer: any) => {
    // Map field reference name (set in TypeForm) to the response
    if (answer.field.ref === "year") {
      responses["year"] = answer.choice.label.split(" ")[0].toLowerCase();
    } else if (answer.field.ref === "committees") {
      committees = answer.choices.labels.map((c: string) => c.toLowerCase());
    } else {
      responses[answer.field.ref] = answer[answer.type];
    }
  });

  // Application repository
  const applicationRepo: Repository<Application> = getRepository(Application);

  const newApplication: Application = applicationRepo.create({
    name: `${responses.firstName} ${responses.lastName}`,
    email: responses.email,
    year: responses.year,
    director: responses.director,
    status: ApplicationStatus.APPLIED,
    essay1: responses.essay1,
    essay2: responses.essay2,
    essay3: responses.essay3,
    resume_link: responses.resume_link,
    commitments: responses.commitments,
    attendedVH: responses.attendedVH,
    feedback: responses.feedback,
    github_link: responses.github_link,
    linkedin_link: responses.linkedin_link,
    social_link: responses.social_link,
    design_link: responses.design_link,
    source: responses.source,
    committee_accepted: AcceptedCommitteeType.UNDECIDED,
  });

  await applicationRepo.save(newApplication);

  // Committee choice repository
  const committeeChoiceRepo: Repository<CommitteeChoice> = getRepository(
    CommitteeChoice
  );

  // Create committee relations for an applicant
  committees.forEach((committee) => {
    const committeeChoice: CommitteeChoice = committeeChoiceRepo.create({
      committee: committee,
      application: newApplication,
    });

    committeeChoiceRepo.save(committeeChoice);
  });

  response.body = "Submission received!";
};

/**
 * Display all applications for the grid on the main page.
 * Resulting format of data in response:
 * [{
 *  id: number,
 *  name: string,
 *  email: string,
 *  year: string,
 *  director: bool,
 *  status: string,
 *  resume_link: string,
 *  committee_accepted: string
 * }]
 * @param {response}
 */
const displayApplications = async ({ response }: Koa.Context) => {
  // Application repository
  const applicationRepo: Repository<Application> = getRepository(Application);

  // Load applications with committees specified
  const applications: any[] = await applicationRepo.find({
    relations: ["committees"],
  });

  response.body = applications;
};

/**
 * Helper method that gets application responses, populated by the TypeForm webhook.
 * Return:
 *   {
 *    name: string,
 *    email: string,
 *    year: string,
 *    director: boolean,
 *    status: string,
 *    essay1: string,
 *    essay2: string,
 *    essay3: string,
 *    commitments: string,
 *    attendedVH: boolean,
 *    feedback: string,
 *    source: string
 *    resume_link: string | null,
 *    github_link: string | null,
 *    linkedin_link: string | null,
 *    social_link: string | null,
 *    design_link: string | null,
 *    committee_accepted: string | null,
 *    committees: string[],
 *   }
 * @param applicationId
 */
const getApplicationResponse = async (applicationId: number) => {
  // Application repository
  const applicationRepo: Repository<Application> = getRepository(Application);

  let application: any = await Application.select(
    "name",
    "email",
    "year",
    "director",
    "status",
    "essay1",
    "essay2",
    "essay3",
    "commitments",
    "attendedVH",
    "feedback",
    "source",
    "resume_link",
    "github_link",
    "linkedin_link",
    "social_link",
    "design_link",
    "committee_accepted"
  ).find(applicationId);

  application.committees = [];
  let committees = (await CommitteeChoice.select("committee")
    .where("applicationId", applicationId as number)
    .get()) as Model[];
  for (let committeeObj of committees) {
    application.committees.push(committeeObj.committee);
  }

  return application;
};

/**
 * body: number, representing applicationId
 * response:
 * {
 *  application: {
 *    name: string,
 *    email: string,
 *    year: string,
 *    director: boolean,
 *    status: string,
 *    essay1: string,
 *    essay2: string,
 *    essay3: string,
 *    commitments: string,
 *    attendedVH: boolean,
 *    feedback: string,
 *    source: string
 *    resume_link: string | null,
 *    github_link: string | null,
 *    linkedin_link: string | null,
 *    social_link: string | null,
 *    design_link: string | null,
 *    committee_accepted: string | null,
 *    committees: string[],
 *   },
 *  notes:
 *   [{
 *    interviewer_name: string,
 *    reliability: number [1-7],
 *    interest: number [1-7],
 *    teamwork: number [1-7],
 *    overall: number [1-7],
 *    thoughts: string,
 *    responses: [{question: string, description: string, specificity: string, note: string}]
 *   }],
 *  comments: [{commenter_name: string, content: string}]
 *  }
 */
const getApplicantData = async ({ params, response }: Koa.Context) => {
  const applicationId: number = (params.applicationId as unknown) as number;

  response.body = {
    application: await getApplicationResponse(applicationId),
    notes: await getNotes(applicationId),
    comments: await getComments(applicationId),
  };
};

/**
 * Send email based on status update.
 */
const sendEmail = async (email: string, status: string, committee?: string) => {
  let emailMessage: string;
  if (status === "accepted") {
    emailMessage = `Congratualations! You are accepted to ${committee} committee!`;
  } else if (status === "rejected") {
    emailMessage =
      "Unfortunately, we were not able to extend the position on VH boar to you.";
  } else if (status === "to_interview") {
    emailMessage = "Hey! Let's talk tomorrow 2pm CST.";
  } else {
    console.log(
      "Wrong status passed to sending emails. We have no emails for this case."
    );
    return;
  }

  send(email, "VandyHacks Board Decision", emailMessage);
};

/**
 * ApplicationID and new status are sent in the body.
 * body: {status: string, committee?: string}
 */
const updateStatus = async ({ params, request, response }: Koa.Context) => {
  const body: { status: string; committee?: string } = await request.body()
    .value;
  const applicationId = (params.applicationId as unknown) as number;
  const newStatus: string = body.status;
  const committee: string | undefined = body.committee;

  // Get application to update
  const application: Model = await Application.select(
    "id",
    "status",
    "email"
  ).find(applicationId);

  // Logic for emails
  sendEmail(application.email as string, newStatus);

  // Update status
  application.status = newStatus;

  // Update committees if accepted
  if (newStatus === "accepted") {
    application.committee_accepted = committee as string;
  }

  await application.update();

  response.body = `Successfully updated ${application.email} with new status: ${newStatus}`;
};

export { parseTypeForm, displayApplications, updateStatus, getApplicantData };
