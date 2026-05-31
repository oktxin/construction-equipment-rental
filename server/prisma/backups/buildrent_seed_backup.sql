--
-- PostgreSQL database dump
--

\restrict hkvH7iLMY1ePimFg22g19eBafKSc3gZz68zfmkVVlocdGqXjkIdeZYbOPx6oArY

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_roleId_fkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_equipmentId_fkey";
ALTER TABLE IF EXISTS ONLY public."Report" DROP CONSTRAINT IF EXISTS "Report_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Report" DROP CONSTRAINT IF EXISTS "Report_rentalOrderId_fkey";
ALTER TABLE IF EXISTS ONLY public."RentalOrder" DROP CONSTRAINT IF EXISTS "RentalOrder_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."RentalOrderItem" DROP CONSTRAINT IF EXISTS "RentalOrderItem_rentalOrderId_fkey";
ALTER TABLE IF EXISTS ONLY public."RentalOrderItem" DROP CONSTRAINT IF EXISTS "RentalOrderItem_equipmentId_fkey";
ALTER TABLE IF EXISTS ONLY public."Payment" DROP CONSTRAINT IF EXISTS "Payment_rentalOrderId_fkey";
ALTER TABLE IF EXISTS ONLY public."Favorite" DROP CONSTRAINT IF EXISTS "Favorite_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Favorite" DROP CONSTRAINT IF EXISTS "Favorite_equipmentId_fkey";
ALTER TABLE IF EXISTS ONLY public."Equipment" DROP CONSTRAINT IF EXISTS "Equipment_categoryId_fkey";
ALTER TABLE IF EXISTS ONLY public."EquipmentSpec" DROP CONSTRAINT IF EXISTS "EquipmentSpec_equipmentId_fkey";
ALTER TABLE IF EXISTS ONLY public."EquipmentImage" DROP CONSTRAINT IF EXISTS "EquipmentImage_equipmentId_fkey";
DROP INDEX IF EXISTS public."User_roleId_idx";
DROP INDEX IF EXISTS public."User_isBlocked_idx";
DROP INDEX IF EXISTS public."User_email_key";
DROP INDEX IF EXISTS public."Role_name_key";
DROP INDEX IF EXISTS public."Review_userId_idx";
DROP INDEX IF EXISTS public."Review_isPublished_idx";
DROP INDEX IF EXISTS public."Review_equipmentId_idx";
DROP INDEX IF EXISTS public."Report_userId_idx";
DROP INDEX IF EXISTS public."Report_type_idx";
DROP INDEX IF EXISTS public."Report_rentalOrderId_idx";
DROP INDEX IF EXISTS public."Report_format_idx";
DROP INDEX IF EXISTS public."RentalOrder_userId_idx";
DROP INDEX IF EXISTS public."RentalOrder_status_idx";
DROP INDEX IF EXISTS public."RentalOrder_startDate_endDate_idx";
DROP INDEX IF EXISTS public."RentalOrder_orderNumber_key";
DROP INDEX IF EXISTS public."RentalOrder_createdAt_idx";
DROP INDEX IF EXISTS public."RentalOrderItem_rentalOrderId_idx";
DROP INDEX IF EXISTS public."RentalOrderItem_equipmentId_idx";
DROP INDEX IF EXISTS public."Payment_status_idx";
DROP INDEX IF EXISTS public."Payment_rentalOrderId_idx";
DROP INDEX IF EXISTS public."Payment_method_idx";
DROP INDEX IF EXISTS public."Favorite_userId_idx";
DROP INDEX IF EXISTS public."Favorite_userId_equipmentId_key";
DROP INDEX IF EXISTS public."Favorite_equipmentId_idx";
DROP INDEX IF EXISTS public."Equipment_status_idx";
DROP INDEX IF EXISTS public."Equipment_slug_key";
DROP INDEX IF EXISTS public."Equipment_isFeatured_idx";
DROP INDEX IF EXISTS public."Equipment_categoryId_idx";
DROP INDEX IF EXISTS public."Equipment_brand_idx";
DROP INDEX IF EXISTS public."EquipmentSpec_equipmentId_sortOrder_idx";
DROP INDEX IF EXISTS public."EquipmentSpec_equipmentId_idx";
DROP INDEX IF EXISTS public."EquipmentImage_equipmentId_sortOrder_idx";
DROP INDEX IF EXISTS public."EquipmentImage_equipmentId_idx";
DROP INDEX IF EXISTS public."Category_slug_key";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."Role" DROP CONSTRAINT IF EXISTS "Role_pkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_pkey";
ALTER TABLE IF EXISTS ONLY public."Report" DROP CONSTRAINT IF EXISTS "Report_pkey";
ALTER TABLE IF EXISTS ONLY public."RentalOrder" DROP CONSTRAINT IF EXISTS "RentalOrder_pkey";
ALTER TABLE IF EXISTS ONLY public."RentalOrderItem" DROP CONSTRAINT IF EXISTS "RentalOrderItem_pkey";
ALTER TABLE IF EXISTS ONLY public."Payment" DROP CONSTRAINT IF EXISTS "Payment_pkey";
ALTER TABLE IF EXISTS ONLY public."Favorite" DROP CONSTRAINT IF EXISTS "Favorite_pkey";
ALTER TABLE IF EXISTS ONLY public."Equipment" DROP CONSTRAINT IF EXISTS "Equipment_pkey";
ALTER TABLE IF EXISTS ONLY public."EquipmentSpec" DROP CONSTRAINT IF EXISTS "EquipmentSpec_pkey";
ALTER TABLE IF EXISTS ONLY public."EquipmentImage" DROP CONSTRAINT IF EXISTS "EquipmentImage_pkey";
ALTER TABLE IF EXISTS ONLY public."Category" DROP CONSTRAINT IF EXISTS "Category_pkey";
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."Role";
DROP TABLE IF EXISTS public."Review";
DROP TABLE IF EXISTS public."Report";
DROP TABLE IF EXISTS public."RentalOrderItem";
DROP TABLE IF EXISTS public."RentalOrder";
DROP TABLE IF EXISTS public."Payment";
DROP TABLE IF EXISTS public."Favorite";
DROP TABLE IF EXISTS public."EquipmentSpec";
DROP TABLE IF EXISTS public."EquipmentImage";
DROP TABLE IF EXISTS public."Equipment";
DROP TABLE IF EXISTS public."Category";
DROP TYPE IF EXISTS public."ReportType";
DROP TYPE IF EXISTS public."ReportFormat";
DROP TYPE IF EXISTS public."PaymentStatus";
DROP TYPE IF EXISTS public."PaymentMethod";
DROP TYPE IF EXISTS public."OrderStatus";
DROP TYPE IF EXISTS public."EquipmentStatus";
DROP TYPE IF EXISTS public."DeliveryType";
--
-- Name: DeliveryType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."DeliveryType" AS ENUM (
    'PICKUP',
    'DELIVERY'
);


--
-- Name: EquipmentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."EquipmentStatus" AS ENUM (
    'AVAILABLE',
    'UNAVAILABLE',
    'MAINTENANCE',
    'ARCHIVED'
);


--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'DRAFT',
    'PENDING',
    'APPROVED',
    'ACTIVE',
    'COMPLETED',
    'CANCELLED',
    'REJECTED'
);


--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'CASH',
    'CARD_MOCK',
    'BANK_TRANSFER_MOCK'
);


--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'REFUNDED'
);


--
-- Name: ReportFormat; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ReportFormat" AS ENUM (
    'PDF',
    'DOCX'
);


--
-- Name: ReportType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ReportType" AS ENUM (
    'ORDER_DOCUMENT',
    'RENTAL_HISTORY',
    'ADMIN_RENTAL_STATISTICS',
    'EQUIPMENT_UTILIZATION'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "iconName" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Equipment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Equipment" (
    id text NOT NULL,
    "categoryId" text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "shortDescription" character varying(255),
    description text,
    brand text,
    model text,
    "dailyPrice" numeric(10,2) NOT NULL,
    "depositAmount" numeric(10,2) NOT NULL,
    "quantityTotal" integer NOT NULL,
    "quantityAvailable" integer NOT NULL,
    power numeric(10,2),
    weight numeric(10,2),
    status public."EquipmentStatus" DEFAULT 'AVAILABLE'::public."EquipmentStatus" NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: EquipmentImage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EquipmentImage" (
    id text NOT NULL,
    "equipmentId" text NOT NULL,
    url text NOT NULL,
    alt text,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: EquipmentSpec; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EquipmentSpec" (
    id text NOT NULL,
    "equipmentId" text NOT NULL,
    name text NOT NULL,
    value text NOT NULL,
    unit text,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


--
-- Name: Favorite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Favorite" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "equipmentId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    "rentalOrderId" text NOT NULL,
    amount numeric(12,2) NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    method public."PaymentMethod" NOT NULL,
    "paidAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: RentalOrder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RentalOrder" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "orderNumber" text NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "deliveryType" public."DeliveryType" NOT NULL,
    "deliveryAddress" text,
    "customerComment" text,
    "managerComment" text,
    subtotal numeric(12,2) NOT NULL,
    "depositTotal" numeric(12,2) NOT NULL,
    "deliveryPrice" numeric(12,2) NOT NULL,
    "totalPrice" numeric(12,2) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: RentalOrderItem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RentalOrderItem" (
    id text NOT NULL,
    "rentalOrderId" text NOT NULL,
    "equipmentId" text NOT NULL,
    quantity integer NOT NULL,
    "dailyPrice" numeric(10,2) NOT NULL,
    "daysCount" integer NOT NULL,
    "lineTotal" numeric(12,2) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Report; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Report" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "rentalOrderId" text,
    type public."ReportType" NOT NULL,
    format public."ReportFormat" NOT NULL,
    title text NOT NULL,
    "fileUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Review" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "equipmentId" text NOT NULL,
    rating integer NOT NULL,
    text text NOT NULL,
    "isPublished" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Role" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text,
    "passwordHash" text NOT NULL,
    "avatarUrl" text,
    "roleId" text NOT NULL,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Category" (id, name, slug, description, "iconName", "createdAt", "updatedAt") FROM stdin;
cmpu216lv000qd5ug2gknqrpl	Отбойные молотки	demolition-hammers	Тяжёлый ударный инструмент для бетона, кирпича и демонтажных работ.	hammer	2026-05-31 17:29:28.243	2026-06-02 12:21:19.157
cmpu216ly000rd5ugoikci2z9	Бетономешалки	concrete-mixers	Мобильные и площадочные бетономешалки для отделки, кладки и монолитных задач.	drum	2026-05-31 17:29:28.246	2026-06-02 12:21:19.157
cmpu216lz000sd5uggdgeivpe	Виброплиты	plate-compactors	Оборудование для уплотнения оснований, обратной засыпки и благоустройства.	layers	2026-05-31 17:29:28.247	2026-06-02 12:21:19.158
cmpu216lz000td5ugoif653lw	Генераторы	generators	Источники питания для площадок без постоянного электричества и резервных сценариев.	zap	2026-05-31 17:29:28.248	2026-06-02 12:21:19.159
cmpu216m0000ud5ugsxqx7qjc	Компрессоры	compressors	Воздушное оборудование для пневмоинструмента, покраски и сервисных работ.	wind	2026-05-31 17:29:28.248	2026-06-02 12:21:19.159
cmpu216m1000vd5ugsj97c7bk	Вышки и леса	scaffolding-towers	Безопасные системы доступа для фасадных, отделочных и внутренних работ.	building-2	2026-05-31 17:29:28.249	2026-06-02 12:21:19.16
cmpu216m1000wd5ugbjiikzj5	Сварочное оборудование	welding-equipment	Инверторы и комплектующие для металлоконструкций, ремонта и монтажа.	wrench	2026-05-31 17:29:28.25	2026-06-02 12:21:19.16
cmpu216m2000xd5ugd6z7247i	Пилы и резчики	saws-cutters	Инструменты для резки металла, камня, железобетона и асфальта.	disc-3	2026-05-31 17:29:28.25	2026-06-02 12:21:19.161
cmpu216m2000yd5ugjmxha24a	Измерительный инструмент	measuring-tools	Точная техника для разметки, нивелирования и контроля качества на объекте.	ruler	2026-05-31 17:29:28.251	2026-06-02 12:21:19.161
\.


