declare type User = {
  email: string;
  password: string;
  id: number;
  name: string;
  isAdmin?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
};
