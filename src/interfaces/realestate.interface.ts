import { Record } from "./record.interface";

export interface RealEstateInterface extends Record {
  id: number;
  title: string;
  description: string;
  bed_rooms: number;
  bath_rooms: number;
  year_built: number;
  image: string;
  price: number;
  type_id: number;
  city_id: number;
}