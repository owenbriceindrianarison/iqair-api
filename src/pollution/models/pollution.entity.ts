import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pollution')
export class Pollution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ type: 'timestamptz' })
  ts: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  aqius: number;

  @Column()
  mainus: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  aqicn: number;

  @Column()
  maincn: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