--
-- Data for Name: Equipment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Equipment" (id, "categoryId", name, slug, "shortDescription", description, brand, model, "dailyPrice", "depositAmount", "quantityTotal", "quantityAvailable", power, weight, status, "isFeatured", "createdAt", "updatedAt") FROM stdin;
cmpu216mv001gd5ugfa8f7hth	cmpu216ly000rd5ugoikci2z9	RedVerg RD-CM180	redverg-rd-cm180	Site mixer currently reserved from public rental due to motor diagnostics.	High-capacity mixer awaiting diagnostics after a motor overheating alert during a long residential pour.	RedVerg	RD-CM180	34.00	170.00	3	0	0.90	72.00	UNAVAILABLE	f	2026-05-31 17:29:28.28	2026-06-02 12:21:19.173
cmpu216mw001id5ughgbdbbke	cmpu216ly000rd5ugoikci2z9	Patriot BM 208C Mixer	patriot-bm-208c	Large mixer for driveway pours and low-rise concrete crews.	A dependable option when the project needs longer mixing cycles and larger concrete batches per shift.	Patriot	BM 208C	38.00	190.00	3	2	1.00	79.00	AVAILABLE	f	2026-05-31 17:29:28.281	2026-06-02 12:21:19.174
cmpu216mo0012d5ugujtqybh2	cmpu216lv000qd5ug2gknqrpl	Makita HM1214C Demolition Hammer	makita-hm1214c	Compact demolition hammer for wall chasing and tile removal.	Balanced breaker for daily finishing crews that need solid impact power without oversized transport requirements.	Makita	HM1214C	42.00	210.00	4	3	1.50	12.30	AVAILABLE	f	2026-05-31 17:29:28.272	2026-06-02 12:21:19.166
cmpu216mp0014d5ugu0lz927j	cmpu216lv000qd5ug2gknqrpl	DeWalt D25902K Breaker	dewalt-d25902k	Heavy chipping hammer for slab removal and brick dismantling.	A powerful breaker for demolition crews working on reinforced slabs, channels, and dense masonry walls.	DeWalt	D25902K	48.00	240.00	4	3	1.55	10.50	AVAILABLE	f	2026-05-31 17:29:28.273	2026-06-02 12:21:19.167
cmpu216mq0016d5ugpx6o8yxs	cmpu216lv000qd5ug2gknqrpl	Hilti TE 1000-AVR Demolition Hammer	hilti-te-1000-avr	Premium breaker reserved for high-load site tasks and service.	High-output Hilti breaker maintained on a service cycle for intensive demolition and anchor preparation tasks.	Hilti	TE 1000-AVR	60.00	320.00	3	0	1.75	12.50	MAINTENANCE	f	2026-05-31 17:29:28.275	2026-06-02 12:21:19.168
cmpu216mr0018d5ugf6vg3q9u	cmpu216lv000qd5ug2gknqrpl	Milwaukee Kango 950 S	milwaukee-kango-950-s	Robust demolition tool for channels, concrete edges, and openings.	Site-ready breaker often used for expansion joints, cable channels, and mechanical room reconstruction.	Milwaukee	Kango 950 S	50.00	230.00	3	2	1.70	11.80	AVAILABLE	f	2026-05-31 17:29:28.276	2026-06-02 12:21:19.169
cmpu216ms001ad5ugemfo87rh	cmpu216ly000rd5ugoikci2z9	Altrad Belle Minimix 150	altrad-belle-minimix-150	Compact mixer for tile crews, fencing, and small slab repairs.	One of the most practical portable mixers for on-site finishing teams and short-cycle repair jobs.	Altrad Belle	Minimix 150	35.00	180.00	4	1	0.55	61.00	AVAILABLE	t	2026-05-31 17:29:28.277	2026-06-02 12:21:19.17
cmpu216mx001kd5ug4h49hfpn	cmpu216lz000sd5uggdgeivpe	Wacker Neuson VP1550AW	wacker-neuson-vp1550aw	Professional plate compactor for paving base prep and patch repair.	Trusted compactor for sidewalks, trench backfill, and dense granular sub-base on urban job sites.	Wacker Neuson	VP1550AW	55.00	260.00	4	4	3.60	90.00	AVAILABLE	t	2026-05-31 17:29:28.282	2026-06-02 12:21:19.174
cmpu216my001md5ugh8znvup9	cmpu216lz000sd5uggdgeivpe	Huter VP-90 Plate Compactor	huter-vp-90	General-purpose compactor for paths, curbs, and driveway bedding.	Compact unit for crews that need agile movement between landscape and small construction tasks.	Huter	VP-90	44.00	220.00	5	3	4.80	88.00	AVAILABLE	f	2026-05-31 17:29:28.283	2026-06-02 12:21:19.175
cmpu216mz001od5ug0u5b0jol	cmpu216lz000sd5uggdgeivpe	Champion PC9045FH	champion-pc9045fh	Site compactor for paving stone bedding and utility trench refill.	A stable compactor with folding transport handle, good for landscape teams and paving contractors.	Champion	PC9045FH	46.00	215.00	4	3	4.10	92.00	AVAILABLE	f	2026-05-31 17:29:28.284	2026-06-02 12:21:19.176
cmpu216mt001cd5ug9xa7nqhf	cmpu216ly000rd5ugoikci2z9	Zitrek B1510 FK Mixer	zitrek-b1510-fk	Field mixer for interior finishing and landscaping crews.	A practical electric mixer for site prep, small foundations, and concrete-based finishing work.	Zitrek	B1510 FK	30.00	150.00	5	5	0.70	58.00	AVAILABLE	f	2026-05-31 17:29:28.278	2026-06-02 12:21:19.171
cmpu216mu001ed5ug5aodaewy	cmpu216ly000rd5ugoikci2z9	Sturm CM20160 Concrete Mixer	sturm-cm20160	Mid-size mixer for masonry and outdoor pad pouring.	A good fit for builders who need steady batch output for fence posts, paving, and slab extensions.	Sturm	CM20160	32.00	160.00	4	3	0.80	65.00	AVAILABLE	f	2026-05-31 17:29:28.279	2026-06-02 12:21:19.172
cmpu216mb0010d5ugzabpsrkm	cmpu216lv000qd5ug2gknqrpl	Bosch GBH 8-45 DV Rotary Hammer	bosch-gbh-8-45dv	Professional SDS-max hammer for drilling anchors and heavy chiseling.	Reliable rotary hammer for facade crews, opening works, and reinforced concrete drilling on active building sites.	Bosch	GBH 8-45 DV	45.00	220.00	5	4	1.50	8.90	AVAILABLE	t	2026-05-31 17:29:28.26	2026-06-02 12:21:19.165
cmpu216n6001yd5ugu0fr6hvo	cmpu216lz000td5ugoif653lw	Hyundai HHY 7050FE	hyundai-hhy-7050fe	Construction generator for backup circuits, pumps, and batch tools.	Reliable portable unit with strong frame design for outdoor storage and demanding contractor schedules.	Hyundai	HHY 7050FE	68.00	340.00	3	2	5.50	81.00	AVAILABLE	f	2026-05-31 17:29:28.29	2026-06-02 12:21:19.181
cmpu216n70020d5ugl2fz23t1	cmpu216lz000td5ugoif653lw	Firman SPG6500E2	firman-spg6500e2	Generator paused for alternator inspection after intermittent voltage spikes.	High-output petrol generator currently marked unavailable while the alternator and AVR unit are checked.	Firman	SPG6500E2	64.00	320.00	2	0	5.20	78.00	UNAVAILABLE	f	2026-05-31 17:29:28.291	2026-06-02 12:21:19.182
cmpu216n80022d5ug8rmjz67e	cmpu216lz000td5ugoif653lw	SDMO Technic 7500 TE	sdmo-technic-7500te	Three-phase generator for mixed equipment fleets and temporary facilities.	A solid option for sites with lighting towers, pumps, and contractor cabins working from one power source.	SDMO	Technic 7500 TE	82.00	420.00	2	1	6.60	98.00	AVAILABLE	f	2026-05-31 17:29:28.292	2026-06-02 12:21:19.182
cmpu216n90024d5ugqss61ynu	cmpu216m0000ud5ugsxqx7qjc	ABAC Montecarlo L20P	abac-montecarlo-l20p	Compact compressor for finishing, fastening, and blow-out work.	A mobile compressor suited to interior contractors, carpenters, and service technicians working indoors.	ABAC	Montecarlo L20P	28.00	140.00	5	4	1.50	32.00	AVAILABLE	f	2026-05-31 17:29:28.293	2026-06-02 12:21:19.183
cmpu216na0026d5uggtjk00n5	cmpu216m0000ud5ugsxqx7qjc	Fubag VCF 100 CM3	fubag-vcf-100-cm3	Belt-drive compressor for pneumatic tools and small paint jobs.	Popular compressor for bodywork, workshop support, and framing crews using impact and nail tools.	Fubag	VCF 100 CM3	36.00	175.00	4	4	2.20	64.00	AVAILABLE	f	2026-05-31 17:29:28.294	2026-06-02 12:21:19.184
cmpu216nb0028d5ugquezq4xy	cmpu216m0000ud5ugsxqx7qjc	Remeza SB4/C-50.LB30A	remeza-sb4-c-50-lb30a	Workshop compressor for pneumatic installation and maintenance teams.	A durable Belarus-made compressor that works well for finish carpentry, servicing, and daily tool support.	Remeza	SB4/C-50.LB30A	30.00	150.00	5	4	1.80	39.00	AVAILABLE	f	2026-05-31 17:29:28.295	2026-06-02 12:21:19.185
cmpu216nc002ad5ugd8hcmskj	cmpu216m0000ud5ugsxqx7qjc	Patriot EURO 50/260K	patriot-euro-50-260k	Compressor not currently available because of valve block replacement.	Entry-level air compressor temporarily removed from rental after a planned valve block replacement.	Patriot	EURO 50/260K	24.00	120.00	3	0	1.80	27.00	UNAVAILABLE	f	2026-05-31 17:29:28.296	2026-06-02 12:21:19.186
cmpu216nd002cd5ug21i5wbkv	cmpu216m0000ud5ugsxqx7qjc	Metabo Basic 250-24 W OF	metabo-basic-250-24w	Oil-free compressor for clean indoor work and finishing teams.	Low-maintenance compressor chosen for interiors, service vans, and spaces where clean air matters.	Metabo	Basic 250-24 W OF	26.00	125.00	4	4	1.50	24.00	AVAILABLE	f	2026-05-31 17:29:28.297	2026-06-02 12:21:19.187
cmpu216ne002ed5ug1748imv1	cmpu216m1000vd5ugsj97c7bk	Krause Protec XXL 7 m Tower	krause-protec-xxl-7m	Mobile tower scaffold for facade touchups and MEP ceiling access.	Professional aluminum tower with quick-lock assembly for contractors working on facades and atriums.	Krause	Protec XXL 7 m	95.00	500.00	2	1	\N	178.00	AVAILABLE	t	2026-05-31 17:29:28.298	2026-06-02 12:21:19.188
cmpu216nf002gd5ugzceozmj9	cmpu216m1000vd5ugsj97c7bk	Virastar VS Tower 6 m	virastar-vs-tower-6m	Modular tower for installation, painting, and warehouse maintenance.	A lightweight aluminum tower that fits indoor service teams and medium-height finishing projects.	Virastar	VS Tower 6 m	82.00	440.00	2	1	\N	145.00	AVAILABLE	f	2026-05-31 17:29:28.299	2026-06-02 12:21:19.188
cmpu216ng002id5ug3p3xiw19	cmpu216m1000vd5ugsj97c7bk	Layher Zifa Compact	layher-zifa-compact	Compact stairwell tower for indoor finishing and service access.	Specialized compact tower system for narrow spaces, stairwells, and commercial fit-out work.	Layher	Zifa Compact	88.00	460.00	1	0	\N	96.00	AVAILABLE	f	2026-05-31 17:29:28.3	2026-06-02 12:21:19.189
cmpu216nh002kd5ugmw8ldssu	cmpu216m1000vd5ugsj97c7bk	Euro Scaffold Rolling Tower 75x190	euro-scaffold-rolling-75x190	Tower scaffold set currently held for internal inspection and inventory audit.	Rolling scaffold set temporarily paused from rental until a full inventory and locking pin audit is finished.	Euro Scaffold	75x190	76.00	390.00	2	0	\N	128.00	UNAVAILABLE	f	2026-05-31 17:29:28.301	2026-06-02 12:21:19.19
cmpu216ni002md5ugaac4trp1	cmpu216m1000vd5ugsj97c7bk	Steel Frame Facade Kit 12 m	steel-frame-facade-kit-12m	Legacy facade scaffold kit kept in archive for compatibility checks.	Archived scaffold set retained only for historical records and dimension matching against old client documentation.	BuildRent Legacy	Facade Kit 12 m	110.00	600.00	1	0	\N	420.00	ARCHIVED	f	2026-05-31 17:29:28.302	2026-06-02 12:21:19.191
cmpu216ni002od5ugcfr8ytc8	cmpu216m1000wd5ugbjiikzj5	ESAB Rogue ES 200i	esab-rogue-es-200i	Compact inverter welder for fabrication teams and repair crews.	High-efficiency welding inverter for mobile welders handling gates, frames, reinforcement, and repairs.	ESAB	Rogue ES 200i	40.00	190.00	4	3	7.10	8.40	AVAILABLE	t	2026-05-31 17:29:28.303	2026-06-02 12:21:19.192
cmpu216nj002qd5ug3rjdm07r	cmpu216m1000wd5ugbjiikzj5	Svarog REAL ARC 200 Black	svarog-real-arc-200-black	Field inverter for installers, steel stairs, and support structures.	A portable welding machine valued for stable arc performance on repair jobs and custom steel fabrication.	Svarog	REAL ARC 200 Black	34.00	165.00	5	5	6.60	4.70	AVAILABLE	f	2026-05-31 17:29:28.304	2026-06-02 12:21:19.193
cmpu216nl002sd5uga8ohegg9	cmpu216m1000wd5ugbjiikzj5	FoxWeld Master 202M	foxweld-master-202m	General-purpose inverter for site fabrication and maintenance.	A versatile welding inverter used for canopies, brackets, and quick structural repairs around the site.	FoxWeld	Master 202M	32.00	150.00	4	4	6.30	5.20	AVAILABLE	f	2026-05-31 17:29:28.305	2026-06-02 12:21:19.194
cmpu216nl002ud5ugscckzjwu	cmpu216m1000wd5ugbjiikzj5	Resanta SAI-220	resanta-sai-220	Inverter under preventive service after fan and cable inspection.	Popular welding machine temporarily rotated out while fan bearings and output cables are being checked.	Resanta	SAI-220	29.00	145.00	3	0	7.20	4.90	MAINTENANCE	f	2026-05-31 17:29:28.306	2026-06-02 12:21:19.194
cmpu216n2001sd5ugmcaje11z	cmpu216lz000sd5uggdgeivpe	Zitrek CNP 30-2	zitrek-cnp-30-2	Heavy compactor for dense base work around road and yard projects.	Durable plate compactor for larger compaction tasks where crews need stronger impact and good transport balance.	Zitrek	CNP 30-2	58.00	270.00	3	3	4.80	125.00	AVAILABLE	f	2026-05-31 17:29:28.287	2026-06-02 12:21:19.178
cmpu216n4001ud5ugmt8r8aee	cmpu216lz000td5ugoif653lw	Honda EU30is Inverter Generator	honda-eu30is	Quiet inverter generator for site offices and sensitive power tools.	Premium low-noise generator for finishing crews, mobile offices, and equipment that needs stable current.	Honda	EU30is	70.00	360.00	3	2	3.00	59.00	AVAILABLE	t	2026-05-31 17:29:28.288	2026-06-02 12:21:19.179
cmpu216n5001wd5ugfjewtyji	cmpu216lz000td5ugoif653lw	Fubag BS 6600 AES	fubag-bs-6600-aes	Portable petrol generator for general construction power backup.	A proven site generator for welders, pumps, and shared tool circuits on medium-size construction projects.	Fubag	BS 6600 AES	66.00	330.00	4	4	5.50	84.00	AVAILABLE	f	2026-05-31 17:29:28.289	2026-06-02 12:21:19.18
cmpu216nn002wd5ugx53nijsp	cmpu216m1000wd5ugbjiikzj5	Aurora Stickmate 250	aurora-stickmate-250	Higher-output inverter for thicker steel and fabrication batches.	A dependable welding option for workshops and construction crews working with heavier metal profiles.	Aurora	Stickmate 250	45.00	205.00	2	1	8.50	7.80	AVAILABLE	f	2026-05-31 17:29:28.307	2026-06-02 12:21:19.195
cmpu216no002yd5ugw5q3lswn	cmpu216m2000xd5ugd6z7247i	Stihl TS 420 Cut-Off Saw	stihl-ts-420	Handheld concrete and metal cutter for openings, curbs, and pipes.	Highly mobile cut-off saw for rescue openings, paving adjustments, steel sections, and utility work.	Stihl	TS 420	58.00	280.00	4	3	3.20	9.60	AVAILABLE	t	2026-05-31 17:29:28.308	2026-06-02 12:21:19.196
cmpu216np0030d5ugfq63q4af	cmpu216m2000xd5ugd6z7247i	Husqvarna K 770 Cutter	husqvarna-k770	Universal disc cutter for asphalt, curb stone, and reinforcement work.	Reliable high-output saw used by utility crews, paving teams, and general contractors on dense materials.	Husqvarna	K 770	62.00	300.00	4	1	3.70	10.10	AVAILABLE	f	2026-05-31 17:29:28.309	2026-06-02 12:21:19.197
cmpu216nq0032d5ugzw6k0y5s	cmpu216m2000xd5ugd6z7247i	Makita LC1230 Metal Saw	makita-lc1230	Cold-cut metal saw for profiles, channels, and site fabrication.	Accurate metal cutting saw for workshop corners and mobile fabrication tasks where clean edges matter.	Makita	LC1230	37.00	170.00	3	3	1.75	19.30	AVAILABLE	f	2026-05-31 17:29:28.31	2026-06-02 12:21:19.198
cmpu216nu003cd5ugz8tfmbiy	cmpu216m2000yd5ugjmxha24a	Stanley TLM330 Distance Meter	stanley-tlm330	Compact laser meter for quick room, facade, and opening measurements.	Convenient handheld range finder for finish estimators, survey support, and installation planning.	Stanley	TLM330	12.00	60.00	8	6	\N	0.18	AVAILABLE	f	2026-05-31 17:29:28.315	2026-06-02 12:21:19.202
cmpu216nv003ed5ugrwn6xnla	cmpu216m2000yd5ugjmxha24a	ADA Cube 360 Home Edition	ada-cube-360-home	Laser level paused from rental because of calibration drift.	Compact laser level currently awaiting calibration after drift was detected during a quality check.	ADA	Cube 360 Home Edition	10.00	45.00	5	0	\N	0.35	UNAVAILABLE	f	2026-05-31 17:29:28.316	2026-06-02 12:21:19.203
cmpu216nx003gd5ug6jpvmysq	cmpu216m2000yd5ugjmxha24a	Trimble M3 Total Station	trimble-m3-total-station	Survey-grade station for site layout, axes transfer, and geodesy support.	A precision instrument for contractors that need complex geometry transfer and accurate site control.	Trimble	M3	120.00	700.00	1	0	\N	4.50	AVAILABLE	f	2026-05-31 17:29:28.317	2026-06-02 12:21:19.204
cmpu216n0001qd5ugicavws33	cmpu216lz000sd5uggdgeivpe	Masalta MS60-4 Compactor	masalta-ms60-4	Light compactor rotated into workshop inspection after a long asphalt season.	Compact plate compactor currently off the shelf for preventive bearing and vibration system inspection.	Masalta	MS60-4	39.00	180.00	2	0	3.10	63.00	MAINTENANCE	f	2026-05-31 17:29:28.285	2026-06-02 12:21:19.177
cmpu216nr0034d5ugmb25ejc3	cmpu216m2000xd5ugd6z7247i	Eibenstock EES 1400-3 Wall Chaser	eibenstock-ees-1400-3	Wall chaser unavailable while blade guards are being replaced.	Specialized chasing tool currently not rentable until guard hardware and dust seals are replaced.	Eibenstock	EES 1400-3	41.00	190.00	2	0	1.40	4.70	UNAVAILABLE	f	2026-05-31 17:29:28.311	2026-06-02 12:21:19.199
cmpu216ns0036d5ug0xnnwuav	cmpu216m2000xd5ugd6z7247i	Legacy Asphalt Saw 500	legacy-asphalt-saw-500	Archived road saw retained only for old contract reference.	Historical equipment record preserved for reporting and documentation of earlier municipal projects.	BuildRent Legacy	Asphalt Saw 500	85.00	430.00	1	0	9.00	115.00	ARCHIVED	f	2026-05-31 17:29:28.312	2026-06-02 12:21:19.199
cmpu216ns0038d5ugivrykrme	cmpu216m2000yd5ugjmxha24a	Bosch GLL 3-80 CG Laser Level	bosch-gll-3-80-cg	Green-beam laser for interior layout and suspended ceiling work.	Highly visible laser level for partition framing, suspended ceilings, tiling, and cabinet alignment.	Bosch	GLL 3-80 CG	24.00	120.00	6	5	\N	0.90	AVAILABLE	f	2026-05-31 17:29:28.313	2026-06-02 12:21:19.2
cmpu216nt003ad5ugcgyrtsjo	cmpu216m2000yd5ugjmxha24a	Leica Rugby 620 Rotary Laser	leica-rugby-620	Outdoor rotary laser for grading, utilities, and site leveling.	A professional-grade rotary laser used on larger plots, foundations, and exterior utility alignment.	Leica	Rugby 620	48.00	260.00	3	3	\N	2.40	AVAILABLE	f	2026-05-31 17:29:28.314	2026-06-02 12:21:19.201
\.


