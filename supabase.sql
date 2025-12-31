-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.messages (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  room_id bigint NOT NULL DEFAULT '1'::bigint,
  username text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES public.rooms(id)
);
CREATE TABLE public.rooms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT rooms_pkey PRIMARY KEY (id)
);