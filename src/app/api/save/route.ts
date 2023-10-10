import prisma from '@/util/db';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const validText = z.string().min(20).max(300);

/**
 * The expected request body structure for POSTs requests to the save note api
 */
export interface SavePOSTRequestBody {
  text: string;
}

/** The expected structure for the response for calls to the save note api */
export type SavePOSTResponse = {
  note: Prisma.noteGetPayload<{}>,
  error: undefined
} | {
  note: undefined,
  error: string
};

/**
 * Creates a note from the text provided in the request body
 * @param request The request containing form data of the shape {@link SavePOSTRequestBody}
 * @returns A Response with JSON containing created note or an object containing an error message
 */
export async function POST(
  request: NextApiRequest,
  response: NextApiResponse<SavePOSTResponse>,
) {
  try {
    const { text: rawInput } = request.body;
    const result = validText.safeParse(rawInput);
    if (!result.success) {
      const { message } = fromZodError(result.error);
      return Response.json({ error: message });
    }
    const { data: text } = result;
    const createdNote = await prisma.note.create({
      data: {
        text,
      },
    });
    return response.json({ note: createdNote, error: undefined });
  } catch (e) {
    return response.json({ note: undefined, error: (e as unknown as Error).message });
  }
}
