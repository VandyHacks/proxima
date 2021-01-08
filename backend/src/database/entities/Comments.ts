import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Application } from "./Application";

@Entity({name: "comments"})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commenter_name: string;

  @Column("text")
  content: string;

  @Column({
    nullable: true,
  })
  applicationId: number;

  // Application foreign key
  @ManyToOne(
    () => Application,
    (application: Application) => application.comments
  )
  application: Application;
}
