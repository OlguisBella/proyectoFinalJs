--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

-- Started on 2019-01-28 20:19:01 -05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 198 (class 1259 OID 16797)
-- Name: Avatar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Avatar" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Avatar" OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16795)
-- Name: Avatar_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Avatar_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Avatar_id_seq" OWNER TO postgres;

--
-- TOC entry 3002 (class 0 OID 0)
-- Dependencies: 197
-- Name: Avatar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Avatar_id_seq" OWNED BY public."Avatar".id;


--
-- TOC entry 202 (class 1259 OID 16821)
-- Name: Carta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Carta" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Carta" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16819)
-- Name: Carta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Carta_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Carta_id_seq" OWNER TO postgres;

--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 201
-- Name: Carta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Carta_id_seq" OWNED BY public."Carta".id;


--
-- TOC entry 200 (class 1259 OID 16808)
-- Name: Jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Jugador" (
    id integer NOT NULL,
    puntaje character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "avatarId" integer
);


ALTER TABLE public."Jugador" OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16806)
-- Name: Jugador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Jugador_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Jugador_id_seq" OWNER TO postgres;

--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 199
-- Name: Jugador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Jugador_id_seq" OWNED BY public."Jugador".id;


--
-- TOC entry 196 (class 1259 OID 16790)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16832)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    pass character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16830)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 3005 (class 0 OID 0)
-- Dependencies: 203
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 2851 (class 2604 OID 16800)
-- Name: Avatar id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Avatar" ALTER COLUMN id SET DEFAULT nextval('public."Avatar_id_seq"'::regclass);


--
-- TOC entry 2853 (class 2604 OID 16824)
-- Name: Carta id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Carta" ALTER COLUMN id SET DEFAULT nextval('public."Carta_id_seq"'::regclass);


--
-- TOC entry 2852 (class 2604 OID 16811)
-- Name: Jugador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Jugador" ALTER COLUMN id SET DEFAULT nextval('public."Jugador_id_seq"'::regclass);


--
-- TOC entry 2854 (class 2604 OID 16835)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 2989 (class 0 OID 16797)
-- Dependencies: 198
-- Data for Name: Avatar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Avatar" (id, nombre, url, "createdAt", "updatedAt") FROM stdin;
5	niñaAv1	./images/AVATAR/niñaAv1-id5.png	2019-01-28 18:23:37.648-05	2019-01-28 18:23:37.765-05
6	niñaAv2	./images/AVATAR/niñaAv2-id6.png	2019-01-28 18:24:00.617-05	2019-01-28 18:24:00.673-05
8	niñoAv2	./images/AVATAR/niñoAv2-id8.png	2019-01-28 19:52:34.028-05	2019-01-28 19:52:34.11-05
9	niñoAv2	./images/AVATAR/niñoAv3-id9.png	2019-01-28 19:54:11.768-05	2019-01-28 19:54:11.845-05
\.


--
-- TOC entry 2993 (class 0 OID 16821)
-- Dependencies: 202
-- Data for Name: Carta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Carta" (id, nombre, url, "createdAt", "updatedAt") FROM stdin;
32	cerdito	./images/ANIMALITOS/cerdito-id32.png	2019-01-28 17:52:18.21-05	2019-01-28 17:52:18.264-05
33	conejo	./images/ANIMALITOS/conejo-id33.png	2019-01-28 17:59:44.504-05	2019-01-28 17:59:44.563-05
34	Mickey	./images/ANIMALITOS/MIKAELA 2-id34.png	2019-01-28 18:35:52.877-05	2019-01-28 18:35:52.94-05
35	niñoAv1	./images/ANIMALITOS/niñoAv1-id35.png	2019-01-28 19:15:53.761-05	2019-01-28 19:15:53.822-05
36	Mickey	./images/ANIMALITOS/GGJ2018-id36.jpg	2019-01-28 19:17:05.752-05	2019-01-28 19:17:05.898-05
37	Gallito	./images/ANIMALITOS/gallito-id37.png	2019-01-28 19:54:58.846-05	2019-01-28 19:54:58.95-05
\.


--
-- TOC entry 2991 (class 0 OID 16808)
-- Dependencies: 200
-- Data for Name: Jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Jugador" (id, puntaje, "createdAt", "updatedAt", "avatarId") FROM stdin;
\.


--
-- TOC entry 2987 (class 0 OID 16790)
-- Dependencies: 196
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20190126223517-create-avatar.js
20190126223531-create-jugador.js
20190126223542-create-carta.js
20190127015845-create-user.js
\.


--
-- TOC entry 2995 (class 0 OID 16832)
-- Dependencies: 204
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, nombre, username, pass, "createdAt", "updatedAt") FROM stdin;
1	admin	hola	1234	2019-01-27 01:05:51.992-05	2019-01-27 01:05:51.992-05
2	administrador	admin	abcd	2019-01-27 12:56:07.13-05	2019-01-27 13:28:09.583-05
\.


--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 197
-- Name: Avatar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Avatar_id_seq"', 9, true);


--
-- TOC entry 3007 (class 0 OID 0)
-- Dependencies: 201
-- Name: Carta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Carta_id_seq"', 37, true);


--
-- TOC entry 3008 (class 0 OID 0)
-- Dependencies: 199
-- Name: Jugador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Jugador_id_seq"', 7, true);


--
-- TOC entry 3009 (class 0 OID 0)
-- Dependencies: 203
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- TOC entry 2858 (class 2606 OID 16805)
-- Name: Avatar Avatar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Avatar"
    ADD CONSTRAINT "Avatar_pkey" PRIMARY KEY (id);


--
-- TOC entry 2862 (class 2606 OID 16829)
-- Name: Carta Carta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Carta"
    ADD CONSTRAINT "Carta_pkey" PRIMARY KEY (id);


--
-- TOC entry 2860 (class 2606 OID 16813)
-- Name: Jugador Jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Jugador"
    ADD CONSTRAINT "Jugador_pkey" PRIMARY KEY (id);


--
-- TOC entry 2856 (class 2606 OID 16794)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 2864 (class 2606 OID 16840)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2865 (class 2606 OID 16814)
-- Name: Jugador Jugador_avatarId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Jugador"
    ADD CONSTRAINT "Jugador_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES public."Avatar"(id) ON DELETE CASCADE;


-- Completed on 2019-01-28 20:19:02 -05

--
-- PostgreSQL database dump complete
--

