import prisma from '@/util/db';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const validText = z.string().min(20).max(300);
export default async function POST(req: Request) {
  try {
    const { text: rawInput } = await req.json();
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
    return Response.json(createdNote);
  } catch (e) {
    return Response.json({ error: (e as unknown as Error).message });
  }
}
