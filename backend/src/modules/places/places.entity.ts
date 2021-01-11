import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Places')
export class Places extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: string;

  @Column({ name: 'Country' })
  country: string;

  @Column({ name: 'Place' })
  place: string;

  @Column({ name: 'Month' })
  month: number;

  @Column({ name: 'Year' })
  year: number;

  @Column({ name: 'Icon' })
  iconUrl: string;

  @Column({ name: 'CreatedIn' })
  created: Date;

  @Column({ name: 'UpdatedIn' })
  updated: Date;
}
