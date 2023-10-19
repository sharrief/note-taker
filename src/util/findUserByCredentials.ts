import prisma from '@/util/db';
import { promisify } from 'util';
import crypto from 'crypto';

/**
 * Finds the user matching the provided username and password
 * @param {string} username The username of the user to sign in
 * @param {string} password The password of the user to sign in
 * @returns {object|null} The user if authentication was successful, null otherwise.
 */
const findUserByCredentials = async (username: string, password: string) => {
  /** Presume caller has sanitized the input */
  /** Select the user matching the username */
  const user = await prisma.user
    .findFirst({
      select: {
        id: true, username: true, password: true, salt: true,
      },
      where: { username },
    });

  /** If no user has that username, authentication fails */
  if (!user
    || user.salt == null
    || user.password == null) return null;

  /** Hash the provided user password */
  const hashedPassword = (await promisify(crypto.pbkdf2)(Buffer
    .from(password, 'base64'), Buffer.from(user.salt, 'base64'), 310000, 32, 'sha256')).toString('base64');
  const passwordMatches = user.password === hashedPassword;

  /** If provided password hash matched saved user password hash, return the user */
  if (passwordMatches) {
    return { id: `${user.id}`, username: user.username };
  }
  /** Password doesn't match saved password. Authentication fails */
  return null;
};

export default findUserByCredentials;
