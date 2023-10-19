'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

export default function SignInOut() {
  return (
    <li><button type="button" onClick={() => signOut({ callbackUrl: '/api/auth/signin' })}>Logout</button></li>
  );
}
