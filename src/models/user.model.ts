export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  hashedPassword: string;
  createdAt: Date;
  deletedAt: Date | null;
  totpSecret: string | null;
}

