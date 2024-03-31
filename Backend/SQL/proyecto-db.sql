-- Table: public.Estadisticas

-- DROP TABLE IF EXISTS public."Estadisticas";

CREATE TABLE IF NOT EXISTS public."Estadisticas"
(
    id integer NOT NULL,
    hp integer NOT NULL,
    atk integer NOT NULL,
    def integer NOT NULL,
    satk integer NOT NULL,
    sdef integer NOT NULL,
    spd integer NOT NULL,
    CONSTRAINT "Estadisticas_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Estadisticas"
    OWNER to postgres;
	
-- Table: public.Pokemones

-- DROP TABLE IF EXISTS public."Pokemones";

CREATE TABLE IF NOT EXISTS public."Pokemones"
(
    id integer NOT NULL,
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    foto character varying COLLATE pg_catalog."default" NOT NULL,
    peso double precision NOT NULL,
    altura double precision NOT NULL,
    habilidades character varying[] COLLATE pg_catalog."default" NOT NULL,
    descripcion character varying COLLATE pg_catalog."default" NOT NULL,
    tipos integer[] NOT NULL,
    CONSTRAINT "Pokemones_pkey" PRIMARY KEY (id),
    CONSTRAINT fk_estadistica FOREIGN KEY (id)
        REFERENCES public."Estadisticas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Pokemones"
    OWNER to postgres;
	
-- Table: public.Usuarios

-- DROP TABLE IF EXISTS public."Usuarios";

CREATE TABLE IF NOT EXISTS public."Usuarios"
(
    id integer NOT NULL,
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    correo character varying COLLATE pg_catalog."default" NOT NULL,
    clave character varying COLLATE pg_catalog."default" NOT NULL,
    permisos integer NOT NULL,
    CONSTRAINT "Usuarios_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Usuarios"
    OWNER to postgres;
	
-- Table: public.Tipos

-- DROP TABLE IF EXISTS public."Tipos";

CREATE TABLE IF NOT EXISTS public."Tipos"
(
    id integer NOT NULL,
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Tipos_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Tipos"
    OWNER to postgres;
	