--
-- Data for Name: EquipmentImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentImage" (id, "equipmentId", url, alt, "sortOrder", "createdAt") FROM stdin;
cmpwlwlpj002td52kgi6693jy	cmpu216mb0010d5ugzabpsrkm	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Bosch GBH 8-45 DV Rotary Hammer view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj002ud52kszhnfjqa	cmpu216mb0010d5ugzabpsrkm	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Bosch GBH 8-45 DV Rotary Hammer view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj002vd52k2gcqsn57	cmpu216mo0012d5ugujtqybh2	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Makita HM1214C Demolition Hammer view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj002wd52kzf6h6oon	cmpu216mo0012d5ugujtqybh2	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Makita HM1214C Demolition Hammer view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj002xd52kbk3eo9ds	cmpu216mp0014d5ugu0lz927j	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	DeWalt D25902K Breaker view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj002yd52k9xz2vvag	cmpu216mp0014d5ugu0lz927j	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	DeWalt D25902K Breaker view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj002zd52kpl96o704	cmpu216mq0016d5ugpx6o8yxs	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Hilti TE 1000-AVR Demolition Hammer view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0030d52kfnhu3kz2	cmpu216mq0016d5ugpx6o8yxs	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Hilti TE 1000-AVR Demolition Hammer view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0031d52ki8xdxqwf	cmpu216mr0018d5ugf6vg3q9u	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Milwaukee Kango 950 S view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0032d52kuojtc820	cmpu216mr0018d5ugf6vg3q9u	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Milwaukee Kango 950 S view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0033d52kn7popupa	cmpu216ms001ad5ugemfo87rh	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Altrad Belle Minimix 150 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0034d52ks6l30dbp	cmpu216ms001ad5ugemfo87rh	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Altrad Belle Minimix 150 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0035d52kml0ore3q	cmpu216mt001cd5ug9xa7nqhf	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Zitrek B1510 FK Mixer view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0036d52kr5oisj7l	cmpu216mt001cd5ug9xa7nqhf	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Zitrek B1510 FK Mixer view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0037d52k0ma9hw64	cmpu216mu001ed5ug5aodaewy	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Sturm CM20160 Concrete Mixer view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0038d52k5su4kd6w	cmpu216mu001ed5ug5aodaewy	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Sturm CM20160 Concrete Mixer view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0039d52kxpbu50rl	cmpu216mv001gd5ugfa8f7hth	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	RedVerg RD-CM180 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003ad52kftofm77w	cmpu216mv001gd5ugfa8f7hth	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	RedVerg RD-CM180 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003bd52krat284x6	cmpu216mw001id5ughgbdbbke	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Patriot BM 208C Mixer view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003cd52kxex07xz7	cmpu216mw001id5ughgbdbbke	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Patriot BM 208C Mixer view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003dd52kp5pnxoiq	cmpu216mx001kd5ug4h49hfpn	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Wacker Neuson VP1550AW view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003ed52kespmw9r3	cmpu216mx001kd5ug4h49hfpn	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Wacker Neuson VP1550AW view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003fd52krlp73sy7	cmpu216my001md5ugh8znvup9	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Huter VP-90 Plate Compactor view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003gd52kxy3wme6c	cmpu216my001md5ugh8znvup9	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Huter VP-90 Plate Compactor view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003hd52kuiweeq7x	cmpu216mz001od5ug0u5b0jol	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Champion PC9045FH view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003id52k3d9bybxh	cmpu216mz001od5ug0u5b0jol	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Champion PC9045FH view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003jd52kyjc4y6oh	cmpu216n0001qd5ugicavws33	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Masalta MS60-4 Compactor view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003kd52kp1n2vtn7	cmpu216n0001qd5ugicavws33	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Masalta MS60-4 Compactor view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003ld52k2jw3fo91	cmpu216n2001sd5ugmcaje11z	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Zitrek CNP 30-2 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003md52k48kszqc1	cmpu216n2001sd5ugmcaje11z	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Zitrek CNP 30-2 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003nd52ke036nhkr	cmpu216n4001ud5ugmt8r8aee	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Honda EU30is Inverter Generator view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003od52ka6i9h4p3	cmpu216n4001ud5ugmt8r8aee	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Honda EU30is Inverter Generator view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003pd52kk42hsiwz	cmpu216n5001wd5ugfjewtyji	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Fubag BS 6600 AES view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003qd52kozh5zz2y	cmpu216n5001wd5ugfjewtyji	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Fubag BS 6600 AES view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003rd52khegllmwq	cmpu216n6001yd5ugu0fr6hvo	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Hyundai HHY 7050FE view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003sd52k8gfjmluf	cmpu216n6001yd5ugu0fr6hvo	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Hyundai HHY 7050FE view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003td52kssqxytlz	cmpu216n70020d5ugl2fz23t1	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Firman SPG6500E2 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003ud52kqn24zv0w	cmpu216n70020d5ugl2fz23t1	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Firman SPG6500E2 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003vd52kty616pmh	cmpu216n80022d5ug8rmjz67e	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	SDMO Technic 7500 TE view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003wd52kfr0bojjq	cmpu216n80022d5ug8rmjz67e	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	SDMO Technic 7500 TE view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003xd52k747sjswk	cmpu216n90024d5ugqss61ynu	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	ABAC Montecarlo L20P view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj003yd52k27s2ks52	cmpu216n90024d5ugqss61ynu	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	ABAC Montecarlo L20P view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj003zd52kmd7dzq50	cmpu216na0026d5uggtjk00n5	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Fubag VCF 100 CM3 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0040d52ktk98fkrp	cmpu216na0026d5uggtjk00n5	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Fubag VCF 100 CM3 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0041d52kw39goyg7	cmpu216nb0028d5ugquezq4xy	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Remeza SB4/C-50.LB30A view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0042d52kvpuwjl3u	cmpu216nb0028d5ugquezq4xy	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Remeza SB4/C-50.LB30A view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0043d52kuypv8fza	cmpu216nc002ad5ugd8hcmskj	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Patriot EURO 50/260K view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0044d52kqu9mzm25	cmpu216nc002ad5ugd8hcmskj	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Patriot EURO 50/260K view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0045d52kudhap6re	cmpu216nd002cd5ug21i5wbkv	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Metabo Basic 250-24 W OF view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0046d52k8zrfbshq	cmpu216nd002cd5ug21i5wbkv	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Metabo Basic 250-24 W OF view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0047d52kovj24y9b	cmpu216ne002ed5ug1748imv1	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Krause Protec XXL 7 m Tower view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0048d52kc5g00d7d	cmpu216ne002ed5ug1748imv1	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Krause Protec XXL 7 m Tower view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0049d52kjs6w26s8	cmpu216nf002gd5ugzceozmj9	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Virastar VS Tower 6 m view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004ad52kfxxiu404	cmpu216nf002gd5ugzceozmj9	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Virastar VS Tower 6 m view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004bd52kcni6qtyf	cmpu216ng002id5ug3p3xiw19	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Layher Zifa Compact view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004cd52kwld8oaxw	cmpu216ng002id5ug3p3xiw19	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Layher Zifa Compact view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004dd52k4ypbvza3	cmpu216nh002kd5ugmw8ldssu	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Euro Scaffold Rolling Tower 75x190 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004ed52kw7u5sza2	cmpu216nh002kd5ugmw8ldssu	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Euro Scaffold Rolling Tower 75x190 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004fd52kyujaurs3	cmpu216ni002md5ugaac4trp1	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Steel Frame Facade Kit 12 m view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004gd52k294bjjkv	cmpu216ni002md5ugaac4trp1	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Steel Frame Facade Kit 12 m view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004hd52ke6jwy82i	cmpu216ni002od5ugcfr8ytc8	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	ESAB Rogue ES 200i view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004id52kq5w9pz9z	cmpu216ni002od5ugcfr8ytc8	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	ESAB Rogue ES 200i view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004jd52kuwstgw8a	cmpu216nj002qd5ug3rjdm07r	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Svarog REAL ARC 200 Black view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004kd52k8fuxi5h0	cmpu216nj002qd5ug3rjdm07r	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Svarog REAL ARC 200 Black view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004ld52kzfxj2f6k	cmpu216nl002sd5uga8ohegg9	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	FoxWeld Master 202M view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004md52k3wxhuj3f	cmpu216nl002sd5uga8ohegg9	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	FoxWeld Master 202M view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004nd52knggb4b89	cmpu216nl002ud5ugscckzjwu	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Resanta SAI-220 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004od52krhy6ho88	cmpu216nl002ud5ugscckzjwu	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Resanta SAI-220 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004pd52k3xbwxoaf	cmpu216nn002wd5ugx53nijsp	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Aurora Stickmate 250 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004qd52knik55gow	cmpu216nn002wd5ugx53nijsp	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Aurora Stickmate 250 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004rd52k4fg8uy6l	cmpu216no002yd5ugw5q3lswn	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Stihl TS 420 Cut-Off Saw view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004sd52klfia0qaj	cmpu216no002yd5ugw5q3lswn	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Stihl TS 420 Cut-Off Saw view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004td52k93dnvha9	cmpu216np0030d5ugfq63q4af	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Husqvarna K 770 Cutter view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004ud52kv16mzfjv	cmpu216np0030d5ugfq63q4af	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Husqvarna K 770 Cutter view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004vd52kqsjuopml	cmpu216nq0032d5ugzw6k0y5s	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Makita LC1230 Metal Saw view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004wd52kkn4oyv3z	cmpu216nq0032d5ugzw6k0y5s	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Makita LC1230 Metal Saw view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004xd52k57is4nfl	cmpu216nr0034d5ugmb25ejc3	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Eibenstock EES 1400-3 Wall Chaser view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj004yd52kmpbmlzyy	cmpu216nr0034d5ugmb25ejc3	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Eibenstock EES 1400-3 Wall Chaser view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj004zd52kbk5b5sdl	cmpu216ns0036d5ug0xnnwuav	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Legacy Asphalt Saw 500 view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0050d52kccblu257	cmpu216ns0036d5ug0xnnwuav	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Legacy Asphalt Saw 500 view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0051d52kmkeyed2h	cmpu216ns0038d5ugivrykrme	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Bosch GLL 3-80 CG Laser Level view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0052d52kb5e6mbqm	cmpu216ns0038d5ugivrykrme	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Bosch GLL 3-80 CG Laser Level view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0053d52k6eprtycs	cmpu216nt003ad5ugcgyrtsjo	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Leica Rugby 620 Rotary Laser view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0054d52kkbp7imnj	cmpu216nt003ad5ugcgyrtsjo	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Leica Rugby 620 Rotary Laser view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0055d52ky5e5smfh	cmpu216nu003cd5ugz8tfmbiy	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Stanley TLM330 Distance Meter view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0056d52kl5ici022	cmpu216nu003cd5ugz8tfmbiy	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Stanley TLM330 Distance Meter view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0057d52kjvpv215e	cmpu216nv003ed5ugrwn6xnla	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	ADA Cube 360 Home Edition view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj0058d52kkxvrdhso	cmpu216nv003ed5ugrwn6xnla	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	ADA Cube 360 Home Edition view 2	1	2026-06-02 12:21:19.207
cmpwlwlpj0059d52kalt6l057	cmpu216nx003gd5ug6jpvmysq	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Trimble M3 Total Station view 1	0	2026-06-02 12:21:19.207
cmpwlwlpj005ad52kmt4hgf0i	cmpu216nx003gd5ug6jpvmysq	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Trimble M3 Total Station view 2	1	2026-06-02 12:21:19.207
\.


