import { env } from 'process';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/util/db';
import { POST } from '@/app/api/save/route';
import { Prisma } from '@prisma/client';

// Arrange
jest.mock('@/util/db', () => ({
  note: {
    create: jest.fn(),
  },
}));
const mockPrisma = jest.mocked(prisma);

const minLength = +env.NEXT_PUBLIC_OPTION_NOTE_MIN_LENGTH;
const maxLength = +env.NEXT_PUBLIC_OPTION_NOTE_MAX_LENGTH;
const genText = (length: number) => (new Array(Math.floor(length)).fill('x').join(''));
const getRequest = (text: any) => ({
  json: async () => (text == null ? {} : { text, text_json: JSON.stringify({ text }) }),
}) as unknown as NextRequest;
jest.mock('next/server');
const mockResponseJson = jest.spyOn(NextResponse, 'json');

afterEach(() => {
  jest.resetAllMocks();
  mockPrisma.note.create.mockRestore();
});

describe('POST', () => {
  it.each<[string, any, string]>([
    ['no text property', null, 'Invalid note'],
    ['non-string text', 5, ''],
    ['text.len == 0', '', ''],
    ['text.len < min', genText(Math.max(minLength - 1, 0)), ''],
    ['text.len > max', genText(maxLength + 1), ''],
  ])('returns errors if called with %s', async (_label, text, expectedError) => {
    // Act
    await POST(getRequest(text));
    // Assert
    expect(mockPrisma.note.create).not.toHaveBeenCalled();
    expect(mockResponseJson).toHaveBeenCalledWith(({
      error: expect.stringContaining(expectedError ?? 'error'),
      note: undefined,
    }));
  });
  it('returns caught errors', async () => {
    // Arrange
    const error = 'Internal error';
    mockPrisma.note.create.mockRejectedValueOnce({ message: error });
    // Act
    await POST(getRequest(genText(Math.max(minLength, 0))));
    // Assert
    expect(mockPrisma.note.create).toHaveBeenCalled();
    expect(mockResponseJson).toHaveBeenCalledWith(expect.objectContaining({
      note: undefined,
      error,
    }));
  });
  it('creates and returns the note', async () => {
    // Arrange
    const mockNote = {} as Prisma.noteGetPayload<{}>;
    mockPrisma.note.create.mockResolvedValueOnce(mockNote);
    const text = genText(Math.max(minLength, 0));
    // Act
    await POST(getRequest(text));
    // Assert
    expect(mockPrisma.note.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ text }),
    }));
    expect(mockResponseJson).toHaveBeenCalledWith(expect.objectContaining({
      error: undefined,
      note: mockNote,
    }));
  });
});
