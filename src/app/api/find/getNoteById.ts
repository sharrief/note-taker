import getTranslator from '@/app/i18n';
import prisma from '@/util/db';

/**
 *
 * @param id The id to find
 * @returns {object} The note
 */
export default async function getNotesById(id: number) {
  if (typeof id !== 'number') {
    const { t } = await getTranslator('en', 'errors');
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
