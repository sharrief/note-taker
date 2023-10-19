import { DefaultSession } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';

type NoteUser = { username: string };

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession`
   * and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: NoteUser & DefaultSession['user']
  }
  interface User extends NoteUser {
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: NoteUser & DefaultSession['user']
  }
}
