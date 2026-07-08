import type { UserService } from "./user.service";
import type { RegisterDto, LoginDto } from "../dtos/auth.dto";
import type { User } from "../models";
import { AuthenticationError } from "../errors";
import { comparePassword } from "../utils";

export function createAuthService(deps: { userService: UserService }) {
  const { userService } = deps;

  return {
    async register(input: RegisterDto): Promise<User> {
      return userService.registerUser(input);
    },

    async login(input: LoginDto): Promise<User> {
      const user = await userService.getUserByPhoneNumber(input.phoneNumber);
      if (!user) {
        throw new AuthenticationError("Wrong phone number or password");
      }

      const isPasswordValid = await comparePassword(input.password, user.hashedPassword);
      if (!isPasswordValid) {
        throw new AuthenticationError("Wrong phone number or password");
      }

      return user;
    },
  };
}

export type AuthService = ReturnType<typeof createAuthService>;
