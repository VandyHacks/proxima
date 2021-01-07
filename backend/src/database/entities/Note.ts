import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Application } from "./Application";
import { QuestionNote } from "./QuestionNote";

export enum Scores {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
}

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  interviewer_name: string;

  @Column({
    type: "enum",
    enum: Scores,
  })
  reliability: Scores;

  @Column({
    type: "enum",
    enum: Scores,
  })
  interest: Scores;

  @Column({
    type: "enum",
    enum: Scores,
  })
  teamwork: Scores;

  @Column({
    type: "enum",
    enum: Scores,
  })
  overall: Scores;

  @Column("text")
  thoughts: string;

  // Application foreign key
  @ManyToOne(() => Application, (application: Application) => application.notes)
  application: Application;

  @OneToMany(
    () => QuestionNote,
    (questionNote: QuestionNote) => questionNote.note
  )
  public notesToQuestions!: QuestionNote[];
}
