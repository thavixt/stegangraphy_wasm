-- user table
CREATE TABLE "user" (
  "id" serial NOT NULL,
  PRIMARY KEY ("id"),
  "username" text NOT NULL,
  "name" text NOT NULL,
  created timestamptz NOT NULL DEFAULT now(),
  updated timestamptz NOT NULL DEFAULT now(),
  "data" json NOT NULL
)
