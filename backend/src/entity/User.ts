import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique(["id"])
export class User {

  @PrimaryColumn()
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  displayName: string;

  @Column('text')
  avatar: string;
}
