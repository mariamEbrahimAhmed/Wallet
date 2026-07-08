export interface RegisterDto {
  username: string;
  phoneNumber: string;
  password: string;
}

export interface LoginDto {
  phoneNumber: string;
  password: string;
}
