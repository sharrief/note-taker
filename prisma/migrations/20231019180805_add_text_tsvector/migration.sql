-- This is an empty migration.
ALTER TABLE "note" ADD COLUMN "text_tsvector" tsvector GENERATED ALWAYS AS (to_tsvector('english', text)) STORED;