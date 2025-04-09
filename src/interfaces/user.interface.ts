import { Model } from "sequelize";

export interface User {
  id: number;
  user_name: string;
  email: string;
  record_status: number;
}

export interface UserInstance extends Model<User>, User {}
