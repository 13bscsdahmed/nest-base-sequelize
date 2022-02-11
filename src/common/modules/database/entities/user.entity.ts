import { Column, DataType, Model, Sequelize, Table } from 'sequelize-typescript';

export interface UsersModel {
  id?: number;
  first_name?: string;
  last_name?: string;
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<UsersModel, UsersModel> implements UsersModel {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER, defaultValue: Sequelize.literal("nextval('users_id_seq'::regclass)") })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  first_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  last_name?: string;
} 