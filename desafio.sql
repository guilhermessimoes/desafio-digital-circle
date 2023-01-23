-- Table: public.tb01

-- DROP TABLE IF EXISTS public.tb01;

CREATE TABLE IF NOT EXISTS public.tb01
(
    col_text text COLLATE pg_catalog."default" NOT NULL,
    col_dt timestamp(3) without time zone NOT NULL,
    id integer NOT NULL DEFAULT nextval('tb01_id_seq'::regclass),
    CONSTRAINT tb01_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tb01
    OWNER to postgres;