import prisma from '@/util/db';

export default async function getNotes(cursor?: number) {
  const notes = await prisma.note.findMany({
    take: 6,
    skip: cursor == null ? 0 : 1,
    cursor: cursor == null ? undefined : {
      id: cursor,
    },
    include: {
      tag: true,
    },
    where: {
      userId: 1,
    },
    orderBy: { id: 'asc' },
  });
  const lastId = notes[notes.length - 1].id;
  const remaining = await prisma.note.count({
    where: {
      id: lastId ? { gt: notes[notes.length - 1].id } : undefined,
      userId: 1,
    },
    orderBy: { id: 'asc' },
  });
  return { notes, remaining };
}
