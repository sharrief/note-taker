import prisma from '@/util/db';
import { Prisma } from '@prisma/client';
import _getNotesByCursor from './getNotesByCursor';

// Arrange
jest.mock('@/util/db', () => ({
  note: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
}));

const userId = 9;
const mockNotesData: (Prisma.noteGetPayload<{}>)[] = [
  {
    id: 1, text: 'first note', text_json: null, userId,
  },
  {
    id: 2, text: 'second note', text_json: null, userId,
  },
  {
    id: 3, text: 'third note', text_json: null, userId,
  },
  {
    id: 4, text: 'fourth note', text_json: null, userId,
  },
  {
    id: 5, text: 'fifth note', text_json: null, userId,
  },
];
const mockPrisma = jest.mocked(prisma);

beforeEach(() => {
  mockPrisma.note.findMany.mockResolvedValue(mockNotesData);
  mockPrisma.note.count.mockResolvedValue(mockNotesData.length);
});
afterEach(() => {
  mockPrisma.note.findMany.mockReset();
  mockPrisma.note.count.mockReset();
});

const getNotesByCursor = (cursor?: number) => _getNotesByCursor(userId, cursor);

describe('when getNotes is called', () => {
  it('returns no notes if none exist', async () => {
    mockPrisma.note.findMany.mockResolvedValueOnce([]);
    mockPrisma.note.count.mockResolvedValueOnce(0);
    // ACT
    const { notes, remaining } = await getNotesByCursor();
    // Assert
    expect(notes.length).toBe(0);
    expect(remaining).toBe(0);
  });
  it('shows only notes for the session user', async () => {
    // Act
    const { notes } = await getNotesByCursor();
    // Assert
    expect(mockPrisma.note.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId },
    }));
    expect(notes[0]).toEqual(expect.objectContaining({ ...mockNotesData[0], text_json: 'null' }));
  });
  it('without a cursor, it returns all notes', async () => {
    // Act
    const { notes } = await getNotesByCursor();
    // Assert
    expect(mockPrisma.note.findMany).toHaveBeenCalledWith(expect.objectContaining({
      take: 6,
      skip: 0,
      cursor: undefined,
      orderBy: expect.objectContaining({ id: 'desc' }),
    }));
    expect(notes.map((n) => ({ ...n, text_json: JSON.parse(n.text_json) }))).toEqual(mockNotesData);
  });
  it('with a cursor, it returns notes from that cursor and later', async () => {
    const cursor = 3;
    // Act
    const { notes } = await getNotesByCursor(cursor);
    // Assert
    expect(mockPrisma.note.findMany).toHaveBeenCalledWith(expect.objectContaining({
      take: 6,
      skip: 1,
      cursor: expect.objectContaining({ id: cursor }),
      orderBy: expect.objectContaining({ id: 'desc' }),
    }));
    expect(notes.map((n) => ({ ...n, text_json: JSON.parse(n.text_json) }))).toEqual(mockNotesData);
  });
  it('returns the number of notes in later pages', async () => {
    // Act
    const { remaining } = await getNotesByCursor();
    // Assert
    expect(mockPrisma.note.count).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        id: expect.objectContaining({ lt: mockNotesData[mockNotesData.length - 1].id }),
      }),
      orderBy: expect.objectContaining({
        id: 'desc',
      }),
    }));
    expect(remaining).toBe(mockNotesData.length);
  });
});
