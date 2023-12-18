import { BaseEntity } from '../../../common/infrastructure/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'character varying', unique: true })
  email: string;

  @Column({ type: 'character varying', unique: true })
  username: string;
}
