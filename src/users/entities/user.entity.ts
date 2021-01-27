import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  twitterId: string;

  @Column({ charset: 'utf8mb4' })
  name: string;

  @Column()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  token: string;

  @Column()
  tokenSecret: string;

  @Column({ type: 'timestamp', nullable: true })
  circleExpiresAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}