--
-- Data for Name: EquipmentSpec; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentSpec" (id, "equipmentId", name, value, unit, "sortOrder") FROM stdin;
cmpwlwlpv005bd52k2c2whbpi	cmpu216mb0010d5ugzabpsrkm	Impact energy	12.5	J	0
cmpwlwlpv005cd52k412t1ibf	cmpu216mb0010d5ugzabpsrkm	Chuck type	SDS-max	\N	1
cmpwlwlpv005dd52k7r8ucbyb	cmpu216mb0010d5ugzabpsrkm	Drilling diameter	45	mm	2
cmpwlwlpv005ed52kz35x529o	cmpu216mb0010d5ugzabpsrkm	Operating mode	Drilling and chiseling	\N	3
cmpwlwlpv005fd52k78224p9s	cmpu216mo0012d5ugujtqybh2	Impact energy	19.9	J	0
cmpwlwlpv005gd52kttjcx8e5	cmpu216mo0012d5ugujtqybh2	Vibration control	AVT	\N	1
cmpwlwlpv005hd52kkrnxtetq	cmpu216mo0012d5ugujtqybh2	Voltage	220	V	2
cmpwlwlpv005id52ksj7ief3h	cmpu216mo0012d5ugujtqybh2	Case included	Yes	\N	3
cmpwlwlpv005jd52khsbcoa8e	cmpu216mp0014d5ugu0lz927j	Impact energy	19	J	0
cmpwlwlpv005kd52kqmkqqxpu	cmpu216mp0014d5ugu0lz927j	Tool holder	SDS-max	\N	1
cmpwlwlpv005ld52k5vi5fbsx	cmpu216mp0014d5ugu0lz927j	Blows per minute	2100	\N	2
cmpwlwlpv005md52kxk8ctbf7	cmpu216mp0014d5ugu0lz927j	Use case	Slab and wall demolition	\N	3
cmpwlwlpv005nd52klkc3n2uv	cmpu216mq0016d5ugpx6o8yxs	Impact energy	26	J	0
cmpwlwlpv005od52kl2043wdy	cmpu216mq0016d5ugpx6o8yxs	Service status	Maintenance rotation	\N	1
cmpwlwlpv005pd52k48kfnt10	cmpu216mq0016d5ugpx6o8yxs	Noise level	96	dB	2
cmpwlwlpv005qd52kog6jk18l	cmpu216mq0016d5ugpx6o8yxs	Recommended use	Structural demolition	\N	3
cmpwlwlpv005rd52ked2wmhmm	cmpu216mr0018d5ugf6vg3q9u	Blows per minute	1950	\N	0
cmpwlwlpv005sd52k7vixq6bg	cmpu216mr0018d5ugf6vg3q9u	Impact energy	20	J	1
cmpwlwlpv005td52k8lt11ajf	cmpu216mr0018d5ugf6vg3q9u	Cord length	6	m	2
cmpwlwlpv005ud52k2l8cprdi	cmpu216mr0018d5ugf6vg3q9u	Transport case	Yes	\N	3
cmpwlwlpv005vd52kmx852nrx	cmpu216ms001ad5ugemfo87rh	Drum volume	130	L	0
cmpwlwlpv005wd52kevnjb1ze	cmpu216ms001ad5ugemfo87rh	Mix output	90	L	1
cmpwlwlpv005xd52k8yvfmrj3	cmpu216ms001ad5ugemfo87rh	Power supply	220	V	2
cmpwlwlpv005yd52kq86guc03	cmpu216ms001ad5ugemfo87rh	Drive type	Electric	\N	3
cmpwlwlpv005zd52kmf5jec61	cmpu216mt001cd5ug9xa7nqhf	Drum volume	140	L	0
cmpwlwlpv0060d52kqmwac6o8	cmpu216mt001cd5ug9xa7nqhf	Frame design	Portable wheel base	\N	1
cmpwlwlpv0061d52k7pz2unjr	cmpu216mt001cd5ug9xa7nqhf	Crown material	Cast iron	\N	2
cmpwlwlpv0062d52ktsie5fjr	cmpu216mt001cd5ug9xa7nqhf	Assembly	Quick release drum	\N	3
cmpwlwlpv0063d52k3wm56ilo	cmpu216mu001ed5ug5aodaewy	Drum volume	160	L	0
cmpwlwlpv0064d52k0ntipde1	cmpu216mu001ed5ug5aodaewy	Mix output	110	L	1
cmpwlwlpv0065d52kyvetoikd	cmpu216mu001ed5ug5aodaewy	Motor protection	Thermal relay	\N	2
cmpwlwlpv0066d52kehft62u3	cmpu216mu001ed5ug5aodaewy	Tilt control	Hand wheel	\N	3
cmpwlwlpv0067d52k9fh9tbqg	cmpu216mv001gd5ugfa8f7hth	Drum volume	180	L	0
cmpwlwlpv0068d52kfeewoclz	cmpu216mv001gd5ugfa8f7hth	Availability note	Awaiting diagnostics	\N	1
cmpwlwlpv0069d52ku1norn9o	cmpu216mv001gd5ugfa8f7hth	Gear ring	Steel	\N	2
cmpwlwlpv006ad52k7l2jwe2l	cmpu216mv001gd5ugfa8f7hth	Transport wheels	Yes	\N	3
cmpwlwlpv006bd52kpewqurm2	cmpu216mw001id5ughgbdbbke	Drum volume	200	L	0
cmpwlwlpv006cd52kp1j8cvhq	cmpu216mw001id5ughgbdbbke	Mix output	140	L	1
cmpwlwlpv006dd52k6dvdfi16	cmpu216mw001id5ughgbdbbke	Batch purpose	Large pours	\N	2
cmpwlwlpv006ed52ksndud7bz	cmpu216mw001id5ughgbdbbke	Power supply	220	V	3
cmpwlwlpv006fd52krqvoow2o	cmpu216mx001kd5ug4h49hfpn	Compaction force	15	kN	0
cmpwlwlpv006gd52k1yiexq69	cmpu216mx001kd5ug4h49hfpn	Plate width	500	mm	1
cmpwlwlpv006hd52klxi2zydq	cmpu216mx001kd5ug4h49hfpn	Travel speed	25	m/min	2
cmpwlwlpv006id52k8mne2ibi	cmpu216mx001kd5ug4h49hfpn	Engine type	Petrol	\N	3
cmpwlwlpv006jd52kk5xajip2	cmpu216my001md5ugh8znvup9	Compaction force	13	kN	0
cmpwlwlpv006kd52kdhwk64jg	cmpu216my001md5ugh8znvup9	Base plate	530 x 500	mm	1
cmpwlwlpv006ld52k0c9wgl8x	cmpu216my001md5ugh8znvup9	Fuel tank	3.6	L	2
cmpwlwlpv006md52k6ct6o1o4	cmpu216my001md5ugh8znvup9	Starting system	Manual recoil	\N	3
cmpwlwlpv006nd52kfq0r3o1a	cmpu216mz001od5ug0u5b0jol	Compaction depth	300	mm	0
cmpwlwlpv006od52ksjq42hxo	cmpu216mz001od5ug0u5b0jol	Force	15	kN	1
cmpwlwlpv006pd52kf8fzy3kw	cmpu216mz001od5ug0u5b0jol	Water tank	No	\N	2
cmpwlwlpv006qd52kot3q0io7	cmpu216mz001od5ug0u5b0jol	Handle	Foldable	\N	3
cmpwlwlpv006rd52k8t4kl2tz	cmpu216n0001qd5ugicavws33	Compaction force	10.5	kN	0
cmpwlwlpv006sd52kc30scb20	cmpu216n0001qd5ugicavws33	Maintenance note	Vibration unit inspection	\N	1
cmpwlwlpv006td52k3h16e7ty	cmpu216n0001qd5ugicavws33	Transport wheels	Optional	\N	2
cmpwlwlpv006ud52ktx2slum2	cmpu216n0001qd5ugicavws33	Engine type	Petrol	\N	3
cmpwlwlpv006vd52ks77gtxhl	cmpu216n2001sd5ugmcaje11z	Compaction force	25	kN	0
cmpwlwlpv006wd52ktkynjynk	cmpu216n2001sd5ugmcaje11z	Plate size	630 x 400	mm	1
cmpwlwlpv006xd52k1gxbpjov	cmpu216n2001sd5ugmcaje11z	Travel speed	18	m/min	2
cmpwlwlpv006yd52koqlra7he	cmpu216n2001sd5ugmcaje11z	Use case	Road base and yard prep	\N	3
cmpwlwlpv006zd52kpsoz0kw9	cmpu216n4001ud5ugmt8r8aee	Rated power	2.8	kW	0
cmpwlwlpv0070d52kw2ax9tue	cmpu216n4001ud5ugmt8r8aee	Fuel type	Petrol	\N	1
cmpwlwlpv0071d52k9ib312oo	cmpu216n4001ud5ugmt8r8aee	Noise level	57	dB	2
cmpwlwlpv0072d52k4xzzj8pv	cmpu216n4001ud5ugmt8r8aee	Run time	7	h	3
cmpwlwlpv0073d52kxwiasjo3	cmpu216n5001wd5ugfjewtyji	Rated power	5.0	kW	0
cmpwlwlpv0074d52k0f6j11bt	cmpu216n5001wd5ugfjewtyji	Sockets	2 x 220V	\N	1
cmpwlwlpv0075d52kwf2fs2i9	cmpu216n5001wd5ugfjewtyji	Starter	Electric	\N	2
cmpwlwlpv0076d52kkdo6dl5m	cmpu216n5001wd5ugfjewtyji	Tank volume	25	L	3
cmpwlwlpv0077d52kwuzg8wlv	cmpu216n6001yd5ugu0fr6hvo	Rated power	5.0	kW	0
cmpwlwlpv0078d52kyf67pta4	cmpu216n6001yd5ugu0fr6hvo	Fuel tank	25	L	1
cmpwlwlpv0079d52kuba19ym6	cmpu216n6001yd5ugu0fr6hvo	Run time	8	h	2
cmpwlwlpv007ad52ku2rcbjq4	cmpu216n6001yd5ugu0fr6hvo	Output phase	Single-phase	\N	3
cmpwlwlpv007bd52knfp0jkky	cmpu216n70020d5ugl2fz23t1	Inspection reason	AVR and alternator test	\N	0
cmpwlwlpv007cd52kl1cygxwd	cmpu216n70020d5ugl2fz23t1	Rated power	5.0	kW	1
cmpwlwlpv007dd52k2u7vf5k4	cmpu216n70020d5ugl2fz23t1	Fuel type	Petrol	\N	2
cmpwlwlpv007ed52k59mqfkpr	cmpu216n70020d5ugl2fz23t1	Transport kit	Wheel set	\N	3
cmpwlwlpv007fd52kj58t34i8	cmpu216n80022d5ug8rmjz67e	Rated power	6.0	kVA	0
cmpwlwlpv007gd52kbo4s6qt2	cmpu216n80022d5ug8rmjz67e	Phase	Three-phase	\N	1
cmpwlwlpv007hd52kakapzu6g	cmpu216n80022d5ug8rmjz67e	Run time	9	h	2
cmpwlwlpv007id52krkx4u93y	cmpu216n80022d5ug8rmjz67e	Starter	Electric	\N	3
cmpwlwlpv007jd52kxvvoghbj	cmpu216n90024d5ugqss61ynu	Receiver volume	50	L	0
cmpwlwlpv007kd52k90pfruw0	cmpu216n90024d5ugqss61ynu	Pressure	10	bar	1
cmpwlwlpv007ld52k5apiuwqr	cmpu216n90024d5ugqss61ynu	Air flow	220	L/min	2
cmpwlwlpv007md52k0yu4he45	cmpu216n90024d5ugqss61ynu	Portability	Wheel base	\N	3
cmpwlwlpv007nd52kchfwdtd5	cmpu216na0026d5uggtjk00n5	Receiver volume	100	L	0
cmpwlwlpv007od52k7gbom0tb	cmpu216na0026d5uggtjk00n5	Air flow	440	L/min	1
cmpwlwlpv007pd52k7kqa8f06	cmpu216na0026d5uggtjk00n5	Drive type	Belt	\N	2
cmpwlwlpv007qd52kx3nx7e27	cmpu216na0026d5uggtjk00n5	Pressure	10	bar	3
cmpwlwlpv007rd52ktnqwu53v	cmpu216nb0028d5ugquezq4xy	Receiver volume	50	L	0
cmpwlwlpv007sd52k6563517o	cmpu216nb0028d5ugquezq4xy	Air flow	420	L/min	1
cmpwlwlpv007td52k989lt6nd	cmpu216nb0028d5ugquezq4xy	Pressure switch	Automatic	\N	2
cmpwlwlpv007ud52kz4l61hdj	cmpu216nb0028d5ugquezq4xy	Country of assembly	Belarus	\N	3
cmpwlwlpv007vd52kljawc49y	cmpu216nc002ad5ugd8hcmskj	Receiver volume	50	L	0
cmpwlwlpv007wd52k02cyr4a7	cmpu216nc002ad5ugd8hcmskj	Air flow	260	L/min	1
cmpwlwlpv007xd52kvd6650jh	cmpu216nc002ad5ugd8hcmskj	Repair note	Valve block replacement	\N	2
cmpwlwlpv007yd52kb01u55r3	cmpu216nc002ad5ugd8hcmskj	Drive type	Direct	\N	3
cmpwlwlpv007zd52kodp0x1ox	cmpu216nd002cd5ug21i5wbkv	Receiver volume	24	L	0
cmpwlwlpv0080d52k85tuljxm	cmpu216nd002cd5ug21i5wbkv	Oil-free	Yes	\N	1
cmpwlwlpv0081d52kemclzayk	cmpu216nd002cd5ug21i5wbkv	Air flow	200	L/min	2
cmpwlwlpv0082d52kdwe8p2jf	cmpu216nd002cd5ug21i5wbkv	Noise level	82	dB	3
cmpwlwlpv0083d52keewg9kjy	cmpu216ne002ed5ug1748imv1	Working height	7.3	m	0
cmpwlwlpv0084d52kzbks4g4g	cmpu216ne002ed5ug1748imv1	Platform size	2.0 x 0.6	m	1
cmpwlwlpv0085d52k3dclmghx	cmpu216ne002ed5ug1748imv1	Material	Aluminum	\N	2
cmpwlwlpv0086d52k9cm63u9i	cmpu216ne002ed5ug1748imv1	Usage	Indoor and facade work	\N	3
cmpwlwlpv0087d52khnq3okui	cmpu216nf002gd5ugzceozmj9	Working height	6.2	m	0
cmpwlwlpv0088d52kewzjhqhx	cmpu216nf002gd5ugzceozmj9	Platform load	200	kg	1
cmpwlwlpv0089d52kzpbo3p3m	cmpu216nf002gd5ugzceozmj9	Assembly time	20	min	2
cmpwlwlpv008ad52ky7qb8jew	cmpu216nf002gd5ugzceozmj9	Transport mode	Compact sections	\N	3
cmpwlwlpv008bd52kyoez83bl	cmpu216ng002id5ug3p3xiw19	Working height	4.9	m	0
cmpwlwlpv008cd52kydhv3b0n	cmpu216ng002id5ug3p3xiw19	Frame width	0.85	m	1
cmpwlwlpv008dd52kp84y8715	cmpu216ng002id5ug3p3xiw19	Application	Stairwells and interiors	\N	2
cmpwlwlpv008ed52kvu0oa52i	cmpu216ng002id5ug3p3xiw19	Material	Aluminum	\N	3
cmpwlwlpv008fd52kxki4ieyo	cmpu216nh002kd5ugmw8ldssu	Inspection note	Inventory and locking pin audit	\N	0
cmpwlwlpv008gd52kfs0ltwb5	cmpu216nh002kd5ugmw8ldssu	Working height	5.4	m	1
cmpwlwlpv008hd52k3y3sr3ie	cmpu216nh002kd5ugmw8ldssu	Platform width	0.75	m	2
cmpwlwlpv008id52ku0js3zds	cmpu216nh002kd5ugmw8ldssu	Material	Aluminum	\N	3
cmpwlwlpv008jd52kbn4ur5w4	cmpu216ni002md5ugaac4trp1	Archive note	Not offered for new rentals	\N	0
cmpwlwlpv008kd52k6tqsv15x	cmpu216ni002md5ugaac4trp1	Working height	12	m	1
cmpwlwlpv008ld52ki3wvr2zh	cmpu216ni002md5ugaac4trp1	Material	Steel	\N	2
cmpwlwlpv008md52kuvxzalev	cmpu216ni002md5ugaac4trp1	Sections	Facade frame set	\N	3
cmpwlwlpv008nd52k2usizcc4	cmpu216ni002od5ugcfr8ytc8	Welding current	200	A	0
cmpwlwlpv008od52k7gprbm7j	cmpu216ni002od5ugcfr8ytc8	Electrode diameter	4	mm	1
cmpwlwlpv008pd52k95x0qfcv	cmpu216ni002od5ugcfr8ytc8	Input voltage	220	V	2
cmpwlwlpv008qd52kibsvw38x	cmpu216ni002od5ugcfr8ytc8	Protection class	IP23S	\N	3
cmpwlwlpv008rd52ko66pamzq	cmpu216nj002qd5ug3rjdm07r	Welding current	200	A	0
cmpwlwlpv008sd52kjxucnor5	cmpu216nj002qd5ug3rjdm07r	Duty cycle	60	%	1
cmpwlwlpv008td52k0fakeag2	cmpu216nj002qd5ug3rjdm07r	Hot start	Yes	\N	2
cmpwlwlpv008ud52kj3z0j735	cmpu216nj002qd5ug3rjdm07r	Arc force	Adjustable	\N	3
cmpwlwlpv008vd52kcwlkhgpi	cmpu216nl002sd5uga8ohegg9	Welding current	200	A	0
cmpwlwlpv008wd52kb6t7x68k	cmpu216nl002sd5uga8ohegg9	Display	Digital	\N	1
cmpwlwlpv008xd52kft1k1778	cmpu216nl002sd5uga8ohegg9	Electrode diameter	5	mm	2
cmpwlwlpv008yd52kf92pws05	cmpu216nl002sd5uga8ohegg9	Cooling	Forced air	\N	3
cmpwlwlpv008zd52k0x7z1qrk	cmpu216nl002ud5ugscckzjwu	Maintenance note	Fan and cable inspection	\N	0
cmpwlwlpv0090d52kcfsz70ve	cmpu216nl002ud5ugscckzjwu	Welding current	220	A	1
cmpwlwlpv0091d52ksst30jgu	cmpu216nl002ud5ugscckzjwu	Voltage range	140-260	V	2
cmpwlwlpv0092d52kp8zh9n52	cmpu216nl002ud5ugscckzjwu	Cooling	Forced	\N	3
cmpwlwlpv0093d52k1rcd5x42	cmpu216nn002wd5ugx53nijsp	Welding current	250	A	0
cmpwlwlpv0094d52kefc763i2	cmpu216nn002wd5ugx53nijsp	Duty cycle	60	%	1
cmpwlwlpv0095d52kbc3j6ppc	cmpu216nn002wd5ugx53nijsp	Electrode diameter	6	mm	2
cmpwlwlpv0096d52kwmjy8oa3	cmpu216nn002wd5ugx53nijsp	Application	Heavy steel profiles	\N	3
cmpwlwlpv0097d52kku27i3co	cmpu216no002yd5ugw5q3lswn	Disc diameter	350	mm	0
cmpwlwlpv0098d52kavepj7qf	cmpu216no002yd5ugw5q3lswn	Cutting depth	125	mm	1
cmpwlwlpv0099d52kiehpuzkv	cmpu216no002yd5ugw5q3lswn	Engine type	Petrol	\N	2
cmpwlwlpv009ad52ki3ffq7rr	cmpu216no002yd5ugw5q3lswn	Water connection	Yes	\N	3
cmpwlwlpw009bd52kz1c8afp1	cmpu216np0030d5ugfq63q4af	Disc diameter	350	mm	0
cmpwlwlpw009cd52kqr9oxcom	cmpu216np0030d5ugfq63q4af	Cutting depth	125	mm	1
cmpwlwlpw009dd52kf7g6sdoz	cmpu216np0030d5ugfq63q4af	Power source	Petrol	\N	2
cmpwlwlpw009ed52k9mers90l	cmpu216np0030d5ugfq63q4af	Use case	Concrete and steel	\N	3
cmpwlwlpw009fd52k5x4lqfhe	cmpu216nq0032d5ugzw6k0y5s	Blade diameter	305	mm	0
cmpwlwlpw009gd52ko3vrkuz4	cmpu216nq0032d5ugzw6k0y5s	Cut type	Cold cut	\N	1
cmpwlwlpw009hd52k7k0pnp6q	cmpu216nq0032d5ugzw6k0y5s	Material	Metal profiles	\N	2
cmpwlwlpw009id52kpsxg85xh	cmpu216nq0032d5ugzw6k0y5s	Power supply	220	V	3
cmpwlwlpw009jd52kukowgr9n	cmpu216nr0034d5ugmb25ejc3	Blade set	Twin disc	\N	0
cmpwlwlpw009kd52krgkuvx0h	cmpu216nr0034d5ugmb25ejc3	Cut width	10-40	mm	1
cmpwlwlpw009ld52kad2jkax1	cmpu216nr0034d5ugmb25ejc3	Repair note	Blade guard replacement	\N	2
cmpwlwlpw009md52kkruxo5fy	cmpu216nr0034d5ugmb25ejc3	Dust extraction	Supported	\N	3
cmpwlwlpw009nd52ks48zxyc8	cmpu216ns0036d5ug0xnnwuav	Archive note	Historical record only	\N	0
cmpwlwlpw009od52kokpzx6de	cmpu216ns0036d5ug0xnnwuav	Disc diameter	500	mm	1
cmpwlwlpw009pd52knvsf2h2w	cmpu216ns0036d5ug0xnnwuav	Engine type	Petrol	\N	2
cmpwlwlpw009qd52k1086fg3t	cmpu216ns0036d5ug0xnnwuav	Use case	Road repairs	\N	3
cmpwlwlpw009rd52ksur0huze	cmpu216ns0038d5ugivrykrme	Range	30	m	0
cmpwlwlpw009sd52k40121ftj	cmpu216ns0038d5ugivrykrme	Beam color	Green	\N	1
cmpwlwlpw009td52kxqa2d0ct	cmpu216ns0038d5ugivrykrme	Accuracy	+/- 0.2	mm/m	2
cmpwlwlpw009ud52khpbozkhl	cmpu216ns0038d5ugivrykrme	Bluetooth	Yes	\N	3
cmpwlwlpw009vd52kz9t37ey1	cmpu216nt003ad5ugcgyrtsjo	Range	800	m	0
cmpwlwlpw009wd52kb3s6eyw7	cmpu216nt003ad5ugcgyrtsjo	Protection	IP67	\N	1
cmpwlwlpw009xd52k549wa7yo	cmpu216nt003ad5ugcgyrtsjo	Accuracy	+/- 1.5	mm at 30 m	2
cmpwlwlpw009yd52k3sxwqv8h	cmpu216nt003ad5ugcgyrtsjo	Application	Outdoor grading	\N	3
cmpwlwlpw009zd52k2kn1z1vv	cmpu216nu003cd5ugz8tfmbiy	Range	100	m	0
cmpwlwlpw00a0d52k7coa09lw	cmpu216nu003cd5ugz8tfmbiy	Accuracy	+/- 1.5	mm	1
cmpwlwlpw00a1d52kwb132k8o	cmpu216nu003cd5ugz8tfmbiy	Display	Backlit	\N	2
cmpwlwlpw00a2d52knlh17gqp	cmpu216nu003cd5ugz8tfmbiy	Functions	Area and volume	\N	3
cmpwlwlpw00a3d52knz8zdt9y	cmpu216nv003ed5ugrwn6xnla	Calibration note	Pending calibration	\N	0
cmpwlwlpw00a4d52kb1fteoeg	cmpu216nv003ed5ugrwn6xnla	Range	20	m	1
cmpwlwlpw00a5d52kjrnj2o2p	cmpu216nv003ed5ugrwn6xnla	Beam planes	1 x 360 deg	\N	2
cmpwlwlpw00a6d52kxiah708l	cmpu216nv003ed5ugrwn6xnla	Tripod thread	1/4	\N	3
cmpwlwlpw00a7d52ktomlxvdu	cmpu216nx003gd5ug6jpvmysq	Angular accuracy	5	sec	0
cmpwlwlpw00a8d52kg9zyvb0u	cmpu216nx003gd5ug6jpvmysq	Range with prism	3000	m	1
cmpwlwlpw00a9d52kx7fxzo1v	cmpu216nx003gd5ug6jpvmysq	Storage	Internal memory	\N	2
cmpwlwlpw00aad52ktkfgte4y	cmpu216nx003gd5ug6jpvmysq	Use case	Construction layout	\N	3
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Favorite" (id, "userId", "equipmentId", "createdAt") FROM stdin;
cmpwlwlsq00f5d52k162xdi11	cmpu2165a0003d5ugp81cvo3c	cmpu216mb0010d5ugzabpsrkm	2026-06-02 12:21:19.323
cmpwlwlsq00f6d52k8s34ygq6	cmpu2166y0005d5ugb4frzf2f	cmpu216mq0016d5ugpx6o8yxs	2026-06-02 12:21:19.323
cmpwlwlsq00f7d52kg46506m3	cmpu2168h0007d5ugnf2jgise	cmpu216mu001ed5ug5aodaewy	2026-06-02 12:21:19.323
cmpwlwlsq00f8d52kige6s9la	cmpu2169y0009d5ugfhga2ez2	cmpu216mx001kd5ug4h49hfpn	2026-06-02 12:21:19.323
cmpwlwlsq00f9d52kozjo5bzc	cmpu216bg000bd5ugd2qb3qvf	cmpu216n2001sd5ugmcaje11z	2026-06-02 12:21:19.323
cmpwlwlsq00fad52k6m0b812m	cmpu216cy000dd5uglc96kk2d	cmpu216n6001yd5ugu0fr6hvo	2026-06-02 12:21:19.323
cmpwlwlsq00fbd52kjeolr0uh	cmpu216ee000fd5ug53k7bbtd	cmpu216na0026d5uggtjk00n5	2026-06-02 12:21:19.323
cmpwlwlsq00fcd52ks635wnvb	cmpu216fw000hd5ug1jlu1bgl	cmpu216nd002cd5ug21i5wbkv	2026-06-02 12:21:19.323
cmpwlwlsq00fdd52kbs0sag5f	cmpu216hd000jd5ugc1fzmsz3	cmpu216nh002kd5ugmw8ldssu	2026-06-02 12:21:19.323
cmpwlwlsq00fed52kzuoayxt6	cmpu216iv000ld5ug1eear6f0	cmpu216nl002sd5uga8ohegg9	2026-06-02 12:21:19.323
cmpwlwlsq00ffd52kncsfr5xk	cmpu216kd000nd5ugzsuleofa	cmpu216np0030d5ugfq63q4af	2026-06-02 12:21:19.323
cmpwlwlsq00fgd52kjpmbwhr6	cmpu216lu000pd5ugwgq7vwpc	cmpu216ns0038d5ugivrykrme	2026-06-02 12:21:19.323
cmpwlwlsq00fhd52ks0edc5mq	cmpu2165a0003d5ugp81cvo3c	cmpu216nx003gd5ug6jpvmysq	2026-06-02 12:21:19.323
cmpwlwlsq00fid52ku0nlj7s5	cmpu2166y0005d5ugb4frzf2f	cmpu216mp0014d5ugu0lz927j	2026-06-02 12:21:19.323
cmpwlwlsq00fjd52k1q0d6j49	cmpu2168h0007d5ugnf2jgise	cmpu216mt001cd5ug9xa7nqhf	2026-06-02 12:21:19.323
cmpwlwlsq00fkd52kneiqjhoq	cmpu2169y0009d5ugfhga2ez2	cmpu216mw001id5ughgbdbbke	2026-06-02 12:21:19.323
cmpwlwlsq00fld52km40s5p2i	cmpu216bg000bd5ugd2qb3qvf	cmpu216n0001qd5ugicavws33	2026-06-02 12:21:19.323
cmpwlwlsq00fmd52kso8jmxfy	cmpu216cy000dd5uglc96kk2d	cmpu216n5001wd5ugfjewtyji	2026-06-02 12:21:19.323
cmpwlwlsq00fnd52k0x1mjgkc	cmpu216ee000fd5ug53k7bbtd	cmpu216n90024d5ugqss61ynu	2026-06-02 12:21:19.323
cmpwlwlsq00fod52kf6ui8zv4	cmpu216fw000hd5ug1jlu1bgl	cmpu216nc002ad5ugd8hcmskj	2026-06-02 12:21:19.323
cmpwlwlsq00fpd52kny0zs1gc	cmpu216hd000jd5ugc1fzmsz3	cmpu216ng002id5ug3p3xiw19	2026-06-02 12:21:19.323
cmpwlwlsq00fqd52kjv2uo7uc	cmpu216iv000ld5ug1eear6f0	cmpu216nj002qd5ug3rjdm07r	2026-06-02 12:21:19.323
cmpwlwlsq00frd52kk0ljrfoy	cmpu216kd000nd5ugzsuleofa	cmpu216no002yd5ugw5q3lswn	2026-06-02 12:21:19.323
cmpwlwlsq00fsd52k61suxgjc	cmpu216lu000pd5ugwgq7vwpc	cmpu216nr0034d5ugmb25ejc3	2026-06-02 12:21:19.323
cmpwlwlsq00ftd52khxk1qwkh	cmpu2165a0003d5ugp81cvo3c	cmpu216nv003ed5ugrwn6xnla	2026-06-02 12:21:19.323
cmpwlwlsq00fud52kso3jmu52	cmpu2166y0005d5ugb4frzf2f	cmpu216mo0012d5ugujtqybh2	2026-06-02 12:21:19.323
cmpwlwlsq00fvd52klnym4ykr	cmpu2168h0007d5ugnf2jgise	cmpu216ms001ad5ugemfo87rh	2026-06-02 12:21:19.323
cmpwlwlsq00fwd52kzzu0tred	cmpu2169y0009d5ugfhga2ez2	cmpu216mv001gd5ugfa8f7hth	2026-06-02 12:21:19.323
cmpwlwlsq00fxd52kicc40wrx	cmpu216bg000bd5ugd2qb3qvf	cmpu216mz001od5ug0u5b0jol	2026-06-02 12:21:19.323
cmpwlwlsq00fyd52kfing9hu3	cmpu216cy000dd5uglc96kk2d	cmpu216n4001ud5ugmt8r8aee	2026-06-02 12:21:19.323
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, "rentalOrderId", amount, status, method, "paidAt", "createdAt", "updatedAt") FROM stdin;
cmpwlwltb00h3d52k0gxmadyf	cmpwlwlr800acd52k22je59bh	710.00	FAILED	BANK_TRANSFER_MOCK	\N	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00h4d52kpifc8o2a	cmpwlwlrm00agd52kphlbkk8d	799.00	PAID	CASH	2026-06-02 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00h5d52ksfwkd7ty	cmpwlwlrn00ald52ksbgjjps8	1916.00	PAID	CARD_MOCK	2026-05-26 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00h6d52k71vwa5sj	cmpwlwlrp00ard52kbz70xf9q	665.00	PAID	CASH	2026-04-14 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00h7d52k9m6bvkt1	cmpwlwlrq00avd52kt5kg3auy	1180.00	REFUNDED	CARD_MOCK	2026-05-15 10:00:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00h8d52kdlplwf2t	cmpwlwlrr00b0d52kivc0dpkm	3633.00	PENDING	CARD_MOCK	\N	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00h9d52kptjja295	cmpwlwlrt00b6d52ks1dh06k6	640.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00had52kdqa8rx80	cmpwlwlru00bad52kaku3tktu	1707.00	PAID	CASH	2026-04-18 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hbd52kod8cm0gu	cmpwlwlrv00bfd52kv9d603ap	2025.00	PAID	CARD_MOCK	2026-05-26 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hcd52kgcc3qa1n	cmpwlwlrx00bpd52kqor08chd	2062.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hdd52krbigzgbq	cmpwlwlry00bud52k75dnzvxf	1457.00	PAID	CARD_MOCK	2026-06-06 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hed52ko640hoo4	cmpwlwlrz00c0d52ksl6c1yin	602.00	PAID	CASH	2026-04-23 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hfd52k58aopgb8	cmpwlwls000c4d52kwqmx5wdi	930.00	REFUNDED	CARD_MOCK	2026-05-24 10:00:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hgd52krcbqq981	cmpwlwls100c9d52krnfhrseb	2916.00	PAID	CASH	2026-05-26 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hhd52kro6boek2	cmpwlwls200cfd52klfsc3t6l	409.00	PENDING	CARD_MOCK	\N	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hid52kk6p8pyf2	cmpwlwls300cjd52ks8aera1b	538.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hjd52kewc1pdq6	cmpwlwls400cod52kn1ds76ef	2163.00	PAID	CARD_MOCK	2026-04-28 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hkd52kpfipprop	cmpwlwls600cud52kw77opudy	1056.00	PENDING	CARD_MOCK	\N	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hld52kkb9iukq4	cmpwlwls700cyd52kao73boez	978.00	PAID	CARD_MOCK	2026-05-27 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
cmpwlwltb00hmd52kcfyd0v44	cmpwlwls800d3d52k92uh6uc3	1612.00	PAID	CASH	2026-05-01 08:30:00	2026-06-02 12:21:19.344	2026-06-02 12:21:19.344
\.


