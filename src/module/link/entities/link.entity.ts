import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'links' })
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link_original: string;

  @Column()
  link_short: string;

  @Column()
  created_at: string;
}