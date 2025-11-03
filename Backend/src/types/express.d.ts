import { IUser } from '../models/userModel';

declare global {     // Deeta lägger till ett eget Express-request "req.user". Så jag kan tilldela och använda den i authmiddlewear utan att TS visar fel-meddelande.
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
