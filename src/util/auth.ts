import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/util/db';
import { getServerSession } from 'next-auth/next';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

const findUserByCredentials = async (username: string, password: string) => {
  const user = await prisma.user.findFirst({
    select: { id: true, username: true },
    where: { username, password },
  });
  if (!user) return null;
  return { id: `${user.id}`, username: user.username };
};

export const config = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'your credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'enter your username' },
        password: { label: 'Password', type: 'password', placeholder: 'enter your password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;
        const user = await findUserByCredentials(credentials.username, credentials.password);
        if (!user) return null;
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.user = user;
      }
      return token;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config);
}
