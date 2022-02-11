import { Model, Table, Column, DataType, Sequelize } from "sequelize-typescript";

export interface SecretsModel {
  id?: number;
  session_secret?: string;
}

@Table({ tableName: 'secrets', timestamps: false })
export class Secret extends Model<SecretsModel, SecretsModel> implements SecretsModel {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  session_secret?: string;
}