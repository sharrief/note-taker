import { PrismaClient } from '@prisma/client';

/** @ignore */
const prismaClientSingleton = () => new PrismaClient();
/** @ignore */
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
/** @ignore */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
};

/** In development, NextJS rebuilds and reloads,
  * which can result in repeatedly reimporting a module
  * that establishes a new db connection on each import.
  * To mitigate this issue, we store prisma in a global during development,
  * so the existing connection can be re-used on NextJS rebuilds. See below.
  * ```
  * const prismaClientSingleton = () => new PrismaClient();
  * type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
  * const globalForPrisma = globalThis as unknown as {
  *   prisma: PrismaClientSingleton | undefined
  * };
  * if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
  * ```
  */
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
