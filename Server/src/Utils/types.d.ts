declare namespace Express {
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean | null;
    createdAt: Date | null;
    modifiedAt: Date | null;
  }
}

declare type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean | null;
  createdAt: Date | null;
  modifiedAt: Date | null;
};