--
-- Data for Name: RentalOrder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RentalOrder" (id, "userId", "orderNumber", status, "startDate", "endDate", "deliveryType", "deliveryAddress", "customerComment", "managerComment", subtotal, "depositTotal", "deliveryPrice", "totalPrice", "createdAt", "updatedAt") FROM stdin;
cmpwlwls800d3d52k92uh6uc3	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0021	COMPLETED	2026-05-01 00:00:00	2026-05-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Техника возвращена и проверена складской командой.	472.00	1140.00	0.00	1612.00	2026-06-02 12:21:19.304	2026-06-02 12:21:19.304
cmpwlwls900d9d52kngmt6zxa	cmpu216iv000ld5ug1eear6f0	BR-202605-0022	CANCELLED	2026-06-01 00:00:00	2026-06-03 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Заявка отменена по просьбе клиента после изменения графика работ.	330.00	520.00	25.00	875.00	2026-06-02 12:21:19.305	2026-06-02 12:21:19.305
cmpwlwlsa00ddd52kisf83n3y	cmpu216kd000nd5ugzsuleofa	BR-202605-0023	APPROVED	2026-06-05 00:00:00	2026-06-09 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка подтверждена после проверки остатков и контактных данных.	640.00	635.00	0.00	1275.00	2026-06-02 12:21:19.306	2026-06-02 12:21:19.306
cmpwlwlsb00did52ka69x2cbg	cmpu216lu000pd5ugwgq7vwpc	BR-202605-0024	PENDING	2026-06-08 00:00:00	2026-06-13 23:59:59.999	DELIVERY	Минск, улица Купревича, 1, сервисный проезд технопарка	Бригада работает только по будням.	\N	1800.00	1530.00	25.00	3355.00	2026-06-02 12:21:19.307	2026-06-02 12:21:19.307
cmpwlwlsc00dod52kj93jperw	cmpu2165a0003d5ugp81cvo3c	BR-202605-0025	COMPLETED	2026-05-05 00:00:00	2026-05-10 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Техника возвращена и проверена складской командой.	816.00	680.00	0.00	1496.00	2026-06-02 12:21:19.308	2026-06-02 12:21:19.308
cmpwlwlsd00dsd52kqqqc948a	cmpu2166y0005d5ugb4frzf2f	BR-202605-0026	REJECTED	2026-06-03 00:00:00	2026-06-04 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Отклонено из-за пересечения с техническим обслуживанием оборудования.	440.00	1160.00	25.00	1625.00	2026-06-02 12:21:19.309	2026-06-02 12:21:19.309
cmpwlwlse00dxd52kik09yh5p	cmpu2168h0007d5ugnf2jgise	BR-202605-0027	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1056.00	640.00	0.00	1696.00	2026-06-02 12:21:19.311	2026-06-02 12:21:19.311
cmpwlwlsf00e3d52kjffyaag9	cmpu2169y0009d5ugfhga2ez2	BR-202605-0028	APPROVED	2026-06-04 00:00:00	2026-06-08 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Заявка подтверждена после проверки остатков и контактных данных.	475.00	500.00	25.00	1000.00	2026-06-02 12:21:19.312	2026-06-02 12:21:19.312
cmpwlwlsg00e7d52k4trp2sxa	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0029	PENDING	2026-06-13 00:00:00	2026-06-18 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	1224.00	1020.00	0.00	2244.00	2026-06-02 12:21:19.313	2026-06-02 12:21:19.313
cmpwlwlsh00ecd52kmyohtubx	cmpu216cy000dd5uglc96kk2d	BR-202605-0030	COMPLETED	2026-05-10 00:00:00	2026-05-15 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	Техника возвращена и проверена складской командой.	1392.00	1110.00	25.00	2527.00	2026-06-02 12:21:19.314	2026-06-02 12:21:19.314
cmpwlwlsi00eid52kuy88sjjb	cmpu216ee000fd5ug53k7bbtd	BR-202605-0031	CANCELLED	2026-06-10 00:00:00	2026-06-11 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Заявка отменена по просьбе клиента после изменения графика работ.	180.00	410.00	0.00	590.00	2026-06-02 12:21:19.315	2026-06-02 12:21:19.315
cmpwlwlsj00emd52k3yfucw1m	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0032	APPROVED	2026-06-02 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Заявка подтверждена после проверки остатков и контактных данных.	428.00	520.00	25.00	973.00	2026-06-02 12:21:19.316	2026-06-02 12:21:19.316
cmpwlwlsl00erd52kl2vzlqdb	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0033	ACTIVE	2026-05-26 00:00:00	2026-06-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	784.00	490.00	0.00	1274.00	2026-06-02 12:21:19.317	2026-06-02 12:21:19.317
cmpwlwlsm00exd52k2999oy0p	cmpu216iv000ld5ug1eear6f0	BR-202605-0034	COMPLETED	2026-05-14 00:00:00	2026-05-18 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Техника возвращена и проверена складской командой.	120.00	120.00	25.00	265.00	2026-06-02 12:21:19.318	2026-06-02 12:21:19.318
cmpwlwlsn00f1d52ka3hde0d7	cmpu216kd000nd5ugzsuleofa	BR-202605-0035	PENDING	2026-06-09 00:00:00	2026-06-15 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	1050.00	740.00	0.00	1790.00	2026-06-02 12:21:19.319	2026-06-02 12:21:19.319
cmpwlwlr800acd52k22je59bh	cmpu2165a0003d5ugp81cvo3c	BR-202605-0001	PENDING	2026-06-05 00:00:00	2026-06-07 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Ожидаем финальное подтверждение по времени получения.	270.00	440.00	0.00	710.00	2026-06-02 12:21:19.269	2026-06-02 12:21:19.269
cmpwlwlrm00agd52kphlbkk8d	cmpu2166y0005d5ugb4frzf2f	BR-202605-0002	APPROVED	2026-06-02 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Заявка подтверждена после проверки остатков и контактных данных.	344.00	430.00	25.00	799.00	2026-06-02 12:21:19.282	2026-06-02 12:21:19.282
cmpwlwlrn00ald52ksbgjjps8	cmpu2168h0007d5ugnf2jgise	BR-202605-0003	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1176.00	740.00	0.00	1916.00	2026-06-02 12:21:19.284	2026-06-02 12:21:19.284
cmpwlwlrp00ard52kbz70xf9q	cmpu2169y0009d5ugfhga2ez2	BR-202605-0004	COMPLETED	2026-04-14 00:00:00	2026-04-18 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Техника возвращена и проверена складской командой.	320.00	320.00	25.00	665.00	2026-06-02 12:21:19.285	2026-06-02 12:21:19.285
cmpwlwlrq00avd52kt5kg3auy	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0005	CANCELLED	2026-05-15 00:00:00	2026-05-20 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка отменена по просьбе клиента после изменения графика работ.	1452.00	1180.00	0.00	2632.00	2026-06-02 12:21:19.286	2026-06-02 12:21:19.286
cmpwlwlrr00b0d52kivc0dpkm	cmpu216cy000dd5uglc96kk2d	BR-202605-0006	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	\N	1338.00	2270.00	25.00	3633.00	2026-06-02 12:21:19.288	2026-06-02 12:21:19.288
cmpwlwlrt00b6d52ks1dh06k6	cmpu216ee000fd5ug53k7bbtd	BR-202605-0007	APPROVED	2026-06-01 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Заявка подтверждена после проверки остатков и контактных данных.	280.00	360.00	0.00	640.00	2026-06-02 12:21:19.289	2026-06-02 12:21:19.289
cmpwlwlru00bad52kaku3tktu	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0008	COMPLETED	2026-04-18 00:00:00	2026-04-21 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Техника возвращена и проверена складской командой.	752.00	930.00	25.00	1707.00	2026-06-02 12:21:19.29	2026-06-02 12:21:19.29
cmpwlwlrv00bfd52kv9d603ap	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0009	ACTIVE	2026-05-26 00:00:00	2026-06-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1240.00	785.00	0.00	2025.00	2026-06-02 12:21:19.291	2026-06-02 12:21:19.291
cmpwlwlrw00bld52k4xkp2wvj	cmpu216iv000ld5ug1eear6f0	BR-202605-0010	REJECTED	2026-06-03 00:00:00	2026-06-08 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Отклонено из-за пересечения с техническим обслуживанием оборудования.	360.00	300.00	25.00	685.00	2026-06-02 12:21:19.292	2026-06-02 12:21:19.292
cmpwlwlrx00bpd52kqor08chd	cmpu216kd000nd5ugzsuleofa	BR-202605-0011	PENDING	2026-06-05 00:00:00	2026-06-07 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	762.00	1300.00	0.00	2062.00	2026-06-02 12:21:19.293	2026-06-02 12:21:19.293
cmpwlwlry00bud52k75dnzvxf	cmpu216lu000pd5ugwgq7vwpc	BR-202605-0012	APPROVED	2026-06-06 00:00:00	2026-06-09 23:59:59.999	DELIVERY	Минск, улица Купревича, 1, сервисный проезд технопарка	Бригада работает только по будням.	Заявка подтверждена после проверки остатков и контактных данных.	632.00	800.00	25.00	1457.00	2026-06-02 12:21:19.294	2026-06-02 12:21:19.294
cmpwlwlrz00c0d52ksl6c1yin	cmpu2165a0003d5ugp81cvo3c	BR-202605-0013	COMPLETED	2026-04-23 00:00:00	2026-04-26 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Техника возвращена и проверена складской командой.	272.00	330.00	0.00	602.00	2026-06-02 12:21:19.296	2026-06-02 12:21:19.296
cmpwlwls000c4d52kwqmx5wdi	cmpu2166y0005d5ugb4frzf2f	BR-202605-0014	CANCELLED	2026-05-24 00:00:00	2026-05-28 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Заявка отменена по просьбе клиента после изменения графика работ.	930.00	930.00	25.00	1885.00	2026-06-02 12:21:19.297	2026-06-02 12:21:19.297
cmpwlwls100c9d52krnfhrseb	cmpu2168h0007d5ugnf2jgise	BR-202605-0015	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1736.00	1180.00	0.00	2916.00	2026-06-02 12:21:19.298	2026-06-02 12:21:19.298
cmpwlwls200cfd52klfsc3t6l	cmpu2169y0009d5ugfhga2ez2	BR-202605-0016	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Ожидаем финальное подтверждение по времени получения.	144.00	240.00	25.00	409.00	2026-06-02 12:21:19.299	2026-06-02 12:21:19.299
cmpwlwls300cjd52ks8aera1b	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0017	APPROVED	2026-06-05 00:00:00	2026-06-08 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка подтверждена после проверки остатков и контактных данных.	248.00	290.00	0.00	538.00	2026-06-02 12:21:19.3	2026-06-02 12:21:19.3
cmpwlwls400cod52kn1ds76ef	cmpu216cy000dd5uglc96kk2d	BR-202605-0018	COMPLETED	2026-04-28 00:00:00	2026-05-01 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	Техника возвращена и проверена складской командой.	968.00	1170.00	25.00	2163.00	2026-06-02 12:21:19.301	2026-06-02 12:21:19.301
cmpwlwls600cud52kw77opudy	cmpu216ee000fd5ug53k7bbtd	BR-202605-0019	PENDING	2026-06-13 00:00:00	2026-06-18 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Ожидаем финальное подтверждение по времени получения.	576.00	480.00	0.00	1056.00	2026-06-02 12:21:19.302	2026-06-02 12:21:19.302
cmpwlwls700cyd52kao73boez	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0020	ACTIVE	2026-05-27 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Аренда в процессе, оборудование зарезервировано за клиентом.	553.00	400.00	25.00	978.00	2026-06-02 12:21:19.303	2026-06-02 12:21:19.303
\.


