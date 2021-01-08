import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Application } from "./Application";

export enum CommitteeType {
  OPERATIONS = "operations",
  DEVELOPMENT = "development",
  HACKEREXPERIENCE = "hacker experience",
  DESIGN = "design",
  SPONSORSHIP = "sponsorship",
  CONTENT = "content",
  MARKETING = "marketing",
}

@Entity({name: "committee_choices"})
export class CommitteeChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: CommitteeType,
  })
  committee: CommitteeType;

  @Column({ nullable: true })
  applicationId: number;

  @ManyToOne(
    () => Application,
    (application: Application) => application.committees
  )
  application: Application;
}
