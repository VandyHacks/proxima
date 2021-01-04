export enum ApplicationStatus {
  APPLIED = 'applied',
  TOINTERVIEW = 'to_interview',
  REJECTED = 'rejected'
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

export interface Application {
  id: number,
  name: string,
  email: string,
  year: string,
  director: boolean, 
  status: ApplicationStatus,
  resume_link: string
  github_link: string;
  linkedin_link: string;
  social_link: string | null;
  design_link: string | null;
  committees: CommitteeType[]
}