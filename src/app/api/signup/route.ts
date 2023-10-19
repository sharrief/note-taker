/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import getTranslations from '@/util/getTranslations';
import registerUser from '@/queries/registerUser';

export async function POST(
  request: NextRequest,
) {
  try {
    const errors = getTranslations('errors');
    const messages = getTranslations('messages');

    /** Verify required parameters were provided */
    const body = await request.json();
    if (!body.username || !body.password) {
      return NextResponse.json({ note: undefined, error: errors('invalid-registration') });
    }

    /** Parse and validate username input */
    const validText = z.string();
    const { username: rawUsername, password: rawPassword } = body;
    const usernameParsed = validText.safeParse(rawUsername);
    if (!usernameParsed.success) {
      const { message } = fromZodError(usernameParsed.error);
      return NextResponse.json({ note: undefined, error: message });
    }
    const { data: username } = usernameParsed;

    /** Parse and validate password input */
    const passwordParsed = validText.safeParse(rawPassword);
    if (!passwordParsed.success) {
      const { message } = fromZodError(passwordParsed.error);
      return NextResponse.json({ note: undefined, error: message });
    }
    const { data: password } = passwordParsed;

    /** Register the user */
    const success = await registerUser(username, password);
    if (success) {
      return NextResponse.json({ message: messages('registration-success') });
    }
    return NextResponse.json({ error: errors('registration-exists') });
  } catch (e) {
    return NextResponse.json({ error: (e as unknown as Error).message });
  }
}
