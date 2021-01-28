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

  @Column('float')
  reliability: number;

  @Column('float')
  interest: number;

  @Column('float')
  teamwork: number;

  @Column('float')
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
