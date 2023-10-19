import prisma from '@/util/db';
import getTranslations from '@/util/getTranslations';

/**
 *
 * @param id The id to find
 * @returns {object} The note
 */
export default async function getNoteById(id: number) {
  if (typeof id !== 'number') {
    const t = getTranslations('errors');
    throw new Error(t('invalid-id'));
  }
  const note = await prisma.note.findFirst({
    where: { id },
    include: {
      tags: true,
    },
  });

  return note;
}
