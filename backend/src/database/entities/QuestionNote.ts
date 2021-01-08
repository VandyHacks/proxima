import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Question } from "./Question";
import { Note } from "./Note";

@Entity({name: "question_notes"})
export class QuestionNote {
  @PrimaryGeneratedColumn()
  public questionNoteId!: number;

  @Column()
  public noteId!: number;

  @Column()
  public questionId!: number;

  @Column("text")
  public response: string;

  @ManyToOne(() => Question, (question) => question.questionsToNotes, {
    eager: true,
  })
  @JoinTable()
  public question!: Question;

  @ManyToOne(() => Note, (note) => note.notesToQuestions)
  public note!: Note;
}
