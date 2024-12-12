import { Request } from "express";

export interface RequestWithUser extends Request {
  user_email?: string;
}

export interface DataStoredInToken {
  user_email: string;
}
