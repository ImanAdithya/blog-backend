import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./Blog";

@Entity({name:"user"})
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username:string;

    @Column()
    password:string
    
    @OneToMany(() => Blog, blog => blog.user)
    blogs: Blog[];
}