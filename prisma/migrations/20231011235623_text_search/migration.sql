-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateTable
CREATE TABLE "note" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(300) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR,
    "salt" VARCHAR,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_noteTotag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
ALTER TABLE "note" ADD COLUMN "text_tsvector" tsvector GENERATED ALWAYS AS (to_tsvector('english', text)) STORED;

-- CreateIndex
CREATE UNIQUE INDEX "_noteTotag_AB_unique" ON "_noteTotag"("A", "B");

-- CreateIndex
CREATE INDEX "_noteTotag_B_index" ON "_noteTotag"("B");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_noteTotag" ADD CONSTRAINT "_noteTotag_A_fkey" FOREIGN KEY ("A") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_noteTotag" ADD CONSTRAINT "_noteTotag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

