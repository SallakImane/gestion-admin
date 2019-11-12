import {Work} from "./work";
import {Address} from "./address";

export class UserModel {
  firstName :string;
  lastName :string;
  phone :string;
  email :string;
  work :Work;
  country:string;
  city:string;
  state:string;
  zipCode:string;
  address:Address;
}
