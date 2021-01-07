import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ClassStanding {
  FRESHMAN = 'freshman',
  SOPHOMORE = 'sophomore',
  JUNIOR = 'junior',
}

export enum AcceptedCommitteeType {
  OPERATIONS = 'operations',
  DEVELOPMENT = 'development',
  HACKEREXPERIENCE = 'hacker experience',
  DESIGN = 'design',
  SPONSORSHIP = 'sponsorship',
  CONTENT = 'content',
  MARKETING = 'marketing',
  UNDECIDED = 'undecided',
}

export enum ApplicationStatus {
  APPLIED = 'applied',
  TOINTERVIEW = 'to_interview',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  INREVIEW = 'in_review',
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ClassStanding,
  })
  year: ClassStanding;

  @Column()
  director: boolean;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: 'applied',
  })
  status: ApplicationStatus;

  @Column('text')
  essay1: string;

  @Column('text')
  essay2: string;

  @Column('text')
  essay3: string;

  @Column({
    nullable: true,
  })
  resume_link: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  commitments: string;

  @Column()
  attendedVH: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  feedback: string;

  @Column({
    nullable: true,
  })
  github_link: string;

  @Column({
    nullable: true,
  })
  linkedin_link: string;

  @Column({
    nullable: true,
  })
  social_link: string;

  @Column({
    nullable: true,
  })
  design_link: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  source: string;

  @Column({
    type: 'enum',
    enum: AcceptedCommitteeType,
    default: 'undecided',
  })
  committee_accepted: AcceptedCommitteeType;
}