--
-- Data for Name: RentalOrderItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RentalOrderItem" (id, "rentalOrderId", "equipmentId", quantity, "dailyPrice", "daysCount", "lineTotal", "createdAt") FROM stdin;
cmpwlwlr800aed52kc1n4cz9v	cmpwlwlr800acd52k22je59bh	cmpu216mb0010d5ugzabpsrkm	2	45.00	3	710.00	2026-06-02 12:21:19.269
cmpwlwlrm00aid52k8xv6cxf9	cmpwlwlrm00agd52kphlbkk8d	cmpu216mp0014d5ugu0lz927j	1	48.00	4	432.00	2026-06-02 12:21:19.282
cmpwlwlrm00ajd52k0khihk9u	cmpwlwlrm00agd52kphlbkk8d	cmpu216mw001id5ughgbdbbke	1	38.00	4	342.00	2026-06-02 12:21:19.282
cmpwlwlrn00and52kedz067je	cmpwlwlrn00ald52ksbgjjps8	cmpu216ms001ad5ugemfo87rh	1	35.00	8	460.00	2026-06-02 12:21:19.284
cmpwlwlrn00aod52kpwscuv59	cmpwlwlrn00ald52ksbgjjps8	cmpu216my001md5ugh8znvup9	1	44.00	8	572.00	2026-06-02 12:21:19.284
cmpwlwlrn00apd52kd61ko6tz	cmpwlwlrn00ald52ksbgjjps8	cmpu216n6001yd5ugu0fr6hvo	1	68.00	8	884.00	2026-06-02 12:21:19.284
cmpwlwlrp00atd52k95y4d2ay	cmpwlwlrp00ard52kbz70xf9q	cmpu216mu001ed5ug5aodaewy	2	32.00	5	640.00	2026-06-02 12:21:19.285
cmpwlwlrq00axd52k06vk57mj	cmpwlwlrq00avd52kt5kg3auy	cmpu216mx001kd5ug4h49hfpn	2	55.00	6	1180.00	2026-06-02 12:21:19.286
cmpwlwlrq00ayd52kzd99ie4z	cmpwlwlrq00avd52kt5kg3auy	cmpu216n5001wd5ugfjewtyji	2	66.00	6	1452.00	2026-06-02 12:21:19.286
cmpwlwlrr00b2d52k9w7zvi4o	cmpwlwlrr00b0d52kivc0dpkm	cmpu216mz001od5ug0u5b0jol	2	46.00	3	706.00	2026-06-02 12:21:19.288
cmpwlwlrr00b3d52k61jtirm1	cmpwlwlrr00b0d52kivc0dpkm	cmpu216n80022d5ug8rmjz67e	2	82.00	3	1332.00	2026-06-02 12:21:19.288
cmpwlwlrr00b4d52kf3gatidk	cmpwlwlrr00b0d52kivc0dpkm	cmpu216ne002ed5ug1748imv1	2	95.00	3	1570.00	2026-06-02 12:21:19.288
cmpwlwlrt00b8d52ksmuioic6	cmpwlwlrt00b6d52ks1dh06k6	cmpu216n4001ud5ugmt8r8aee	1	70.00	4	640.00	2026-06-02 12:21:19.289
cmpwlwlru00bcd52kwclski92	cmpwlwlru00bad52kaku3tktu	cmpu216n6001yd5ugu0fr6hvo	2	68.00	4	1224.00	2026-06-02 12:21:19.29
cmpwlwlru00bdd52kjvra5bro	cmpwlwlru00bad52kaku3tktu	cmpu216nd002cd5ug21i5wbkv	2	26.00	4	458.00	2026-06-02 12:21:19.29
cmpwlwlrv00bhd52koiwquhw2	cmpwlwlrv00bfd52kv9d603ap	cmpu216n90024d5ugqss61ynu	1	28.00	8	364.00	2026-06-02 12:21:19.291
cmpwlwlrv00bid52kfwz9gdpt	cmpwlwlrv00bfd52kv9d603ap	cmpu216nf002gd5ugzceozmj9	1	82.00	8	1096.00	2026-06-02 12:21:19.291
cmpwlwlrv00bjd52kqf54ko0p	cmpwlwlrv00bfd52kv9d603ap	cmpu216nn002wd5ugx53nijsp	1	45.00	8	565.00	2026-06-02 12:21:19.291
cmpwlwlrw00bnd52k9rapyxow	cmpwlwlrw00bld52k4xkp2wvj	cmpu216nb0028d5ugquezq4xy	2	30.00	6	660.00	2026-06-02 12:21:19.292
cmpwlwlrx00brd52klv3i2rqs	cmpwlwlrx00bpd52kqor08chd	cmpu216ne002ed5ug1748imv1	2	95.00	3	1570.00	2026-06-02 12:21:19.293
cmpwlwlrx00bsd52kkud6j6ur	cmpwlwlrx00bpd52kqor08chd	cmpu216nl002sd5uga8ohegg9	2	32.00	3	492.00	2026-06-02 12:21:19.293
cmpwlwlry00bwd52ktn0jxubr	cmpwlwlry00bud52k75dnzvxf	cmpu216ng002id5ug3p3xiw19	1	88.00	4	812.00	2026-06-02 12:21:19.294
cmpwlwlry00bxd52kowcxq09m	cmpwlwlry00bud52k75dnzvxf	cmpu216no002yd5ugw5q3lswn	1	58.00	4	512.00	2026-06-02 12:21:19.294
cmpwlwlry00byd52kxwru4m4s	cmpwlwlry00bud52k75dnzvxf	cmpu216nu003cd5ugz8tfmbiy	1	12.00	4	108.00	2026-06-02 12:21:19.294
cmpwlwlrz00c2d52k8p9a7ve8	cmpwlwlrz00c0d52ksl6c1yin	cmpu216nj002qd5ug3rjdm07r	2	34.00	4	602.00	2026-06-02 12:21:19.296
cmpwlwls000c6d52k2h22dov7	cmpwlwls000c4d52kwqmx5wdi	cmpu216nn002wd5ugx53nijsp	2	45.00	5	860.00	2026-06-02 12:21:19.297
cmpwlwls000c7d52khivyvntk	cmpwlwls000c4d52kwqmx5wdi	cmpu216nt003ad5ugcgyrtsjo	2	48.00	5	1000.00	2026-06-02 12:21:19.297
cmpwlwls100cbd52k091wt7b9	cmpwlwls100c9d52krnfhrseb	cmpu216np0030d5ugfq63q4af	1	62.00	8	796.00	2026-06-02 12:21:19.298
cmpwlwls100ccd52kklbx74ld	cmpwlwls100c9d52krnfhrseb	cmpu216nx003gd5ug6jpvmysq	1	120.00	8	1660.00	2026-06-02 12:21:19.298
cmpwlwls100cdd52kt9d3arf5	cmpwlwls100c9d52krnfhrseb	cmpu216ms001ad5ugemfo87rh	1	35.00	8	460.00	2026-06-02 12:21:19.298
cmpwlwls200chd52khasn8d7i	cmpwlwls200cfd52klfsc3t6l	cmpu216ns0038d5ugivrykrme	2	24.00	3	384.00	2026-06-02 12:21:19.299
cmpwlwls300cld52kyupxrlra	cmpwlwls300cjd52ks8aera1b	cmpu216nu003cd5ugz8tfmbiy	1	12.00	4	108.00	2026-06-02 12:21:19.3
cmpwlwls300cmd52kn4323smt	cmpwlwls300cjd52ks8aera1b	cmpu216mr0018d5ugf6vg3q9u	1	50.00	4	430.00	2026-06-02 12:21:19.3
cmpwlwls500cqd52k0ahcju3v	cmpwlwls400cod52kn1ds76ef	cmpu216mb0010d5ugzabpsrkm	2	45.00	4	800.00	2026-06-02 12:21:19.301
cmpwlwls500crd52kzqf5qznw	cmpwlwls400cod52kn1ds76ef	cmpu216mt001cd5ug9xa7nqhf	2	30.00	4	540.00	2026-06-02 12:21:19.301
cmpwlwls500csd52ky94x3dna	cmpwlwls400cod52kn1ds76ef	cmpu216mz001od5ug0u5b0jol	2	46.00	4	798.00	2026-06-02 12:21:19.301
cmpwlwls600cwd52kl2excfph	cmpwlwls600cud52kw77opudy	cmpu216mp0014d5ugu0lz927j	2	48.00	6	1056.00	2026-06-02 12:21:19.302
cmpwlwls700d0d52kllvci962	cmpwlwls700cyd52kao73boez	cmpu216ms001ad5ugemfo87rh	1	35.00	7	425.00	2026-06-02 12:21:19.303
cmpwlwls700d1d52kfzt6m2i0	cmpwlwls700cyd52kao73boez	cmpu216my001md5ugh8znvup9	1	44.00	7	528.00	2026-06-02 12:21:19.303
cmpwlwls800d5d52kdts9b6x5	cmpwlwls800d3d52k92uh6uc3	cmpu216mu001ed5ug5aodaewy	2	32.00	2	448.00	2026-06-02 12:21:19.304
cmpwlwls800d6d52kgfrbh9fd	cmpwlwls800d3d52k92uh6uc3	cmpu216n2001sd5ugmcaje11z	2	58.00	2	772.00	2026-06-02 12:21:19.304
cmpwlwls800d7d52k6m0qfy82	cmpwlwls800d3d52k92uh6uc3	cmpu216n90024d5ugqss61ynu	2	28.00	2	392.00	2026-06-02 12:21:19.304
cmpwlwls900dbd52kbc2qxy50	cmpwlwls900d9d52kngmt6zxa	cmpu216mx001kd5ug4h49hfpn	2	55.00	3	850.00	2026-06-02 12:21:19.305
cmpwlwlsa00dfd52kp1jnbs8r	cmpwlwlsa00ddd52kisf83n3y	cmpu216mz001od5ug0u5b0jol	1	46.00	5	445.00	2026-06-02 12:21:19.306
cmpwlwlsa00dgd52kx0pgynld	cmpwlwlsa00ddd52kisf83n3y	cmpu216n80022d5ug8rmjz67e	1	82.00	5	830.00	2026-06-02 12:21:19.306
cmpwlwlsb00dkd52kgnmwcwe1	cmpwlwlsb00did52ka69x2cbg	cmpu216n4001ud5ugmt8r8aee	2	70.00	6	1560.00	2026-06-02 12:21:19.307
cmpwlwlsb00dld52kb6notgql	cmpwlwlsb00did52ka69x2cbg	cmpu216na0026d5uggtjk00n5	2	36.00	6	782.00	2026-06-02 12:21:19.307
cmpwlwlsb00dmd52k5usneg8p	cmpwlwlsb00did52ka69x2cbg	cmpu216ng002id5ug3p3xiw19	1	88.00	6	988.00	2026-06-02 12:21:19.307
cmpwlwlsc00dqd52kioqwv1qy	cmpwlwlsc00dod52kj93jperw	cmpu216n6001yd5ugu0fr6hvo	2	68.00	6	1496.00	2026-06-02 12:21:19.308
cmpwlwlsd00dud52kfs56eby7	cmpwlwlsd00dsd52kqqqc948a	cmpu216n90024d5ugqss61ynu	2	28.00	2	392.00	2026-06-02 12:21:19.309
cmpwlwlsd00dvd52kxl87w0x0	cmpwlwlsd00dsd52kqqqc948a	cmpu216nf002gd5ugzceozmj9	2	82.00	2	1208.00	2026-06-02 12:21:19.309
cmpwlwlse00dzd52kz7ullmn5	cmpwlwlse00dxd52kik09yh5p	cmpu216nb0028d5ugquezq4xy	1	30.00	8	390.00	2026-06-02 12:21:19.311
cmpwlwlse00e0d52k4405ohqa	cmpwlwlse00dxd52kik09yh5p	cmpu216ni002od5ugcfr8ytc8	1	40.00	8	510.00	2026-06-02 12:21:19.311
cmpwlwlse00e1d52ku80iemw3	cmpwlwlse00dxd52kik09yh5p	cmpu216np0030d5ugfq63q4af	1	62.00	8	796.00	2026-06-02 12:21:19.311
cmpwlwlsf00e5d52kpomaz7av	cmpwlwlsf00e3d52kjffyaag9	cmpu216ne002ed5ug1748imv1	1	95.00	5	975.00	2026-06-02 12:21:19.312
cmpwlwlsg00e9d52kslb5gnh6	cmpwlwlsg00e7d52k4trp2sxa	cmpu216ng002id5ug3p3xiw19	1	88.00	6	988.00	2026-06-02 12:21:19.313
cmpwlwlsg00ead52kamoqnvug	cmpwlwlsg00e7d52k4trp2sxa	cmpu216no002yd5ugw5q3lswn	2	58.00	6	1256.00	2026-06-02 12:21:19.313
cmpwlwlsh00eed52k7extogpk	cmpwlwlsh00ecd52kmyohtubx	cmpu216nj002qd5ug3rjdm07r	2	34.00	6	738.00	2026-06-02 12:21:19.314
cmpwlwlsh00efd52ki6papbd7	cmpwlwlsh00ecd52kmyohtubx	cmpu216nq0032d5ugzw6k0y5s	2	37.00	6	784.00	2026-06-02 12:21:19.314
cmpwlwlsh00egd52khb1td36e	cmpwlwlsh00ecd52kmyohtubx	cmpu216mb0010d5ugzabpsrkm	2	45.00	6	980.00	2026-06-02 12:21:19.314
cmpwlwlsi00ekd52k1pnsqjji	cmpwlwlsi00eid52kuy88sjjb	cmpu216nn002wd5ugx53nijsp	2	45.00	2	590.00	2026-06-02 12:21:19.315
cmpwlwlsj00eod52k6ck832pg	cmpwlwlsj00emd52k3yfucw1m	cmpu216np0030d5ugfq63q4af	1	62.00	4	548.00	2026-06-02 12:21:19.316
cmpwlwlsj00epd52k5r0qcl4b	cmpwlwlsj00emd52k3yfucw1m	cmpu216mb0010d5ugzabpsrkm	1	45.00	4	400.00	2026-06-02 12:21:19.316
cmpwlwlsl00etd52ktr57qjdl	cmpwlwlsl00erd52kl2vzlqdb	cmpu216ns0038d5ugivrykrme	1	24.00	8	312.00	2026-06-02 12:21:19.317
cmpwlwlsl00eud52k7y7rrg4a	cmpwlwlsl00erd52kl2vzlqdb	cmpu216mo0012d5ugujtqybh2	1	42.00	8	546.00	2026-06-02 12:21:19.317
cmpwlwlsl00evd52km78e5qj0	cmpwlwlsl00erd52kl2vzlqdb	cmpu216mu001ed5ug5aodaewy	1	32.00	8	416.00	2026-06-02 12:21:19.317
cmpwlwlsm00ezd52kadzhjkrd	cmpwlwlsm00exd52k2999oy0p	cmpu216nu003cd5ugz8tfmbiy	2	12.00	5	240.00	2026-06-02 12:21:19.318
cmpwlwlsn00f3d52kvy2carg5	cmpwlwlsn00f1d52ka3hde0d7	cmpu216mb0010d5ugzabpsrkm	2	45.00	7	1070.00	2026-06-02 12:21:19.319
cmpwlwlsn00f4d52k33tdi8nz	cmpwlwlsn00f1d52ka3hde0d7	cmpu216mt001cd5ug9xa7nqhf	2	30.00	7	720.00	2026-06-02 12:21:19.319
\.


