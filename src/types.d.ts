import { IUser } from "./utils/types";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      admin: IAdmin;
      ipAddress: any
    }
  }
}
