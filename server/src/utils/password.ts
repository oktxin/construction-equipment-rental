import bcrypt from "bcrypt";

import { env } from "../config/env";

export function hashPassword(password: string) {
  return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
}

export function comparePasswords(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
