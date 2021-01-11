-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-01-08 17:18:44.374


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";;

-- tables
-- Table: Places
CREATE TABLE "Places" (
    "Id" uuid  NOT NULL DEFAULT uuid_generate_v4(),
    "Country" varchar(50)  NOT NULL,
    "Place" varchar(200)  NOT NULL,
    "Month" int  NOT NULL,
    "Year" int  NOT NULL,
    "Icon" varchar(300)  NOT NULL,
    "CreatedIn" date  NOT NULL,
    "UpdatedIn" date  NOT NULL,
    CONSTRAINT "Places_Unique" UNIQUE ("Country", "Place") NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT "id" PRIMARY KEY ("Id")
);

COMMENT ON TABLE "Places" IS 'Tabela que irá armazenar todos os dados do desafio';

-- End of file.

