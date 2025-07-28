import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';



@Entity({ name: 'blog' })
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, user => user.blogs, { eager: true, onDelete: 'CASCADE' })
  user: User;
}
