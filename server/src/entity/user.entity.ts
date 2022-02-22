import * as bcrypt from "bcryptjs";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Entity()
export class User {
  public constructor(user?: Partial<User>) {
    if (user) {
      Object.assign(this, user);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type    : "simple-enum",
    enum    : UserRole,
    default : UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn({ name: "date_created" })
  createDate: Date;

  @UpdateDateColumn({ name: "date_updated" })
  updateDate: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
