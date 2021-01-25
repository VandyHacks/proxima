export enum ApplicationStatus {
  APPLIED = 'applied',
  TOINTERVIEW = 'to_interview',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  INREVIEW = 'in_review'
}

export enum CommitteeType {
  OPERATIONS = 'operations',
  DEVELOPMENT = 'development',
  HACKEREXPERIENCE = 'hacker experience',
  DESIGN = 'design',
  SPONSORSHIP = 'sponsorship',
  CONTENT = 'content',
  MARKETING = 'marketing'
}

export enum ClassStanding {
  FRESHMAN = 'freshman',
  SOPHOMORE = 'sophomore',
  JUNIOR = 'junior'
}

export interface ApplicationBase {
  id: string;
  year: ClassStanding;
  name: string;
  resume_link: string;
  email: string;
  committees: { id: number; committee: CommitteeType }[];
  status: ApplicationStatus;
  committee_accepted: CommitteeType;
}

export interface Application extends ApplicationBase {
  director: boolean;
  attendedVH: boolean;
  feedback: string;
  source: string;
  essay1: string;
  essay2: string;
  essay3: string;
  github_link: string;
  linkedin_link: string;
  social_link: string | null;
  design_link: string | null;
}

export interface ApplicantRow extends ApplicationBase {}

export interface InterviewResponse {
  question: string;
  description: string;
  specificity: string;
  note: string;
}

export interface Note {
  id: string;
  interviewer_name: string;
  reliability: string;
  interest: string;
  teamwork: string;
  overall: string;
  thoughts: string;
  responses: InterviewResponse[];
}

export interface ApplicantResponse {
  questionId: number;
  response: string;
  content: string;
  specificity: string;
  description: string;
}

export interface Comment {
  commenter_name: string;
  content: string;
}
