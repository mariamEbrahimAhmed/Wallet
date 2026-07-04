export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  hashedPassword: string;
  createdAt: Date;
  deletedAt: Date | null;
}

