import prisma from '@/util/db';
import { promisify } from 'util';
import crypto from 'crypto';

const registerUser = async (username: string, password: string) => {
  /** Validate parameters */
  if (!username || !password) return false;

  /** Ensure the username is available. */
  const user = await prisma.user.findFirst({ select: { username: true }, where: { username } });
  if (user) return false;

  /** Hash the provided password */
  const saltBuffer = await promisify(crypto.randomBytes)(32);
  const hashedPasswordBuffer = (await promisify(crypto.pbkdf2)(Buffer
    .from(password, 'base64'), saltBuffer, 310000, 32, 'sha256'));
  const hashedPassword = hashedPasswordBuffer.toString('base64');

  /** Create the user with the provided username and hashed password */
  await prisma.user.create({
    data: {
      username, password: hashedPassword, salt: saltBuffer.toString('base64'),
    },
  });

  /** Let caller know registration was successful */
  return true;
};

export default registerUser;
