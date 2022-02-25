import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'goings_on' })
export class GoingsOnEntity {
  @PrimaryColumn({ name: 'id_goings_on' })
  idGoingsOn: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'date' })
  date: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;
}
