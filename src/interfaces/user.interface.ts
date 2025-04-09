import { Record } from "./record.interface";

export interface UserInterface extends Record{
  id: number;
  name: string;
  record_status: number;
}