--
-- Data for Name: Report; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Report" (id, "userId", "rentalOrderId", type, format, title, "fileUrl", "createdAt") FROM stdin;
cmpwlwltk00hnd52k49lx3bjs	cmpu2165a0003d5ugp81cvo3c	cmpwlwlr800acd52k22je59bh	ORDER_DOCUMENT	PDF	Документ по заявке BR-202605-0001	\N	2026-06-02 12:21:19.353
cmpwlwltk00hod52kvh5jfpk6	cmpu2166y0005d5ugb4frzf2f	cmpwlwlrm00agd52kphlbkk8d	ORDER_DOCUMENT	DOCX	Документ по заявке BR-202605-0002	\N	2026-06-02 12:21:19.353
cmpwlwltk00hpd52kawsy8nnl	cmpu2168h0007d5ugnf2jgise	cmpwlwlrn00ald52ksbgjjps8	ORDER_DOCUMENT	PDF	Документ по заявке BR-202605-0003	\N	2026-06-02 12:21:19.353
cmpwlwltk00hqd52kl1xo4ecf	cmpu2169y0009d5ugfhga2ez2	cmpwlwlrp00ard52kbz70xf9q	ORDER_DOCUMENT	DOCX	Документ по заявке BR-202605-0004	\N	2026-06-02 12:21:19.353
cmpwlwltk00hrd52krn1l5ye2	cmpu2165a0003d5ugp81cvo3c	\N	RENTAL_HISTORY	PDF	История аренды: Иван Петров	\N	2026-06-02 12:21:19.353
cmpwlwltk00hsd52kqbw2lpz8	cmpu2166y0005d5ugb4frzf2f	\N	RENTAL_HISTORY	DOCX	История аренды: Павел Сидоров	\N	2026-06-02 12:21:19.353
cmpwlwltk00htd52kk0wsq2n4	cmpu2168h0007d5ugnf2jgise	\N	RENTAL_HISTORY	PDF	История аренды: Андрей Козлов	\N	2026-06-02 12:21:19.353
cmpwlwltk00hud52k2fqnlpym	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	PDF	Статистика аренды за квартал	\N	2026-06-02 12:21:19.353
cmpwlwltk00hvd52kq3nu0omq	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	DOCX	Статистика аренды: подробная выгрузка	\N	2026-06-02 12:21:19.353
cmpwlwltk00hwd52ky5hctmyd	cmptsbj0u0003d500lnh8bwp8	\N	EQUIPMENT_UTILIZATION	PDF	Сводка по использованию оборудования	\N	2026-06-02 12:21:19.353
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Review" (id, "userId", "equipmentId", rating, text, "isPublished", "createdAt", "updatedAt") FROM stdin;
cmpwlwlt200fzd52kcyczywld	cmpu2165a0003d5ugp81cvo3c	cmpu216mb0010d5ugzabpsrkm	3	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	f	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g0d52kmileo00t	cmpu2166y0005d5ugb4frzf2f	cmpu216mr0018d5ugf6vg3q9u	4	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g1d52km3msgnrx	cmpu2168h0007d5ugnf2jgise	cmpu216mv001gd5ugfa8f7hth	5	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g2d52k2fw8ybzl	cmpu2169y0009d5ugfhga2ez2	cmpu216n0001qd5ugicavws33	3	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g3d52kgsax7ab1	cmpu216bg000bd5ugd2qb3qvf	cmpu216n6001yd5ugu0fr6hvo	4	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g4d52kinmzc6hv	cmpu216cy000dd5uglc96kk2d	cmpu216na0026d5uggtjk00n5	5	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	f	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g5d52kxz95w8cy	cmpu216ee000fd5ug53k7bbtd	cmpu216nf002gd5ugzceozmj9	3	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g6d52kl01eihno	cmpu216fw000hd5ug1jlu1bgl	cmpu216nj002qd5ug3rjdm07r	4	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g7d52ks1eckagf	cmpu216hd000jd5ugc1fzmsz3	cmpu216no002yd5ugw5q3lswn	5	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g8d52ksssnq4ae	cmpu216iv000ld5ug1eear6f0	cmpu216nt003ad5ugcgyrtsjo	3	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200g9d52kt90n1wqd	cmpu216kd000nd5ugzsuleofa	cmpu216mb0010d5ugzabpsrkm	4	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	f	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gad52kcif4vy88	cmpu216lu000pd5ugwgq7vwpc	cmpu216mr0018d5ugf6vg3q9u	5	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gbd52k4uhbtk3z	cmpu2165a0003d5ugp81cvo3c	cmpu216mw001id5ughgbdbbke	3	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gcd52k0dagvi4t	cmpu2166y0005d5ugb4frzf2f	cmpu216n0001qd5ugicavws33	4	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gdd52kx1zxt8ya	cmpu2168h0007d5ugnf2jgise	cmpu216n6001yd5ugu0fr6hvo	5	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200ged52kowqqeth1	cmpu2169y0009d5ugfhga2ez2	cmpu216nb0028d5ugquezq4xy	3	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	f	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gfd52ku7ayuuaa	cmpu216bg000bd5ugd2qb3qvf	cmpu216nf002gd5ugzceozmj9	4	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200ggd52kq7k0wcds	cmpu216cy000dd5uglc96kk2d	cmpu216nj002qd5ug3rjdm07r	5	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200ghd52kazzlyy1q	cmpu216ee000fd5ug53k7bbtd	cmpu216np0030d5ugfq63q4af	3	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gid52kg36208ya	cmpu216fw000hd5ug1jlu1bgl	cmpu216nt003ad5ugcgyrtsjo	4	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gjd52khrocksn0	cmpu216hd000jd5ugc1fzmsz3	cmpu216mb0010d5ugzabpsrkm	5	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	f	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gkd52k4npx5yq3	cmpu216iv000ld5ug1eear6f0	cmpu216ms001ad5ugemfo87rh	3	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gld52ksppxcin2	cmpu216kd000nd5ugzsuleofa	cmpu216mw001id5ughgbdbbke	4	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gmd52kb753szmj	cmpu216lu000pd5ugwgq7vwpc	cmpu216n0001qd5ugicavws33	5	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gnd52k6rimzqf2	cmpu2165a0003d5ugp81cvo3c	cmpu216n70020d5ugl2fz23t1	3	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200god52kadxztoab	cmpu2166y0005d5ugb4frzf2f	cmpu216nb0028d5ugquezq4xy	4	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	f	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gpd52kfsgymmds	cmpu2168h0007d5ugnf2jgise	cmpu216nf002gd5ugzceozmj9	5	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gqd52k82e7lcde	cmpu2169y0009d5ugfhga2ez2	cmpu216nl002sd5uga8ohegg9	3	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200grd52kg9ojflsr	cmpu216bg000bd5ugd2qb3qvf	cmpu216np0030d5ugfq63q4af	4	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gsd52k8l2ig6xi	cmpu216cy000dd5uglc96kk2d	cmpu216nt003ad5ugcgyrtsjo	5	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gtd52kf6vrtr80	cmpu216ee000fd5ug53k7bbtd	cmpu216mo0012d5ugujtqybh2	3	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	f	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gud52kpk7fjifu	cmpu216fw000hd5ug1jlu1bgl	cmpu216ms001ad5ugemfo87rh	4	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gvd52ksj3871tk	cmpu216hd000jd5ugc1fzmsz3	cmpu216mw001id5ughgbdbbke	5	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gwd52k823np1ms	cmpu216iv000ld5ug1eear6f0	cmpu216n2001sd5ugmcaje11z	3	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gxd52k2ngtlor6	cmpu216kd000nd5ugzsuleofa	cmpu216n70020d5ugl2fz23t1	4	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gyd52kg94hcq5m	cmpu216lu000pd5ugwgq7vwpc	cmpu216nb0028d5ugquezq4xy	5	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	f	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200gzd52k5uzrsijd	cmpu2165a0003d5ugp81cvo3c	cmpu216ng002id5ug3p3xiw19	3	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200h0d52ksipq7jg8	cmpu2166y0005d5ugb4frzf2f	cmpu216nl002sd5uga8ohegg9	4	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200h1d52k0b2fprio	cmpu2168h0007d5ugnf2jgise	cmpu216np0030d5ugfq63q4af	5	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
cmpwlwlt200h2d52klwtp61pq	cmpu2169y0009d5ugfhga2ez2	cmpu216nu003cd5ugz8tfmbiy	3	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-02 12:21:19.335	2026-06-02 12:21:19.335
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Role" (id, name, description, "createdAt", "updatedAt") FROM stdin;
cmptsbiyi0000d50016vfokjh	ADMIN	Administrator with full platform access	2026-05-31 12:57:34.651	2026-06-02 12:21:18.447
cmptsbiyx0001d500il354zhy	CLIENT	Client who can browse catalog and place rental orders	2026-05-31 12:57:34.666	2026-06-02 12:21:18.45
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, "fullName", email, phone, "passwordHash", "avatarUrl", "roleId", "isBlocked", "createdAt", "updatedAt") FROM stdin;
cmpu216kd000nd5ugzsuleofa	Алексей Орлов	alexey.orlov@buildrent.local	+375291110111	$2b$10$lf/TveqLbG8AbnysIloV8ekF47Z5M1UtThjIyBSNr1roiRPeBzQlS	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.189	2026-06-02 12:21:19.076
cmpu216lu000pd5ugwgq7vwpc	Михаил Никитин	mikhail.nikitin@buildrent.local	+375291110112	$2b$10$4fC2sBOdFinIYnUo3dPBFOHz9A/3.egoZV6PrGgHjFI4quTfe2Oz6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.242	2026-06-02 12:21:19.126
cmptsbj0u0003d500lnh8bwp8	Администратор BuildRent	admin@buildrent.local	\N	$2b$10$6wKByAGLRGaF8.GjBjZK5e8VcLYPLHG303nb4d0N3fj0cdc9ANVqK	\N	cmptsbiyi0000d50016vfokjh	f	2026-05-31 12:57:34.734	2026-06-02 12:21:18.503
cmpu2165a0003d5ugp81cvo3c	Иван Петров	ivan.petrov@buildrent.local	+375291110101	$2b$10$7meyZDDAYB5Aqtb1Lrh/gOVVHBlsL5Wp1bHAjYdtY2eg5IA.2sNQa	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.647	2026-06-02 12:21:18.557
cmpu2166y0005d5ugb4frzf2f	Павел Сидоров	pavel.sidorov@buildrent.local	+375291110102	$2b$10$xRZwOYjOLPBoyEqTC1XXPuHdAsWIfak49DXOZz.xOFpYaYn6V79LG	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.706	2026-06-02 12:21:18.61
cmpu2168h0007d5ugnf2jgise	Андрей Козлов	andrei.kozlov@buildrent.local	+375291110103	$2b$10$c69GW2sfPI4ZTNU1ZY/2FeFowmL8f38ZD03/0WH7IleXUwlM.TTHa	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.762	2026-06-02 12:21:18.663
cmpu2169y0009d5ugfhga2ez2	Максим Морозов	maksim.morozov@buildrent.local	+375291110104	$2b$10$HNBFVC77uxiGrrgE6jArT.SAeUlU69NBL9padw6O.FX/QDvxK6BYO	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.815	2026-06-02 12:21:18.716
cmpu216bg000bd5ugd2qb3qvf	Сергей Волков	sergei.volkov@buildrent.local	+375291110105	$2b$10$8Qn.Y2Xq1mtkESM4JLvpxuAmo96XXP4ZW0U5zwS59wRrKo.6TbGau	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.869	2026-06-02 12:21:18.769
cmpu216cy000dd5uglc96kk2d	Никита Федоров	nikita.fedorov@buildrent.local	+375291110106	$2b$10$qIHEI2oSrboC4p1JBmBD9e/t7htSmYBFZUWreApUcwZaAZqXi0cIy	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.922	2026-06-02 12:21:18.82
cmpu216ee000fd5ug53k7bbtd	Кирилл Смирнов	kirill.smirnov@buildrent.local	+375291110107	$2b$10$1GOsl2O2HXeNp4q5PudLfeO/fFXkga76yX1EcLTn9RPFP2lAuyH/6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.974	2026-06-02 12:21:18.872
cmpu216fw000hd5ug1jlu1bgl	Артём Васильев	artem.vasilev@buildrent.local	+375291110108	$2b$10$sjfw8TevYeZY/x2otUc5iugUmeutkYFKaSrQUjqat/mqrmWI6CaaK	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.028	2026-06-02 12:21:18.925
cmpu216hd000jd5ugc1fzmsz3	Роман Егоров	roman.egorov@buildrent.local	+375291110109	$2b$10$R3X6zMI7sq9Ncx.8lEjYO.YHzJoTW/iB02buxGLaIEkhwoxzTAp9a	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.081	2026-06-02 12:21:18.977
cmpu216iv000ld5ug1eear6f0	Денис Зайцев	denis.zaitsev@buildrent.local	+375291110110	$2b$10$kxFKnDufD9oiaaUibvDTmeRBK6ZpLS4fX3Fog6malbmlOlXrqSRSq	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.135	2026-06-02 12:21:19.026
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ccf6b8c2-0834-4a58-9cea-c8b6414959d2	2bbecc262350f4911e72cb391162e63eab053d783c8a051707a17405ee76ef5c	2026-05-31 15:42:56.304037+03	20260509171245_init_database_schema	\N	\N	2026-05-31 15:42:56.217194+03	1
\.


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: EquipmentImage EquipmentImage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentImage"
    ADD CONSTRAINT "EquipmentImage_pkey" PRIMARY KEY (id);


