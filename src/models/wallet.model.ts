export interface Wallet {
  id: string;
  userId: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
