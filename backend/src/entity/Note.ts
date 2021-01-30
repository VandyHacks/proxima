import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable
} from 'typeorm';
import { Application } from './Application';
import { QuestionNote } from './QuestionNote';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  interviewer_name: string;

  @Column('decimal')
  reliability: number;

  @Column('decimal')
  interest: number;

  @Column('decimal')
  teamwork: number;

  @Column('decimal')
  overall: number;

  @Column('text')
  thoughts: string;

  @Column({
    nullable: true
  })
  applicationId: number;

  @ManyToOne(
    () => Application,
    (application: Application) => application.notes,
    {
      eager: true
    }
  )
  @JoinTable()
  application: Application;

  @OneToMany(
    () => QuestionNote,
    (questionNote: QuestionNote) => questionNote.note,
    {
      eager: true
    }
  )
  @JoinTable()
  public notesToQuestions!: QuestionNote[];
}