--
-- Name: EquipmentSpec EquipmentSpec_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentSpec"
    ADD CONSTRAINT "EquipmentSpec_pkey" PRIMARY KEY (id);


--
-- Name: Equipment Equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Equipment"
    ADD CONSTRAINT "Equipment_pkey" PRIMARY KEY (id);


--
-- Name: Favorite Favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: RentalOrderItem RentalOrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RentalOrderItem"
    ADD CONSTRAINT "RentalOrderItem_pkey" PRIMARY KEY (id);


--
-- Name: RentalOrder RentalOrder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RentalOrder"
    ADD CONSTRAINT "RentalOrder_pkey" PRIMARY KEY (id);


--
-- Name: Report Report_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "Report_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: EquipmentImage_equipmentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EquipmentImage_equipmentId_idx" ON public."EquipmentImage" USING btree ("equipmentId");


--
-- Name: EquipmentImage_equipmentId_sortOrder_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EquipmentImage_equipmentId_sortOrder_idx" ON public."EquipmentImage" USING btree ("equipmentId", "sortOrder");


--
-- Name: EquipmentSpec_equipmentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EquipmentSpec_equipmentId_idx" ON public."EquipmentSpec" USING btree ("equipmentId");


--
-- Name: EquipmentSpec_equipmentId_sortOrder_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EquipmentSpec_equipmentId_sortOrder_idx" ON public."EquipmentSpec" USING btree ("equipmentId", "sortOrder");


--
-- Name: Equipment_brand_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Equipment_brand_idx" ON public."Equipment" USING btree (brand);


--
-- Name: Equipment_categoryId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Equipment_categoryId_idx" ON public."Equipment" USING btree ("categoryId");


--
-- Name: Equipment_isFeatured_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Equipment_isFeatured_idx" ON public."Equipment" USING btree ("isFeatured");


--
-- Name: Equipment_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Equipment_slug_key" ON public."Equipment" USING btree (slug);


--
-- Name: Equipment_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Equipment_status_idx" ON public."Equipment" USING btree (status);


--
-- Name: Favorite_equipmentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Favorite_equipmentId_idx" ON public."Favorite" USING btree ("equipmentId");


--
-- Name: Favorite_userId_equipmentId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Favorite_userId_equipmentId_key" ON public."Favorite" USING btree ("userId", "equipmentId");


--
-- Name: Favorite_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Favorite_userId_idx" ON public."Favorite" USING btree ("userId");


--
-- Name: Payment_method_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Payment_method_idx" ON public."Payment" USING btree (method);


--
-- Name: Payment_rentalOrderId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Payment_rentalOrderId_idx" ON public."Payment" USING btree ("rentalOrderId");


--
-- Name: Payment_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Payment_status_idx" ON public."Payment" USING btree (status);


--
-- Name: RentalOrderItem_equipmentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RentalOrderItem_equipmentId_idx" ON public."RentalOrderItem" USING btree ("equipmentId");


--
-- Name: RentalOrderItem_rentalOrderId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RentalOrderItem_rentalOrderId_idx" ON public."RentalOrderItem" USING btree ("rentalOrderId");


--
-- Name: RentalOrder_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RentalOrder_createdAt_idx" ON public."RentalOrder" USING btree ("createdAt");


--
-- Name: RentalOrder_orderNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "RentalOrder_orderNumber_key" ON public."RentalOrder" USING btree ("orderNumber");


--
-- Name: RentalOrder_startDate_endDate_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RentalOrder_startDate_endDate_idx" ON public."RentalOrder" USING btree ("startDate", "endDate");


--
-- Name: RentalOrder_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RentalOrder_status_idx" ON public."RentalOrder" USING btree (status);


--
-- Name: RentalOrder_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RentalOrder_userId_idx" ON public."RentalOrder" USING btree ("userId");


--
-- Name: Report_format_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Report_format_idx" ON public."Report" USING btree (format);


--
-- Name: Report_rentalOrderId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Report_rentalOrderId_idx" ON public."Report" USING btree ("rentalOrderId");


--
-- Name: Report_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Report_type_idx" ON public."Report" USING btree (type);


--
-- Name: Report_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Report_userId_idx" ON public."Report" USING btree ("userId");


--
-- Name: Review_equipmentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Review_equipmentId_idx" ON public."Review" USING btree ("equipmentId");


--
-- Name: Review_isPublished_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Review_isPublished_idx" ON public."Review" USING btree ("isPublished");


--
-- Name: Review_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Review_userId_idx" ON public."Review" USING btree ("userId");


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_isBlocked_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_isBlocked_idx" ON public."User" USING btree ("isBlocked");


--
-- Name: User_roleId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_roleId_idx" ON public."User" USING btree ("roleId");


--
-- Name: EquipmentImage EquipmentImage_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentImage"
    ADD CONSTRAINT "EquipmentImage_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EquipmentSpec EquipmentSpec_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentSpec"
    ADD CONSTRAINT "EquipmentSpec_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Equipment Equipment_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Equipment"
    ADD CONSTRAINT "Equipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Favorite Favorite_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Favorite Favorite_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payment Payment_rentalOrderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_rentalOrderId_fkey" FOREIGN KEY ("rentalOrderId") REFERENCES public."RentalOrder"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RentalOrderItem RentalOrderItem_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RentalOrderItem"
    ADD CONSTRAINT "RentalOrderItem_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RentalOrderItem RentalOrderItem_rentalOrderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RentalOrderItem"
    ADD CONSTRAINT "RentalOrderItem_rentalOrderId_fkey" FOREIGN KEY ("rentalOrderId") REFERENCES public."RentalOrder"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RentalOrder RentalOrder_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RentalOrder"
    ADD CONSTRAINT "RentalOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Report Report_rentalOrderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "Report_rentalOrderId_fkey" FOREIGN KEY ("rentalOrderId") REFERENCES public."RentalOrder"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Report Report_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict hkvH7iLMY1ePimFg22g19eBafKSc3gZz68zfmkVVlocdGqXjkIdeZYbOPx6oArY

