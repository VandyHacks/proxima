import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { QuestionNote } from "./QuestionNote";

export enum QuestionSpecificity {
  OPERATIONS = "operations",
  DEVELOPMENT = "development",
  HACKEREXPERIENCE = "hacker experience",
  DESIGN = "design",
  SPONSORSHIP = "sponsorship",
  CONTENT = "content",
  MARKETING = "marketing",
  GENERAL = "general",
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @Column("text")
  description: string;

  @Column({
    type: "enum",
    enum: QuestionSpecificity,
    default: QuestionSpecificity.GENERAL,
  })
  specificity: QuestionSpecificity;

  @OneToMany(
    () => QuestionNote,
    (questionNote: QuestionNote) => questionNote.question
  )
  public questionsToNotes!: QuestionNote[];
}
