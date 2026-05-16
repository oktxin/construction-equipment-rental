--
-- PostgreSQL database dump
--

\restrict gKL5GeYmWEqeoTiO4v0hEJAK8eH6gFVGreOSkVr7r5Syf68FLynK9vxieP6L86s

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
cmptsu94u0002d56okqxxad4i	?????????????	concrete-mixers-1780233128	???????????? ??? ????????????? ???????? ??????	mixer	2026-05-31 13:12:08.382	2026-05-31 13:12:08.382
cmptttgcz0000d5cc3ovqc51t	Rental Test Category 1780234770	rental-test-category-1780234770	Temporary category for rental orders flow test	crane	2026-05-31 13:39:30.707	2026-05-31 13:39:30.707
cmptuda080000d5dsqvokkiiu	Favorites Reviews Category 1780235695	fav-review-category-1780235695	Temporary category for favorites and reviews checks	loader	2026-05-31 13:54:55.592	2026-05-31 13:54:55.592
cmptugnlp000hd5ds1mutn9ci	Public Reviews Check 1780235853	public-reviews-check-1780235853	tmp	loader	2026-05-31 13:57:33.181	2026-05-31 13:57:33.181
cmptuh78s000qd5dsb9zihnku	Catalog Reviews Category 1780235878	catalog-reviews-category-1780235878	tmp	loader	2026-05-31 13:57:58.636	2026-05-31 13:57:58.636
cmptv76z70000d59s2uj7y2k4	Reports Category 1780237091	reports-category-1780237091	Temporary category for reports tests	loader	2026-05-31 14:18:11.347	2026-05-31 14:18:11.347
cmpu216lv000qd5ug2gknqrpl	Demolition Hammers	demolition-hammers	Heavy-duty drilling and breaking tools for concrete and masonry jobs.	hammer	2026-05-31 17:29:28.243	2026-05-31 17:29:37.975
cmpu216ly000rd5ugoikci2z9	Concrete Mixers	concrete-mixers	Portable and site-grade mixers for finishing, masonry, and structural work.	drum	2026-05-31 17:29:28.246	2026-05-31 17:29:37.976
cmpu216lz000sd5uggdgeivpe	Plate Compactors	plate-compactors	Compaction equipment for paving bases, trench refill, and landscaping.	layers	2026-05-31 17:29:28.247	2026-05-31 17:29:37.977
cmpu216lz000td5ugoif653lw	Generators	generators	Power sources for sites without permanent electricity and emergency backup.	zap	2026-05-31 17:29:28.248	2026-05-31 17:29:37.977
cmpu216m0000ud5ugsxqx7qjc	Compressors	compressors	Air equipment for pneumatic tools, paint jobs, and utility maintenance.	wind	2026-05-31 17:29:28.248	2026-05-31 17:29:37.978
cmpu216m1000vd5ugsj97c7bk	Scaffolding And Towers	scaffolding-towers	Safe access systems for facade work, finishing, and indoor repairs.	building-2	2026-05-31 17:29:28.249	2026-05-31 17:29:37.978
cmpu216m1000wd5ugbjiikzj5	Welding Equipment	welding-equipment	Inverters and accessories for metal fabrication and repair work.	wrench	2026-05-31 17:29:28.25	2026-05-31 17:29:37.979
cmpu216m2000xd5ugd6z7247i	Saws And Cutters	saws-cutters	Cutting tools for metal, stone, reinforced concrete, and asphalt.	disc-3	2026-05-31 17:29:28.25	2026-05-31 17:29:37.979
cmpu216m2000yd5ugjmxha24a	Measuring Tools	measuring-tools	Precision tools for layout, leveling, and quality control on site.	ruler	2026-05-31 17:29:28.251	2026-05-31 17:29:37.98
\.


--
-- Data for Name: Equipment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Equipment" (id, "categoryId", name, slug, "shortDescription", description, brand, model, "dailyPrice", "depositAmount", "quantityTotal", "quantityAvailable", power, weight, status, "isFeatured", "createdAt", "updatedAt") FROM stdin;
cmptsu95u0004d56ozy3q233y	cmptsu94u0002d56okqxxad4i	?????????? Wacker Neuson VP1550	wacker-neuson-vp1550-1780233128	?????????? ?????????? ??? ?????????? ?????? ? ?????	????????? ???????? ?????????? ??? ?????????????.	Wacker Neuson	VP1550	45.00	300.00	5	4	4.80	83.00	AVAILABLE	t	2026-05-31 13:12:08.418	2026-05-31 13:12:08.418
cmpu216mb0010d5ugzabpsrkm	cmpu216lv000qd5ug2gknqrpl	Bosch GBH 8-45 DV Rotary Hammer	bosch-gbh-8-45dv	Professional SDS-max hammer for drilling anchors and heavy chiseling.	Reliable rotary hammer for facade crews, opening works, and reinforced concrete drilling on active building sites.	Bosch	GBH 8-45 DV	45.00	220.00	5	4	1.50	8.90	AVAILABLE	t	2026-05-31 17:29:28.26	2026-05-31 17:29:37.984
cmpu216mo0012d5ugujtqybh2	cmpu216lv000qd5ug2gknqrpl	Makita HM1214C Demolition Hammer	makita-hm1214c	Compact demolition hammer for wall chasing and tile removal.	Balanced breaker for daily finishing crews that need solid impact power without oversized transport requirements.	Makita	HM1214C	42.00	210.00	4	3	1.50	12.30	AVAILABLE	f	2026-05-31 17:29:28.272	2026-05-31 17:29:37.986
cmpu216mp0014d5ugu0lz927j	cmpu216lv000qd5ug2gknqrpl	DeWalt D25902K Breaker	dewalt-d25902k	Heavy chipping hammer for slab removal and brick dismantling.	A powerful breaker for demolition crews working on reinforced slabs, channels, and dense masonry walls.	DeWalt	D25902K	48.00	240.00	4	3	1.55	10.50	AVAILABLE	f	2026-05-31 17:29:28.273	2026-05-31 17:29:37.987
cmptttgdc0002d5cccj91948z	cmptttgcz0000d5cc3ovqc51t	Rental Test Equipment 1780234770	rental-test-equipment-1780234770	Test machine for rental orders flow	Temporary equipment created during manual API verification	BuildRent	QA-01	50.00	200.00	6	6	\N	\N	AVAILABLE	f	2026-05-31 13:39:30.72	2026-05-31 13:39:31.015
cmptuda150002d5dsc5jsok49	cmptuda080000d5dsqvokkiiu	Favorites Reviews Equipment 1780235695	fav-review-equipment-1780235695	Temporary equipment for favorites/reviews verification	Temporary equipment for favorites and reviews verification	BuildRent	FR-01	60.00	250.00	3	3	\N	\N	AVAILABLE	t	2026-05-31 13:54:55.625	2026-05-31 13:54:55.625
cmptuda1m0006d5ds2qcuiqq6	cmptuda080000d5dsqvokkiiu	Archived Favorites Reviews Equipment 1780235695	fav-review-archived-1780235695	Archived equipment for forbidden actions checks	Archived equipment for forbidden actions checks	BuildRent	FR-ARCH	20.00	100.00	1	1	\N	\N	ARCHIVED	f	2026-05-31 13:54:55.643	2026-05-31 13:54:55.643
cmptugnlw000jd5ds09u204t6	cmptugnlp000hd5ds1mutn9ci	Public Reviews Machine 1780235853	public-reviews-machine-1780235853	tmp	tmp	BuildRent	PUB	10.00	50.00	1	1	\N	\N	AVAILABLE	f	2026-05-31 13:57:33.189	2026-05-31 13:57:33.189
cmptuh78y000sd5ds3vgs7bec	cmptuh78s000qd5dsb9zihnku	Catalog Reviews Machine 1780235878	catalog-reviews-machine-1780235878	tmp	tmp	BuildRent	CAT	30.00	120.00	2	2	\N	\N	AVAILABLE	f	2026-05-31 13:57:58.643	2026-05-31 13:57:58.643
cmptv76zn0002d59s59ck5dru	cmptv76z70000d59s2uj7y2k4	Reports Machine 1780237091	reports-machine-1780237091	Temporary equipment for reports	Temporary equipment for reports	BuildRent	REP-01	55.00	210.00	5	5	\N	\N	AVAILABLE	f	2026-05-31 14:18:11.363	2026-05-31 14:18:11.363
cmpu216mq0016d5ugpx6o8yxs	cmpu216lv000qd5ug2gknqrpl	Hilti TE 1000-AVR Demolition Hammer	hilti-te-1000-avr	Premium breaker reserved for high-load site tasks and service.	High-output Hilti breaker maintained on a service cycle for intensive demolition and anchor preparation tasks.	Hilti	TE 1000-AVR	60.00	320.00	3	0	1.75	12.50	MAINTENANCE	f	2026-05-31 17:29:28.275	2026-05-31 17:29:37.988
cmpu216mr0018d5ugf6vg3q9u	cmpu216lv000qd5ug2gknqrpl	Milwaukee Kango 950 S	milwaukee-kango-950-s	Robust demolition tool for channels, concrete edges, and openings.	Site-ready breaker often used for expansion joints, cable channels, and mechanical room reconstruction.	Milwaukee	Kango 950 S	50.00	230.00	3	2	1.70	11.80	AVAILABLE	f	2026-05-31 17:29:28.276	2026-05-31 17:29:37.989
cmpu216ms001ad5ugemfo87rh	cmpu216ly000rd5ugoikci2z9	Altrad Belle Minimix 150	altrad-belle-minimix-150	Compact mixer for tile crews, fencing, and small slab repairs.	One of the most practical portable mixers for on-site finishing teams and short-cycle repair jobs.	Altrad Belle	Minimix 150	35.00	180.00	4	1	0.55	61.00	AVAILABLE	t	2026-05-31 17:29:28.277	2026-05-31 17:29:37.99
cmpu216mt001cd5ug9xa7nqhf	cmpu216ly000rd5ugoikci2z9	Zitrek B1510 FK Mixer	zitrek-b1510-fk	Field mixer for interior finishing and landscaping crews.	A practical electric mixer for site prep, small foundations, and concrete-based finishing work.	Zitrek	B1510 FK	30.00	150.00	5	5	0.70	58.00	AVAILABLE	f	2026-05-31 17:29:28.278	2026-05-31 17:29:37.991
cmpu216mu001ed5ug5aodaewy	cmpu216ly000rd5ugoikci2z9	Sturm CM20160 Concrete Mixer	sturm-cm20160	Mid-size mixer for masonry and outdoor pad pouring.	A good fit for builders who need steady batch output for fence posts, paving, and slab extensions.	Sturm	CM20160	32.00	160.00	4	3	0.80	65.00	AVAILABLE	f	2026-05-31 17:29:28.279	2026-05-31 17:29:37.992
cmpu216mv001gd5ugfa8f7hth	cmpu216ly000rd5ugoikci2z9	RedVerg RD-CM180	redverg-rd-cm180	Site mixer currently reserved from public rental due to motor diagnostics.	High-capacity mixer awaiting diagnostics after a motor overheating alert during a long residential pour.	RedVerg	RD-CM180	34.00	170.00	3	0	0.90	72.00	UNAVAILABLE	f	2026-05-31 17:29:28.28	2026-05-31 17:29:37.993
cmpu216mw001id5ughgbdbbke	cmpu216ly000rd5ugoikci2z9	Patriot BM 208C Mixer	patriot-bm-208c	Large mixer for driveway pours and low-rise concrete crews.	A dependable option when the project needs longer mixing cycles and larger concrete batches per shift.	Patriot	BM 208C	38.00	190.00	3	2	1.00	79.00	AVAILABLE	f	2026-05-31 17:29:28.281	2026-05-31 17:29:37.994
cmpu216mx001kd5ug4h49hfpn	cmpu216lz000sd5uggdgeivpe	Wacker Neuson VP1550AW	wacker-neuson-vp1550aw	Professional plate compactor for paving base prep and patch repair.	Trusted compactor for sidewalks, trench backfill, and dense granular sub-base on urban job sites.	Wacker Neuson	VP1550AW	55.00	260.00	4	4	3.60	90.00	AVAILABLE	t	2026-05-31 17:29:28.282	2026-05-31 17:29:37.995
cmpu216my001md5ugh8znvup9	cmpu216lz000sd5uggdgeivpe	Huter VP-90 Plate Compactor	huter-vp-90	General-purpose compactor for paths, curbs, and driveway bedding.	Compact unit for crews that need agile movement between landscape and small construction tasks.	Huter	VP-90	44.00	220.00	5	3	4.80	88.00	AVAILABLE	f	2026-05-31 17:29:28.283	2026-05-31 17:29:37.996
cmpu216mz001od5ug0u5b0jol	cmpu216lz000sd5uggdgeivpe	Champion PC9045FH	champion-pc9045fh	Site compactor for paving stone bedding and utility trench refill.	A stable compactor with folding transport handle, good for landscape teams and paving contractors.	Champion	PC9045FH	46.00	215.00	4	3	4.10	92.00	AVAILABLE	f	2026-05-31 17:29:28.284	2026-05-31 17:29:37.996
cmpu216n2001sd5ugmcaje11z	cmpu216lz000sd5uggdgeivpe	Zitrek CNP 30-2	zitrek-cnp-30-2	Heavy compactor for dense base work around road and yard projects.	Durable plate compactor for larger compaction tasks where crews need stronger impact and good transport balance.	Zitrek	CNP 30-2	58.00	270.00	3	3	4.80	125.00	AVAILABLE	f	2026-05-31 17:29:28.287	2026-05-31 17:29:38.006
cmpu216n4001ud5ugmt8r8aee	cmpu216lz000td5ugoif653lw	Honda EU30is Inverter Generator	honda-eu30is	Quiet inverter generator for site offices and sensitive power tools.	Premium low-noise generator for finishing crews, mobile offices, and equipment that needs stable current.	Honda	EU30is	70.00	360.00	3	2	3.00	59.00	AVAILABLE	t	2026-05-31 17:29:28.288	2026-05-31 17:29:38.007
cmpu216n5001wd5ugfjewtyji	cmpu216lz000td5ugoif653lw	Fubag BS 6600 AES	fubag-bs-6600-aes	Portable petrol generator for general construction power backup.	A proven site generator for welders, pumps, and shared tool circuits on medium-size construction projects.	Fubag	BS 6600 AES	66.00	330.00	4	4	5.50	84.00	AVAILABLE	f	2026-05-31 17:29:28.289	2026-05-31 17:29:38.008
cmpu216n6001yd5ugu0fr6hvo	cmpu216lz000td5ugoif653lw	Hyundai HHY 7050FE	hyundai-hhy-7050fe	Construction generator for backup circuits, pumps, and batch tools.	Reliable portable unit with strong frame design for outdoor storage and demanding contractor schedules.	Hyundai	HHY 7050FE	68.00	340.00	3	2	5.50	81.00	AVAILABLE	f	2026-05-31 17:29:28.29	2026-05-31 17:29:38.009
cmpu216n70020d5ugl2fz23t1	cmpu216lz000td5ugoif653lw	Firman SPG6500E2	firman-spg6500e2	Generator paused for alternator inspection after intermittent voltage spikes.	High-output petrol generator currently marked unavailable while the alternator and AVR unit are checked.	Firman	SPG6500E2	64.00	320.00	2	0	5.20	78.00	UNAVAILABLE	f	2026-05-31 17:29:28.291	2026-05-31 17:29:38.009
cmpu216n80022d5ug8rmjz67e	cmpu216lz000td5ugoif653lw	SDMO Technic 7500 TE	sdmo-technic-7500te	Three-phase generator for mixed equipment fleets and temporary facilities.	A solid option for sites with lighting towers, pumps, and contractor cabins working from one power source.	SDMO	Technic 7500 TE	82.00	420.00	2	1	6.60	98.00	AVAILABLE	f	2026-05-31 17:29:28.292	2026-05-31 17:29:38.01
cmpu216n90024d5ugqss61ynu	cmpu216m0000ud5ugsxqx7qjc	ABAC Montecarlo L20P	abac-montecarlo-l20p	Compact compressor for finishing, fastening, and blow-out work.	A mobile compressor suited to interior contractors, carpenters, and service technicians working indoors.	ABAC	Montecarlo L20P	28.00	140.00	5	4	1.50	32.00	AVAILABLE	f	2026-05-31 17:29:28.293	2026-05-31 17:29:38.011
cmpu216na0026d5uggtjk00n5	cmpu216m0000ud5ugsxqx7qjc	Fubag VCF 100 CM3	fubag-vcf-100-cm3	Belt-drive compressor for pneumatic tools and small paint jobs.	Popular compressor for bodywork, workshop support, and framing crews using impact and nail tools.	Fubag	VCF 100 CM3	36.00	175.00	4	4	2.20	64.00	AVAILABLE	f	2026-05-31 17:29:28.294	2026-05-31 17:29:38.012
cmpu216nb0028d5ugquezq4xy	cmpu216m0000ud5ugsxqx7qjc	Remeza SB4/C-50.LB30A	remeza-sb4-c-50-lb30a	Workshop compressor for pneumatic installation and maintenance teams.	A durable Belarus-made compressor that works well for finish carpentry, servicing, and daily tool support.	Remeza	SB4/C-50.LB30A	30.00	150.00	5	4	1.80	39.00	AVAILABLE	f	2026-05-31 17:29:28.295	2026-05-31 17:29:38.013
cmpu216nc002ad5ugd8hcmskj	cmpu216m0000ud5ugsxqx7qjc	Patriot EURO 50/260K	patriot-euro-50-260k	Compressor not currently available because of valve block replacement.	Entry-level air compressor temporarily removed from rental after a planned valve block replacement.	Patriot	EURO 50/260K	24.00	120.00	3	0	1.80	27.00	UNAVAILABLE	f	2026-05-31 17:29:28.296	2026-05-31 17:29:38.014
cmpu216nd002cd5ug21i5wbkv	cmpu216m0000ud5ugsxqx7qjc	Metabo Basic 250-24 W OF	metabo-basic-250-24w	Oil-free compressor for clean indoor work and finishing teams.	Low-maintenance compressor chosen for interiors, service vans, and spaces where clean air matters.	Metabo	Basic 250-24 W OF	26.00	125.00	4	4	1.50	24.00	AVAILABLE	f	2026-05-31 17:29:28.297	2026-05-31 17:29:38.015
cmpu216ne002ed5ug1748imv1	cmpu216m1000vd5ugsj97c7bk	Krause Protec XXL 7 m Tower	krause-protec-xxl-7m	Mobile tower scaffold for facade touchups and MEP ceiling access.	Professional aluminum tower with quick-lock assembly for contractors working on facades and atriums.	Krause	Protec XXL 7 m	95.00	500.00	2	1	\N	178.00	AVAILABLE	t	2026-05-31 17:29:28.298	2026-05-31 17:29:38.016
cmpu216nf002gd5ugzceozmj9	cmpu216m1000vd5ugsj97c7bk	Virastar VS Tower 6 m	virastar-vs-tower-6m	Modular tower for installation, painting, and warehouse maintenance.	A lightweight aluminum tower that fits indoor service teams and medium-height finishing projects.	Virastar	VS Tower 6 m	82.00	440.00	2	1	\N	145.00	AVAILABLE	f	2026-05-31 17:29:28.299	2026-05-31 17:29:38.016
cmpu216ng002id5ug3p3xiw19	cmpu216m1000vd5ugsj97c7bk	Layher Zifa Compact	layher-zifa-compact	Compact stairwell tower for indoor finishing and service access.	Specialized compact tower system for narrow spaces, stairwells, and commercial fit-out work.	Layher	Zifa Compact	88.00	460.00	1	0	\N	96.00	AVAILABLE	f	2026-05-31 17:29:28.3	2026-05-31 17:29:38.017
cmpu216nh002kd5ugmw8ldssu	cmpu216m1000vd5ugsj97c7bk	Euro Scaffold Rolling Tower 75x190	euro-scaffold-rolling-75x190	Tower scaffold set currently held for internal inspection and inventory audit.	Rolling scaffold set temporarily paused from rental until a full inventory and locking pin audit is finished.	Euro Scaffold	75x190	76.00	390.00	2	0	\N	128.00	UNAVAILABLE	f	2026-05-31 17:29:28.301	2026-05-31 17:29:38.018
cmpu216ni002md5ugaac4trp1	cmpu216m1000vd5ugsj97c7bk	Steel Frame Facade Kit 12 m	steel-frame-facade-kit-12m	Legacy facade scaffold kit kept in archive for compatibility checks.	Archived scaffold set retained only for historical records and dimension matching against old client documentation.	BuildRent Legacy	Facade Kit 12 m	110.00	600.00	1	0	\N	420.00	ARCHIVED	f	2026-05-31 17:29:28.302	2026-05-31 17:29:38.019
cmpu216ni002od5ugcfr8ytc8	cmpu216m1000wd5ugbjiikzj5	ESAB Rogue ES 200i	esab-rogue-es-200i	Compact inverter welder for fabrication teams and repair crews.	High-efficiency welding inverter for mobile welders handling gates, frames, reinforcement, and repairs.	ESAB	Rogue ES 200i	40.00	190.00	4	3	7.10	8.40	AVAILABLE	t	2026-05-31 17:29:28.303	2026-05-31 17:29:38.02
cmpu216nj002qd5ug3rjdm07r	cmpu216m1000wd5ugbjiikzj5	Svarog REAL ARC 200 Black	svarog-real-arc-200-black	Field inverter for installers, steel stairs, and support structures.	A portable welding machine valued for stable arc performance on repair jobs and custom steel fabrication.	Svarog	REAL ARC 200 Black	34.00	165.00	5	5	6.60	4.70	AVAILABLE	f	2026-05-31 17:29:28.304	2026-05-31 17:29:38.021
cmpu216nl002sd5uga8ohegg9	cmpu216m1000wd5ugbjiikzj5	FoxWeld Master 202M	foxweld-master-202m	General-purpose inverter for site fabrication and maintenance.	A versatile welding inverter used for canopies, brackets, and quick structural repairs around the site.	FoxWeld	Master 202M	32.00	150.00	4	4	6.30	5.20	AVAILABLE	f	2026-05-31 17:29:28.305	2026-05-31 17:29:38.022
cmpu216nl002ud5ugscckzjwu	cmpu216m1000wd5ugbjiikzj5	Resanta SAI-220	resanta-sai-220	Inverter under preventive service after fan and cable inspection.	Popular welding machine temporarily rotated out while fan bearings and output cables are being checked.	Resanta	SAI-220	29.00	145.00	3	0	7.20	4.90	MAINTENANCE	f	2026-05-31 17:29:28.306	2026-05-31 17:29:38.023
cmpu216n0001qd5ugicavws33	cmpu216lz000sd5uggdgeivpe	Masalta MS60-4 Compactor	masalta-ms60-4	Light compactor rotated into workshop inspection after a long asphalt season.	Compact plate compactor currently off the shelf for preventive bearing and vibration system inspection.	Masalta	MS60-4	39.00	180.00	2	0	3.10	63.00	MAINTENANCE	f	2026-05-31 17:29:28.285	2026-05-31 17:29:37.997
cmpu216nn002wd5ugx53nijsp	cmpu216m1000wd5ugbjiikzj5	Aurora Stickmate 250	aurora-stickmate-250	Higher-output inverter for thicker steel and fabrication batches.	A dependable welding option for workshops and construction crews working with heavier metal profiles.	Aurora	Stickmate 250	45.00	205.00	2	1	8.50	7.80	AVAILABLE	f	2026-05-31 17:29:28.307	2026-05-31 17:29:38.023
cmpu216no002yd5ugw5q3lswn	cmpu216m2000xd5ugd6z7247i	Stihl TS 420 Cut-Off Saw	stihl-ts-420	Handheld concrete and metal cutter for openings, curbs, and pipes.	Highly mobile cut-off saw for rescue openings, paving adjustments, steel sections, and utility work.	Stihl	TS 420	58.00	280.00	4	3	3.20	9.60	AVAILABLE	t	2026-05-31 17:29:28.308	2026-05-31 17:29:38.024
cmpu216np0030d5ugfq63q4af	cmpu216m2000xd5ugd6z7247i	Husqvarna K 770 Cutter	husqvarna-k770	Universal disc cutter for asphalt, curb stone, and reinforcement work.	Reliable high-output saw used by utility crews, paving teams, and general contractors on dense materials.	Husqvarna	K 770	62.00	300.00	4	1	3.70	10.10	AVAILABLE	f	2026-05-31 17:29:28.309	2026-05-31 17:29:38.025
cmpu216nq0032d5ugzw6k0y5s	cmpu216m2000xd5ugd6z7247i	Makita LC1230 Metal Saw	makita-lc1230	Cold-cut metal saw for profiles, channels, and site fabrication.	Accurate metal cutting saw for workshop corners and mobile fabrication tasks where clean edges matter.	Makita	LC1230	37.00	170.00	3	3	1.75	19.30	AVAILABLE	f	2026-05-31 17:29:28.31	2026-05-31 17:29:38.026
cmpu216nr0034d5ugmb25ejc3	cmpu216m2000xd5ugd6z7247i	Eibenstock EES 1400-3 Wall Chaser	eibenstock-ees-1400-3	Wall chaser unavailable while blade guards are being replaced.	Specialized chasing tool currently not rentable until guard hardware and dust seals are replaced.	Eibenstock	EES 1400-3	41.00	190.00	2	0	1.40	4.70	UNAVAILABLE	f	2026-05-31 17:29:28.311	2026-05-31 17:29:38.027
cmpu216ns0036d5ug0xnnwuav	cmpu216m2000xd5ugd6z7247i	Legacy Asphalt Saw 500	legacy-asphalt-saw-500	Archived road saw retained only for old contract reference.	Historical equipment record preserved for reporting and documentation of earlier municipal projects.	BuildRent Legacy	Asphalt Saw 500	85.00	430.00	1	0	9.00	115.00	ARCHIVED	f	2026-05-31 17:29:28.312	2026-05-31 17:29:38.028
cmpu216ns0038d5ugivrykrme	cmpu216m2000yd5ugjmxha24a	Bosch GLL 3-80 CG Laser Level	bosch-gll-3-80-cg	Green-beam laser for interior layout and suspended ceiling work.	Highly visible laser level for partition framing, suspended ceilings, tiling, and cabinet alignment.	Bosch	GLL 3-80 CG	24.00	120.00	6	5	\N	0.90	AVAILABLE	f	2026-05-31 17:29:28.313	2026-05-31 17:29:38.029
cmpu216nt003ad5ugcgyrtsjo	cmpu216m2000yd5ugjmxha24a	Leica Rugby 620 Rotary Laser	leica-rugby-620	Outdoor rotary laser for grading, utilities, and site leveling.	A professional-grade rotary laser used on larger plots, foundations, and exterior utility alignment.	Leica	Rugby 620	48.00	260.00	3	3	\N	2.40	AVAILABLE	f	2026-05-31 17:29:28.314	2026-05-31 17:29:38.029
cmpu216nu003cd5ugz8tfmbiy	cmpu216m2000yd5ugjmxha24a	Stanley TLM330 Distance Meter	stanley-tlm330	Compact laser meter for quick room, facade, and opening measurements.	Convenient handheld range finder for finish estimators, survey support, and installation planning.	Stanley	TLM330	12.00	60.00	8	6	\N	0.18	AVAILABLE	f	2026-05-31 17:29:28.315	2026-05-31 17:29:38.03
cmpu216nv003ed5ugrwn6xnla	cmpu216m2000yd5ugjmxha24a	ADA Cube 360 Home Edition	ada-cube-360-home	Laser level paused from rental because of calibration drift.	Compact laser level currently awaiting calibration after drift was detected during a quality check.	ADA	Cube 360 Home Edition	10.00	45.00	5	0	\N	0.35	UNAVAILABLE	f	2026-05-31 17:29:28.316	2026-05-31 17:29:38.031
cmpu216nx003gd5ug6jpvmysq	cmpu216m2000yd5ugjmxha24a	Trimble M3 Total Station	trimble-m3-total-station	Survey-grade station for site layout, axes transfer, and geodesy support.	A precision instrument for contractors that need complex geometry transfer and accurate site control.	Trimble	M3	120.00	700.00	1	0	\N	4.50	AVAILABLE	f	2026-05-31 17:29:28.317	2026-05-31 17:29:38.032
\.


--
-- Data for Name: EquipmentImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentImage" (id, "equipmentId", url, alt, "sortOrder", "createdAt") FROM stdin;
cmptsu9940009d56ogtmvocd9	cmptsu95u0004d56ozy3q233y	https://example.com/wacker-updated-1.jpg	??????????? ???? 1	1	2026-05-31 13:12:08.536
cmptsu994000ad56oh4beg4xo	cmptsu95u0004d56ozy3q233y	https://example.com/wacker-updated-2.jpg	??????????? ???? 2	2	2026-05-31 13:12:08.536
cmptttgdc0003d5ccqwt9ovas	cmptttgdc0002d5cccj91948z	https://example.com/rental-test-equipment.jpg	Rental Test Equipment	1	2026-05-31 13:39:30.72
cmptuda150003d5dsx0rmpmmz	cmptuda150002d5dsc5jsok49	https://example.com/favorites-reviews-equipment.jpg	Favorites Reviews Equipment	1	2026-05-31 13:54:55.625
cmptuda1m0007d5dskeow6cnx	cmptuda1m0006d5ds2qcuiqq6	https://example.com/archived-equipment.jpg	Archived Equipment	1	2026-05-31 13:54:55.643
cmptugnlw000kd5ds6l8vh3fx	cmptugnlw000jd5ds09u204t6	https://example.com/pub.jpg	pub	1	2026-05-31 13:57:33.189
cmptuh78y000td5ds5t01al5h	cmptuh78y000sd5ds3vgs7bec	https://example.com/cat.jpg	cat	1	2026-05-31 13:57:58.643
cmptv76zn0003d59su5z52myj	cmptv76zn0002d59s59ck5dru	https://example.com/reports-machine.jpg	Reports Machine	1	2026-05-31 14:18:11.363
cmpu21e5x002td5iksqu51l7y	cmpu216mb0010d5ugzabpsrkm	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Bosch GBH 8-45 DV Rotary Hammer view 1	0	2026-05-31 17:29:38.037
cmpu21e5x002ud5ik39kt3ddk	cmpu216mb0010d5ugzabpsrkm	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Bosch GBH 8-45 DV Rotary Hammer view 2	1	2026-05-31 17:29:38.037
cmpu21e5x002vd5ikuj3dcbpx	cmpu216mo0012d5ugujtqybh2	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Makita HM1214C Demolition Hammer view 1	0	2026-05-31 17:29:38.037
cmpu21e5x002wd5ikruobqqqg	cmpu216mo0012d5ugujtqybh2	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Makita HM1214C Demolition Hammer view 2	1	2026-05-31 17:29:38.037
cmpu21e5x002xd5ikwxw8habo	cmpu216mp0014d5ugu0lz927j	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	DeWalt D25902K Breaker view 1	0	2026-05-31 17:29:38.037
cmpu21e5x002yd5iko4iuhf5a	cmpu216mp0014d5ugu0lz927j	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	DeWalt D25902K Breaker view 2	1	2026-05-31 17:29:38.037
cmpu21e5x002zd5ikwhjwgvu0	cmpu216mq0016d5ugpx6o8yxs	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Hilti TE 1000-AVR Demolition Hammer view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0030d5ik1ylbhd1n	cmpu216mq0016d5ugpx6o8yxs	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Hilti TE 1000-AVR Demolition Hammer view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0031d5ik07gf2gqn	cmpu216mr0018d5ugf6vg3q9u	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Milwaukee Kango 950 S view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0032d5ikzxejo0pe	cmpu216mr0018d5ugf6vg3q9u	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Milwaukee Kango 950 S view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0033d5ikuaygep56	cmpu216ms001ad5ugemfo87rh	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Altrad Belle Minimix 150 view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0034d5ikq914k3q3	cmpu216ms001ad5ugemfo87rh	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Altrad Belle Minimix 150 view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0035d5ikiw7x7k8t	cmpu216mt001cd5ug9xa7nqhf	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Zitrek B1510 FK Mixer view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0036d5ik90rwoccq	cmpu216mt001cd5ug9xa7nqhf	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Zitrek B1510 FK Mixer view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0037d5ik65k7ctqv	cmpu216mu001ed5ug5aodaewy	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Sturm CM20160 Concrete Mixer view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0038d5ikxgg9r9l5	cmpu216mu001ed5ug5aodaewy	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Sturm CM20160 Concrete Mixer view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0039d5ikxnmc1ahr	cmpu216mv001gd5ugfa8f7hth	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	RedVerg RD-CM180 view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003ad5ikeyb9ujfe	cmpu216mv001gd5ugfa8f7hth	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	RedVerg RD-CM180 view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003bd5iksfmiec10	cmpu216mw001id5ughgbdbbke	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Patriot BM 208C Mixer view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003cd5ikfzodqo7v	cmpu216mw001id5ughgbdbbke	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Patriot BM 208C Mixer view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003dd5ikh91vbkql	cmpu216mx001kd5ug4h49hfpn	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Wacker Neuson VP1550AW view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003ed5ikmwwmauf7	cmpu216mx001kd5ug4h49hfpn	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Wacker Neuson VP1550AW view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003fd5ikzuy4mtr7	cmpu216my001md5ugh8znvup9	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Huter VP-90 Plate Compactor view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003gd5ikxit8a6yc	cmpu216my001md5ugh8znvup9	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Huter VP-90 Plate Compactor view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003hd5ikictm66vn	cmpu216mz001od5ug0u5b0jol	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Champion PC9045FH view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003id5ik0kq3i6zt	cmpu216mz001od5ug0u5b0jol	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Champion PC9045FH view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003jd5ikm7xrujj1	cmpu216n0001qd5ugicavws33	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Masalta MS60-4 Compactor view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003kd5ikzz2afiv0	cmpu216n0001qd5ugicavws33	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Masalta MS60-4 Compactor view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003ld5ik1e70hzmo	cmpu216n2001sd5ugmcaje11z	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Zitrek CNP 30-2 view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003md5ikk1e8e76d	cmpu216n2001sd5ugmcaje11z	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Zitrek CNP 30-2 view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003nd5ikrfek1bqp	cmpu216n4001ud5ugmt8r8aee	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Honda EU30is Inverter Generator view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003od5ik0a8por9d	cmpu216n4001ud5ugmt8r8aee	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Honda EU30is Inverter Generator view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003pd5ikjkd460pi	cmpu216n5001wd5ugfjewtyji	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Fubag BS 6600 AES view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003qd5ikpt8il9y9	cmpu216n5001wd5ugfjewtyji	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Fubag BS 6600 AES view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003rd5ikhjo1khzh	cmpu216n6001yd5ugu0fr6hvo	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Hyundai HHY 7050FE view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003sd5ikyz85zj6l	cmpu216n6001yd5ugu0fr6hvo	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Hyundai HHY 7050FE view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003td5ikkfxni5ro	cmpu216n70020d5ugl2fz23t1	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Firman SPG6500E2 view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003ud5ikix5g6u1a	cmpu216n70020d5ugl2fz23t1	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Firman SPG6500E2 view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003vd5ikg5yytniq	cmpu216n80022d5ug8rmjz67e	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	SDMO Technic 7500 TE view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003wd5ik2hnvn5ko	cmpu216n80022d5ug8rmjz67e	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	SDMO Technic 7500 TE view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003xd5ikkbdf7sod	cmpu216n90024d5ugqss61ynu	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	ABAC Montecarlo L20P view 1	0	2026-05-31 17:29:38.037
cmpu21e5x003yd5ikn3cs0925	cmpu216n90024d5ugqss61ynu	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	ABAC Montecarlo L20P view 2	1	2026-05-31 17:29:38.037
cmpu21e5x003zd5ik9ygnhfpq	cmpu216na0026d5uggtjk00n5	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Fubag VCF 100 CM3 view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0040d5ik0ucgwxxd	cmpu216na0026d5uggtjk00n5	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Fubag VCF 100 CM3 view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0041d5ikn4glk75u	cmpu216nb0028d5ugquezq4xy	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Remeza SB4/C-50.LB30A view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0042d5ikgutkv0dg	cmpu216nb0028d5ugquezq4xy	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Remeza SB4/C-50.LB30A view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0043d5ikp42cezm0	cmpu216nc002ad5ugd8hcmskj	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Patriot EURO 50/260K view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0044d5ikyhydgv13	cmpu216nc002ad5ugd8hcmskj	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Patriot EURO 50/260K view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0045d5ikz8uq87g5	cmpu216nd002cd5ug21i5wbkv	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Metabo Basic 250-24 W OF view 1	0	2026-05-31 17:29:38.037
cmpu21e5x0046d5ik8hymjl6h	cmpu216nd002cd5ug21i5wbkv	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Metabo Basic 250-24 W OF view 2	1	2026-05-31 17:29:38.037
cmpu21e5x0047d5ikic5mokrw	cmpu216ne002ed5ug1748imv1	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Krause Protec XXL 7 m Tower view 1	0	2026-05-31 17:29:38.037
cmpu21e5y0048d5ikraw1ytll	cmpu216ne002ed5ug1748imv1	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Krause Protec XXL 7 m Tower view 2	1	2026-05-31 17:29:38.037
cmpu21e5y0049d5ik99qpen9i	cmpu216nf002gd5ugzceozmj9	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Virastar VS Tower 6 m view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004ad5ikzl6diu9j	cmpu216nf002gd5ugzceozmj9	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Virastar VS Tower 6 m view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004bd5ikbscso9qk	cmpu216ng002id5ug3p3xiw19	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Layher Zifa Compact view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004cd5ik5t8nlwbp	cmpu216ng002id5ug3p3xiw19	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Layher Zifa Compact view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004dd5ikrcq2sz3u	cmpu216nh002kd5ugmw8ldssu	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Euro Scaffold Rolling Tower 75x190 view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004ed5ik8fe1bxdl	cmpu216nh002kd5ugmw8ldssu	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Euro Scaffold Rolling Tower 75x190 view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004fd5ikl9ht8x0w	cmpu216ni002md5ugaac4trp1	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Steel Frame Facade Kit 12 m view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004gd5ikr7ww6kds	cmpu216ni002md5ugaac4trp1	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Steel Frame Facade Kit 12 m view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004hd5ikwlvh85bs	cmpu216ni002od5ugcfr8ytc8	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	ESAB Rogue ES 200i view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004id5ikm8gmxkl8	cmpu216ni002od5ugcfr8ytc8	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	ESAB Rogue ES 200i view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004jd5ik2k6tyvbw	cmpu216nj002qd5ug3rjdm07r	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Svarog REAL ARC 200 Black view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004kd5ikdm88vqfb	cmpu216nj002qd5ug3rjdm07r	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Svarog REAL ARC 200 Black view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004ld5ik3k7yqaw8	cmpu216nl002sd5uga8ohegg9	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	FoxWeld Master 202M view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004md5ik2p0ypmf5	cmpu216nl002sd5uga8ohegg9	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	FoxWeld Master 202M view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004nd5ik5ad2je6v	cmpu216nl002ud5ugscckzjwu	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Resanta SAI-220 view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004od5ike3rylwqp	cmpu216nl002ud5ugscckzjwu	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Resanta SAI-220 view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004pd5ikmas2n6pf	cmpu216nn002wd5ugx53nijsp	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Aurora Stickmate 250 view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004qd5ikv69l6cft	cmpu216nn002wd5ugx53nijsp	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Aurora Stickmate 250 view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004rd5ikgxjrhg27	cmpu216no002yd5ugw5q3lswn	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Stihl TS 420 Cut-Off Saw view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004sd5iksv1sj77e	cmpu216no002yd5ugw5q3lswn	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Stihl TS 420 Cut-Off Saw view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004td5ikubts3nl9	cmpu216np0030d5ugfq63q4af	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Husqvarna K 770 Cutter view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004ud5ik3538h60m	cmpu216np0030d5ugfq63q4af	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Husqvarna K 770 Cutter view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004vd5ikx3yjjlhk	cmpu216nq0032d5ugzw6k0y5s	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Makita LC1230 Metal Saw view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004wd5ika32uacs3	cmpu216nq0032d5ugzw6k0y5s	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Makita LC1230 Metal Saw view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004xd5ikyx6jehob	cmpu216nr0034d5ugmb25ejc3	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Eibenstock EES 1400-3 Wall Chaser view 1	0	2026-05-31 17:29:38.037
cmpu21e5y004yd5ik48ozndt9	cmpu216nr0034d5ugmb25ejc3	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Eibenstock EES 1400-3 Wall Chaser view 2	1	2026-05-31 17:29:38.037
cmpu21e5y004zd5ikf0wu9rwj	cmpu216ns0036d5ug0xnnwuav	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Legacy Asphalt Saw 500 view 1	0	2026-05-31 17:29:38.037
cmpu21e5y0050d5ikmz4qvf7d	cmpu216ns0036d5ug0xnnwuav	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Legacy Asphalt Saw 500 view 2	1	2026-05-31 17:29:38.037
cmpu21e5y0051d5ikfbegf6qa	cmpu216ns0038d5ugivrykrme	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Bosch GLL 3-80 CG Laser Level view 1	0	2026-05-31 17:29:38.037
cmpu21e5y0052d5ikp8w2cgfv	cmpu216ns0038d5ugivrykrme	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Bosch GLL 3-80 CG Laser Level view 2	1	2026-05-31 17:29:38.037
cmpu21e5y0053d5ikr5thpm32	cmpu216nt003ad5ugcgyrtsjo	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Leica Rugby 620 Rotary Laser view 1	0	2026-05-31 17:29:38.037
cmpu21e5y0054d5ikwnzrs2av	cmpu216nt003ad5ugcgyrtsjo	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Leica Rugby 620 Rotary Laser view 2	1	2026-05-31 17:29:38.037
cmpu21e5y0055d5ikff6cij4v	cmpu216nu003cd5ugz8tfmbiy	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Stanley TLM330 Distance Meter view 1	0	2026-05-31 17:29:38.037
cmpu21e5y0056d5ikpx4z0hea	cmpu216nu003cd5ugz8tfmbiy	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Stanley TLM330 Distance Meter view 2	1	2026-05-31 17:29:38.037
cmpu21e5y0057d5iklwgkv7g5	cmpu216nv003ed5ugrwn6xnla	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	ADA Cube 360 Home Edition view 1	0	2026-05-31 17:29:38.037
cmpu21e5y0058d5iki6dmxbuf	cmpu216nv003ed5ugrwn6xnla	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	ADA Cube 360 Home Edition view 2	1	2026-05-31 17:29:38.037
cmpu21e5y0059d5ikv6qk80h0	cmpu216nx003gd5ug6jpvmysq	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Trimble M3 Total Station view 1	0	2026-05-31 17:29:38.037
cmpu21e5y005ad5ik0lgbt2fh	cmpu216nx003gd5ug6jpvmysq	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Trimble M3 Total Station view 2	1	2026-05-31 17:29:38.037
\.


--
-- Data for Name: EquipmentSpec; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentSpec" (id, "equipmentId", name, value, unit, "sortOrder") FROM stdin;
cmptsu99b000bd56ohwhb7dga	cmptsu95u0004d56ozy3q233y	????????	5.1	???	1
cmptsu99b000cd56onc7egz2o	cmptsu95u0004d56ozy3q233y	???	84	??	2
cmptsu99b000dd56o0yhfqlug	cmptsu95u0004d56ozy3q233y	??? ?????????	??????????	\N	3
cmptttgdc0004d5ccgjgvm2qv	cmptttgdc0002d5cccj91948z	Power	5	kW	1
cmptuda150004d5dsypqd41v3	cmptuda150002d5dsc5jsok49	Power	6	kW	1
cmptuda1m0008d5dslvt8hxcl	cmptuda1m0006d5ds2qcuiqq6	Weight	20	kg	1
cmptugnlw000ld5dsc996liko	cmptugnlw000jd5ds09u204t6	Power	1	kW	1
cmptuh78y000ud5ds9br3hd13	cmptuh78y000sd5ds3vgs7bec	Power	2	kW	1
cmptv76zn0004d59swogmq0yd	cmptv76zn0002d59s59ck5dru	Power	5	kW	1
cmpu21e6b005bd5ikef4u308l	cmpu216mb0010d5ugzabpsrkm	Impact energy	12.5	J	0
cmpu21e6b005cd5iki65l6e1h	cmpu216mb0010d5ugzabpsrkm	Chuck type	SDS-max	\N	1
cmpu21e6b005dd5ikiuzk5str	cmpu216mb0010d5ugzabpsrkm	Drilling diameter	45	mm	2
cmpu21e6b005ed5ik6dgqoki3	cmpu216mb0010d5ugzabpsrkm	Operating mode	Drilling and chiseling	\N	3
cmpu21e6b005fd5iklvpzhgm5	cmpu216mo0012d5ugujtqybh2	Impact energy	19.9	J	0
cmpu21e6b005gd5ik6pp016ak	cmpu216mo0012d5ugujtqybh2	Vibration control	AVT	\N	1
cmpu21e6b005hd5ikedk1h3y6	cmpu216mo0012d5ugujtqybh2	Voltage	220	V	2
cmpu21e6b005id5ikavi0zjrb	cmpu216mo0012d5ugujtqybh2	Case included	Yes	\N	3
cmpu21e6b005jd5ikxpmzydxy	cmpu216mp0014d5ugu0lz927j	Impact energy	19	J	0
cmpu21e6b005kd5ikah78g713	cmpu216mp0014d5ugu0lz927j	Tool holder	SDS-max	\N	1
cmpu21e6b005ld5ik1yejl7ry	cmpu216mp0014d5ugu0lz927j	Blows per minute	2100	\N	2
cmpu21e6b005md5ikh2dshapz	cmpu216mp0014d5ugu0lz927j	Use case	Slab and wall demolition	\N	3
cmpu21e6b005nd5iknmmbmo8w	cmpu216mq0016d5ugpx6o8yxs	Impact energy	26	J	0
cmpu21e6b005od5ik2jqyhxp5	cmpu216mq0016d5ugpx6o8yxs	Service status	Maintenance rotation	\N	1
cmpu21e6b005pd5ik5v3t1fok	cmpu216mq0016d5ugpx6o8yxs	Noise level	96	dB	2
cmpu21e6b005qd5ikstrtfjti	cmpu216mq0016d5ugpx6o8yxs	Recommended use	Structural demolition	\N	3
cmpu21e6b005rd5ikkjbo45w7	cmpu216mr0018d5ugf6vg3q9u	Blows per minute	1950	\N	0
cmpu21e6b005sd5ikpy79bwge	cmpu216mr0018d5ugf6vg3q9u	Impact energy	20	J	1
cmpu21e6b005td5ikkg1asvl0	cmpu216mr0018d5ugf6vg3q9u	Cord length	6	m	2
cmpu21e6b005ud5ikf2phrxdx	cmpu216mr0018d5ugf6vg3q9u	Transport case	Yes	\N	3
cmpu21e6b005vd5ikzhnq873m	cmpu216ms001ad5ugemfo87rh	Drum volume	130	L	0
cmpu21e6b005wd5ikrqkmrow8	cmpu216ms001ad5ugemfo87rh	Mix output	90	L	1
cmpu21e6b005xd5ikg8npx2zn	cmpu216ms001ad5ugemfo87rh	Power supply	220	V	2
cmpu21e6b005yd5ikob3tz8gz	cmpu216ms001ad5ugemfo87rh	Drive type	Electric	\N	3
cmpu21e6b005zd5ikw4crpnqc	cmpu216mt001cd5ug9xa7nqhf	Drum volume	140	L	0
cmpu21e6b0060d5ikwsvc8so9	cmpu216mt001cd5ug9xa7nqhf	Frame design	Portable wheel base	\N	1
cmpu21e6b0061d5ikhldqwcd7	cmpu216mt001cd5ug9xa7nqhf	Crown material	Cast iron	\N	2
cmpu21e6b0062d5ikua049g0v	cmpu216mt001cd5ug9xa7nqhf	Assembly	Quick release drum	\N	3
cmpu21e6b0063d5ikmcavyy01	cmpu216mu001ed5ug5aodaewy	Drum volume	160	L	0
cmpu21e6b0064d5ikainyreya	cmpu216mu001ed5ug5aodaewy	Mix output	110	L	1
cmpu21e6b0065d5ik2dz47npg	cmpu216mu001ed5ug5aodaewy	Motor protection	Thermal relay	\N	2
cmpu21e6b0066d5ik0uiqfqq5	cmpu216mu001ed5ug5aodaewy	Tilt control	Hand wheel	\N	3
cmpu21e6b0067d5ikzacd06e9	cmpu216mv001gd5ugfa8f7hth	Drum volume	180	L	0
cmpu21e6b0068d5iks1iq5ksw	cmpu216mv001gd5ugfa8f7hth	Availability note	Awaiting diagnostics	\N	1
cmpu21e6b0069d5ikeee8nrj7	cmpu216mv001gd5ugfa8f7hth	Gear ring	Steel	\N	2
cmpu21e6b006ad5ikzjd6vn1p	cmpu216mv001gd5ugfa8f7hth	Transport wheels	Yes	\N	3
cmpu21e6b006bd5ik77p1emz7	cmpu216mw001id5ughgbdbbke	Drum volume	200	L	0
cmpu21e6b006cd5ika36knsjv	cmpu216mw001id5ughgbdbbke	Mix output	140	L	1
cmpu21e6b006dd5ikvudtz0m8	cmpu216mw001id5ughgbdbbke	Batch purpose	Large pours	\N	2
cmpu21e6b006ed5ik4dwd2yop	cmpu216mw001id5ughgbdbbke	Power supply	220	V	3
cmpu21e6b006fd5ikr857nn3c	cmpu216mx001kd5ug4h49hfpn	Compaction force	15	kN	0
cmpu21e6b006gd5ik0r6us6pf	cmpu216mx001kd5ug4h49hfpn	Plate width	500	mm	1
cmpu21e6b006hd5iknyyc52y7	cmpu216mx001kd5ug4h49hfpn	Travel speed	25	m/min	2
cmpu21e6b006id5ikzvf9x6kv	cmpu216mx001kd5ug4h49hfpn	Engine type	Petrol	\N	3
cmpu21e6b006jd5ikz9pmhqml	cmpu216my001md5ugh8znvup9	Compaction force	13	kN	0
cmpu21e6b006kd5ik627195bg	cmpu216my001md5ugh8znvup9	Base plate	530 x 500	mm	1
cmpu21e6b006ld5ikl6iqj1dx	cmpu216my001md5ugh8znvup9	Fuel tank	3.6	L	2
cmpu21e6b006md5ikrsje1w9g	cmpu216my001md5ugh8znvup9	Starting system	Manual recoil	\N	3
cmpu21e6b006nd5ikcbsm3dkw	cmpu216mz001od5ug0u5b0jol	Compaction depth	300	mm	0
cmpu21e6b006od5iknlwcyea2	cmpu216mz001od5ug0u5b0jol	Force	15	kN	1
cmpu21e6b006pd5ikn5bq26yr	cmpu216mz001od5ug0u5b0jol	Water tank	No	\N	2
cmpu21e6b006qd5ikiu9sgspd	cmpu216mz001od5ug0u5b0jol	Handle	Foldable	\N	3
cmpu21e6b006rd5ikurzor529	cmpu216n0001qd5ugicavws33	Compaction force	10.5	kN	0
cmpu21e6b006sd5ik9gju4sx1	cmpu216n0001qd5ugicavws33	Maintenance note	Vibration unit inspection	\N	1
cmpu21e6b006td5ik3bkfoqni	cmpu216n0001qd5ugicavws33	Transport wheels	Optional	\N	2
cmpu21e6b006ud5ikfllkmxlo	cmpu216n0001qd5ugicavws33	Engine type	Petrol	\N	3
cmpu21e6b006vd5ikzuboyojh	cmpu216n2001sd5ugmcaje11z	Compaction force	25	kN	0
cmpu21e6b006wd5ik0l88klol	cmpu216n2001sd5ugmcaje11z	Plate size	630 x 400	mm	1
cmpu21e6b006xd5ikv1svhoio	cmpu216n2001sd5ugmcaje11z	Travel speed	18	m/min	2
cmpu21e6b006yd5ikchedc0m8	cmpu216n2001sd5ugmcaje11z	Use case	Road base and yard prep	\N	3
cmpu21e6b006zd5ikolknc5hc	cmpu216n4001ud5ugmt8r8aee	Rated power	2.8	kW	0
cmpu21e6b0070d5ikjydk8fr6	cmpu216n4001ud5ugmt8r8aee	Fuel type	Petrol	\N	1
cmpu21e6b0071d5ikkn15dslq	cmpu216n4001ud5ugmt8r8aee	Noise level	57	dB	2
cmpu21e6b0072d5ikccsulxee	cmpu216n4001ud5ugmt8r8aee	Run time	7	h	3
cmpu21e6b0073d5ikbll7f7uh	cmpu216n5001wd5ugfjewtyji	Rated power	5.0	kW	0
cmpu21e6b0074d5ik89k3p6ol	cmpu216n5001wd5ugfjewtyji	Sockets	2 x 220V	\N	1
cmpu21e6b0075d5iky6bc4m4k	cmpu216n5001wd5ugfjewtyji	Starter	Electric	\N	2
cmpu21e6b0076d5ikxezmff8h	cmpu216n5001wd5ugfjewtyji	Tank volume	25	L	3
cmpu21e6b0077d5ik4zjjbskg	cmpu216n6001yd5ugu0fr6hvo	Rated power	5.0	kW	0
cmpu21e6b0078d5ik17oebibr	cmpu216n6001yd5ugu0fr6hvo	Fuel tank	25	L	1
cmpu21e6b0079d5ik1kieq28g	cmpu216n6001yd5ugu0fr6hvo	Run time	8	h	2
cmpu21e6b007ad5ikswkifu90	cmpu216n6001yd5ugu0fr6hvo	Output phase	Single-phase	\N	3
cmpu21e6b007bd5ikxgxln6p9	cmpu216n70020d5ugl2fz23t1	Inspection reason	AVR and alternator test	\N	0
cmpu21e6b007cd5ikhqcq2cya	cmpu216n70020d5ugl2fz23t1	Rated power	5.0	kW	1
cmpu21e6c007dd5ikfh42cjqa	cmpu216n70020d5ugl2fz23t1	Fuel type	Petrol	\N	2
cmpu21e6c007ed5iklu2jmoki	cmpu216n70020d5ugl2fz23t1	Transport kit	Wheel set	\N	3
cmpu21e6c007fd5ikf47d6s7x	cmpu216n80022d5ug8rmjz67e	Rated power	6.0	kVA	0
cmpu21e6c007gd5ikbbzfhr8l	cmpu216n80022d5ug8rmjz67e	Phase	Three-phase	\N	1
cmpu21e6c007hd5ikhx57uqpo	cmpu216n80022d5ug8rmjz67e	Run time	9	h	2
cmpu21e6c007id5ikt5o86sf5	cmpu216n80022d5ug8rmjz67e	Starter	Electric	\N	3
cmpu21e6c007jd5ik7e1gcyw6	cmpu216n90024d5ugqss61ynu	Receiver volume	50	L	0
cmpu21e6c007kd5ikw6xyoi2f	cmpu216n90024d5ugqss61ynu	Pressure	10	bar	1
cmpu21e6c007ld5ikuzldf2n0	cmpu216n90024d5ugqss61ynu	Air flow	220	L/min	2
cmpu21e6c007md5ikvuw8reh5	cmpu216n90024d5ugqss61ynu	Portability	Wheel base	\N	3
cmpu21e6c007nd5iku9l1f42g	cmpu216na0026d5uggtjk00n5	Receiver volume	100	L	0
cmpu21e6c007od5ikbietye73	cmpu216na0026d5uggtjk00n5	Air flow	440	L/min	1
cmpu21e6c007pd5ikjs3c5glj	cmpu216na0026d5uggtjk00n5	Drive type	Belt	\N	2
cmpu21e6c007qd5ike25dryzf	cmpu216na0026d5uggtjk00n5	Pressure	10	bar	3
cmpu21e6c007rd5ikyk0x3h76	cmpu216nb0028d5ugquezq4xy	Receiver volume	50	L	0
cmpu21e6c007sd5ik419k1dwa	cmpu216nb0028d5ugquezq4xy	Air flow	420	L/min	1
cmpu21e6c007td5ikqzhid4dg	cmpu216nb0028d5ugquezq4xy	Pressure switch	Automatic	\N	2
cmpu21e6c007ud5ikhz0v5bo8	cmpu216nb0028d5ugquezq4xy	Country of assembly	Belarus	\N	3
cmpu21e6c007vd5ikpo6aog5r	cmpu216nc002ad5ugd8hcmskj	Receiver volume	50	L	0
cmpu21e6c007wd5ikxglvgru7	cmpu216nc002ad5ugd8hcmskj	Air flow	260	L/min	1
cmpu21e6c007xd5ik2qix87dk	cmpu216nc002ad5ugd8hcmskj	Repair note	Valve block replacement	\N	2
cmpu21e6c007yd5ikt5wamikn	cmpu216nc002ad5ugd8hcmskj	Drive type	Direct	\N	3
cmpu21e6c007zd5ik7xutmsxn	cmpu216nd002cd5ug21i5wbkv	Receiver volume	24	L	0
cmpu21e6c0080d5iknnktnf8q	cmpu216nd002cd5ug21i5wbkv	Oil-free	Yes	\N	1
cmpu21e6c0081d5ik0yu3e07h	cmpu216nd002cd5ug21i5wbkv	Air flow	200	L/min	2
cmpu21e6c0082d5ikn43ejomf	cmpu216nd002cd5ug21i5wbkv	Noise level	82	dB	3
cmpu21e6c0083d5ikp5j2av7g	cmpu216ne002ed5ug1748imv1	Working height	7.3	m	0
cmpu21e6c0084d5ikpipgo60s	cmpu216ne002ed5ug1748imv1	Platform size	2.0 x 0.6	m	1
cmpu21e6c0085d5ikpx30o7ec	cmpu216ne002ed5ug1748imv1	Material	Aluminum	\N	2
cmpu21e6c0086d5ikfxqrpu30	cmpu216ne002ed5ug1748imv1	Usage	Indoor and facade work	\N	3
cmpu21e6c0087d5ikq14cxr8n	cmpu216nf002gd5ugzceozmj9	Working height	6.2	m	0
cmpu21e6c0088d5ik346i2r68	cmpu216nf002gd5ugzceozmj9	Platform load	200	kg	1
cmpu21e6c0089d5ik20iawg9x	cmpu216nf002gd5ugzceozmj9	Assembly time	20	min	2
cmpu21e6c008ad5ikjfx1unwn	cmpu216nf002gd5ugzceozmj9	Transport mode	Compact sections	\N	3
cmpu21e6c008bd5ikuol4co4j	cmpu216ng002id5ug3p3xiw19	Working height	4.9	m	0
cmpu21e6c008cd5ikxbil0321	cmpu216ng002id5ug3p3xiw19	Frame width	0.85	m	1
cmpu21e6c008dd5ik81hhsrwo	cmpu216ng002id5ug3p3xiw19	Application	Stairwells and interiors	\N	2
cmpu21e6c008ed5ik0z8qrhai	cmpu216ng002id5ug3p3xiw19	Material	Aluminum	\N	3
cmpu21e6c008fd5ik3os6xalu	cmpu216nh002kd5ugmw8ldssu	Inspection note	Inventory and locking pin audit	\N	0
cmpu21e6c008gd5ik4fsrpo7c	cmpu216nh002kd5ugmw8ldssu	Working height	5.4	m	1
cmpu21e6c008hd5ikbemobvzz	cmpu216nh002kd5ugmw8ldssu	Platform width	0.75	m	2
cmpu21e6c008id5ikay1w6hop	cmpu216nh002kd5ugmw8ldssu	Material	Aluminum	\N	3
cmpu21e6c008jd5ikjxtb7euc	cmpu216ni002md5ugaac4trp1	Archive note	Not offered for new rentals	\N	0
cmpu21e6c008kd5ikmubgcile	cmpu216ni002md5ugaac4trp1	Working height	12	m	1
cmpu21e6c008ld5iksycn4wsq	cmpu216ni002md5ugaac4trp1	Material	Steel	\N	2
cmpu21e6c008md5ikd2c0tkha	cmpu216ni002md5ugaac4trp1	Sections	Facade frame set	\N	3
cmpu21e6c008nd5ikc3wdjnfx	cmpu216ni002od5ugcfr8ytc8	Welding current	200	A	0
cmpu21e6c008od5ikl5gyv8kt	cmpu216ni002od5ugcfr8ytc8	Electrode diameter	4	mm	1
cmpu21e6c008pd5ik9coimmyl	cmpu216ni002od5ugcfr8ytc8	Input voltage	220	V	2
cmpu21e6c008qd5ikpp9e1f5l	cmpu216ni002od5ugcfr8ytc8	Protection class	IP23S	\N	3
cmpu21e6c008rd5ike3ikk2xy	cmpu216nj002qd5ug3rjdm07r	Welding current	200	A	0
cmpu21e6c008sd5ik0p55f4qg	cmpu216nj002qd5ug3rjdm07r	Duty cycle	60	%	1
cmpu21e6c008td5ikj843qn1t	cmpu216nj002qd5ug3rjdm07r	Hot start	Yes	\N	2
cmpu21e6c008ud5iksfrdhlo7	cmpu216nj002qd5ug3rjdm07r	Arc force	Adjustable	\N	3
cmpu21e6c008vd5ik08dr4rex	cmpu216nl002sd5uga8ohegg9	Welding current	200	A	0
cmpu21e6c008wd5ik2mjyw27q	cmpu216nl002sd5uga8ohegg9	Display	Digital	\N	1
cmpu21e6c008xd5ikv9hslq5u	cmpu216nl002sd5uga8ohegg9	Electrode diameter	5	mm	2
cmpu21e6c008yd5ikx3vwkkgx	cmpu216nl002sd5uga8ohegg9	Cooling	Forced air	\N	3
cmpu21e6c008zd5ikxujg0z9k	cmpu216nl002ud5ugscckzjwu	Maintenance note	Fan and cable inspection	\N	0
cmpu21e6c0090d5ikj0cxwbzi	cmpu216nl002ud5ugscckzjwu	Welding current	220	A	1
cmpu21e6c0091d5ikynpm73g9	cmpu216nl002ud5ugscckzjwu	Voltage range	140-260	V	2
cmpu21e6c0092d5ik0tjn6eaa	cmpu216nl002ud5ugscckzjwu	Cooling	Forced	\N	3
cmpu21e6c0093d5ikils0po59	cmpu216nn002wd5ugx53nijsp	Welding current	250	A	0
cmpu21e6c0094d5ikzf0suri7	cmpu216nn002wd5ugx53nijsp	Duty cycle	60	%	1
cmpu21e6c0095d5ik3r3ozul2	cmpu216nn002wd5ugx53nijsp	Electrode diameter	6	mm	2
cmpu21e6c0096d5ikbe54ejds	cmpu216nn002wd5ugx53nijsp	Application	Heavy steel profiles	\N	3
cmpu21e6c0097d5ikdzrs4wl8	cmpu216no002yd5ugw5q3lswn	Disc diameter	350	mm	0
cmpu21e6c0098d5iktsiodt45	cmpu216no002yd5ugw5q3lswn	Cutting depth	125	mm	1
cmpu21e6c0099d5ikboeb8al5	cmpu216no002yd5ugw5q3lswn	Engine type	Petrol	\N	2
cmpu21e6c009ad5ikv5s7l306	cmpu216no002yd5ugw5q3lswn	Water connection	Yes	\N	3
cmpu21e6c009bd5ik7xb7htmt	cmpu216np0030d5ugfq63q4af	Disc diameter	350	mm	0
cmpu21e6c009cd5ikjr3iu5w0	cmpu216np0030d5ugfq63q4af	Cutting depth	125	mm	1
cmpu21e6c009dd5iky1ng4z2c	cmpu216np0030d5ugfq63q4af	Power source	Petrol	\N	2
cmpu21e6c009ed5ik6xykgmqf	cmpu216np0030d5ugfq63q4af	Use case	Concrete and steel	\N	3
cmpu21e6c009fd5iksmpvgwnm	cmpu216nq0032d5ugzw6k0y5s	Blade diameter	305	mm	0
cmpu21e6c009gd5ikvx3pei9j	cmpu216nq0032d5ugzw6k0y5s	Cut type	Cold cut	\N	1
cmpu21e6c009hd5ik9jqcgs4b	cmpu216nq0032d5ugzw6k0y5s	Material	Metal profiles	\N	2
cmpu21e6c009id5ikx5z7oeyr	cmpu216nq0032d5ugzw6k0y5s	Power supply	220	V	3
cmpu21e6c009jd5ikkccybrre	cmpu216nr0034d5ugmb25ejc3	Blade set	Twin disc	\N	0
cmpu21e6c009kd5ik7tvpxcqs	cmpu216nr0034d5ugmb25ejc3	Cut width	10-40	mm	1
cmpu21e6c009ld5ikwyjj2geh	cmpu216nr0034d5ugmb25ejc3	Repair note	Blade guard replacement	\N	2
cmpu21e6c009md5ikfq8rbnvs	cmpu216nr0034d5ugmb25ejc3	Dust extraction	Supported	\N	3
cmpu21e6c009nd5ikpg53di86	cmpu216ns0036d5ug0xnnwuav	Archive note	Historical record only	\N	0
cmpu21e6c009od5ikq5e94akd	cmpu216ns0036d5ug0xnnwuav	Disc diameter	500	mm	1
cmpu21e6c009pd5ikvluy1020	cmpu216ns0036d5ug0xnnwuav	Engine type	Petrol	\N	2
cmpu21e6c009qd5ik56yyy46c	cmpu216ns0036d5ug0xnnwuav	Use case	Road repairs	\N	3
cmpu21e6c009rd5ik5tfggbmh	cmpu216ns0038d5ugivrykrme	Range	30	m	0
cmpu21e6c009sd5ikv71tixtx	cmpu216ns0038d5ugivrykrme	Beam color	Green	\N	1
cmpu21e6c009td5ikjr1im8q9	cmpu216ns0038d5ugivrykrme	Accuracy	+/- 0.2	mm/m	2
cmpu21e6c009ud5ik03rta65a	cmpu216ns0038d5ugivrykrme	Bluetooth	Yes	\N	3
cmpu21e6c009vd5ikzkkqhujk	cmpu216nt003ad5ugcgyrtsjo	Range	800	m	0
cmpu21e6c009wd5ika9dr43w1	cmpu216nt003ad5ugcgyrtsjo	Protection	IP67	\N	1
cmpu21e6c009xd5ikdl7ne44z	cmpu216nt003ad5ugcgyrtsjo	Accuracy	+/- 1.5	mm at 30 m	2
cmpu21e6c009yd5ikcui9t7tm	cmpu216nt003ad5ugcgyrtsjo	Application	Outdoor grading	\N	3
cmpu21e6c009zd5ik5o90tk75	cmpu216nu003cd5ugz8tfmbiy	Range	100	m	0
cmpu21e6c00a0d5ik88q481nc	cmpu216nu003cd5ugz8tfmbiy	Accuracy	+/- 1.5	mm	1
cmpu21e6c00a1d5iktvpnhs08	cmpu216nu003cd5ugz8tfmbiy	Display	Backlit	\N	2
cmpu21e6c00a2d5ik5l4w9num	cmpu216nu003cd5ugz8tfmbiy	Functions	Area and volume	\N	3
cmpu21e6c00a3d5ik1d0mt5d5	cmpu216nv003ed5ugrwn6xnla	Calibration note	Pending calibration	\N	0
cmpu21e6c00a4d5ikfxnomscv	cmpu216nv003ed5ugrwn6xnla	Range	20	m	1
cmpu21e6c00a5d5ik3mttd1gn	cmpu216nv003ed5ugrwn6xnla	Beam planes	1 x 360 deg	\N	2
cmpu21e6c00a6d5ikf0onwl8h	cmpu216nv003ed5ugrwn6xnla	Tripod thread	1/4	\N	3
cmpu21e6c00a7d5ikx1m979lb	cmpu216nx003gd5ug6jpvmysq	Angular accuracy	5	sec	0
cmpu21e6c00a8d5ikhf7tx7zn	cmpu216nx003gd5ug6jpvmysq	Range with prism	3000	m	1
cmpu21e6c00a9d5iklxvzziu4	cmpu216nx003gd5ug6jpvmysq	Storage	Internal memory	\N	2
cmpu21e6c00aad5ikc8wk8wxk	cmpu216nx003gd5ug6jpvmysq	Use case	Construction layout	\N	3
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Favorite" (id, "userId", "equipmentId", "createdAt") FROM stdin;
cmpu21e9500f5d5iks7lihi5b	cmpu2165a0003d5ugp81cvo3c	cmpu216mb0010d5ugzabpsrkm	2026-05-31 17:29:38.153
cmpu21e9500f6d5iku8lsow51	cmpu2166y0005d5ugb4frzf2f	cmpu216mq0016d5ugpx6o8yxs	2026-05-31 17:29:38.153
cmpu21e9500f7d5ikwl0fhjli	cmpu2168h0007d5ugnf2jgise	cmpu216mu001ed5ug5aodaewy	2026-05-31 17:29:38.153
cmpu21e9500f8d5ik2yhukcvt	cmpu2169y0009d5ugfhga2ez2	cmpu216mx001kd5ug4h49hfpn	2026-05-31 17:29:38.153
cmpu21e9500f9d5ikimqxgriq	cmpu216bg000bd5ugd2qb3qvf	cmpu216n2001sd5ugmcaje11z	2026-05-31 17:29:38.153
cmpu21e9500fad5ik5bn29k77	cmpu216cy000dd5uglc96kk2d	cmpu216n6001yd5ugu0fr6hvo	2026-05-31 17:29:38.153
cmpu21e9500fbd5ikmujavd5s	cmpu216ee000fd5ug53k7bbtd	cmpu216na0026d5uggtjk00n5	2026-05-31 17:29:38.153
cmpu21e9500fcd5ik9k99t11f	cmpu216fw000hd5ug1jlu1bgl	cmpu216nd002cd5ug21i5wbkv	2026-05-31 17:29:38.153
cmpu21e9500fdd5iky0230zcx	cmpu216hd000jd5ugc1fzmsz3	cmpu216nh002kd5ugmw8ldssu	2026-05-31 17:29:38.153
cmpu21e9500fed5ikpgu5icse	cmpu216iv000ld5ug1eear6f0	cmpu216nl002sd5uga8ohegg9	2026-05-31 17:29:38.153
cmpu21e9500ffd5ikf5wrwd07	cmpu216kd000nd5ugzsuleofa	cmpu216np0030d5ugfq63q4af	2026-05-31 17:29:38.153
cmpu21e9500fgd5ikp2at5md7	cmpu216lu000pd5ugwgq7vwpc	cmpu216ns0038d5ugivrykrme	2026-05-31 17:29:38.153
cmpu21e9500fhd5ik7c7w4ghf	cmpu2165a0003d5ugp81cvo3c	cmpu216nx003gd5ug6jpvmysq	2026-05-31 17:29:38.153
cmpu21e9500fid5ik5u827iah	cmpu2166y0005d5ugb4frzf2f	cmpu216mp0014d5ugu0lz927j	2026-05-31 17:29:38.153
cmpu21e9500fjd5ik8jg765tk	cmpu2168h0007d5ugnf2jgise	cmpu216mt001cd5ug9xa7nqhf	2026-05-31 17:29:38.153
cmpu21e9500fkd5ikon43og6r	cmpu2169y0009d5ugfhga2ez2	cmpu216mw001id5ughgbdbbke	2026-05-31 17:29:38.153
cmpu21e9500fld5ikfuv2419j	cmpu216bg000bd5ugd2qb3qvf	cmpu216n0001qd5ugicavws33	2026-05-31 17:29:38.153
cmpu21e9500fmd5ika1h0l8p1	cmpu216cy000dd5uglc96kk2d	cmpu216n5001wd5ugfjewtyji	2026-05-31 17:29:38.153
cmpu21e9500fnd5ikqfaeyzvz	cmpu216ee000fd5ug53k7bbtd	cmpu216n90024d5ugqss61ynu	2026-05-31 17:29:38.153
cmpu21e9500fod5ikno6eh8re	cmpu216fw000hd5ug1jlu1bgl	cmpu216nc002ad5ugd8hcmskj	2026-05-31 17:29:38.153
cmpu21e9500fpd5iku4lctjkw	cmpu216hd000jd5ugc1fzmsz3	cmpu216ng002id5ug3p3xiw19	2026-05-31 17:29:38.153
cmpu21e9500fqd5iklpvgzsqq	cmpu216iv000ld5ug1eear6f0	cmpu216nj002qd5ug3rjdm07r	2026-05-31 17:29:38.153
cmpu21e9500frd5ikrvlbcwok	cmpu216kd000nd5ugzsuleofa	cmpu216no002yd5ugw5q3lswn	2026-05-31 17:29:38.153
cmpu21e9500fsd5ikvafjw8n3	cmpu216lu000pd5ugwgq7vwpc	cmpu216nr0034d5ugmb25ejc3	2026-05-31 17:29:38.153
cmpu21e9500ftd5ikxpb4sqef	cmpu2165a0003d5ugp81cvo3c	cmpu216nv003ed5ugrwn6xnla	2026-05-31 17:29:38.153
cmpu21e9500fud5ik522i81ut	cmpu2166y0005d5ugb4frzf2f	cmpu216mo0012d5ugujtqybh2	2026-05-31 17:29:38.153
cmpu21e9500fvd5ikpko7qxkn	cmpu2168h0007d5ugnf2jgise	cmpu216ms001ad5ugemfo87rh	2026-05-31 17:29:38.153
cmpu21e9500fwd5ikc3wzgdd2	cmpu2169y0009d5ugfhga2ez2	cmpu216mv001gd5ugfa8f7hth	2026-05-31 17:29:38.153
cmpu21e9500fxd5ikswfubi3z	cmpu216bg000bd5ugd2qb3qvf	cmpu216mz001od5ug0u5b0jol	2026-05-31 17:29:38.153
cmpu21e9500fyd5ikpx6d6l5e	cmpu216cy000dd5uglc96kk2d	cmpu216n4001ud5ugmt8r8aee	2026-05-31 17:29:38.153
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, "rentalOrderId", amount, status, method, "paidAt", "createdAt", "updatedAt") FROM stdin;
cmpu21e9m00h3d5ikga8fvma9	cmpu21e7700acd5ik0jdgjcmv	710.00	FAILED	BANK_TRANSFER_MOCK	\N	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9m00h4d5iklqznqlrd	cmpu21e7p00agd5ikadllaz2e	799.00	PAID	CASH	2026-06-02 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00h5d5ikv84avj2s	cmpu21e7r00ald5ik4u3k3uaf	1916.00	PAID	CARD_MOCK	2026-05-26 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00h6d5ik556ipqdi	cmpu21e7t00ard5ikof10sw2f	665.00	PAID	CASH	2026-04-14 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00h7d5ik6i2nikl9	cmpu21e7u00avd5ikev3ocvp9	1180.00	REFUNDED	CARD_MOCK	2026-05-15 10:00:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00h8d5ikujlty3e6	cmpu21e7v00b0d5ik6plax0cb	3633.00	PENDING	CARD_MOCK	\N	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00h9d5ik7v467jvn	cmpu21e7x00b6d5ikbjjk2h7w	640.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00had5ik0t0mmqbh	cmpu21e7y00bad5ik7wgkkgx9	1707.00	PAID	CASH	2026-04-18 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hbd5ik0nrqfknp	cmpu21e7z00bfd5ikceoav8m8	2025.00	PAID	CARD_MOCK	2026-05-26 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hcd5ikwg41v2xk	cmpu21e8200bpd5ikhy662am9	2062.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hdd5ikg596raqp	cmpu21e8400bud5ikrxtzupir	1457.00	PAID	CARD_MOCK	2026-06-06 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hed5ik92fos0nt	cmpu21e8500c0d5ikbk2zit6d	602.00	PAID	CASH	2026-04-23 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hfd5ik5hg9h9wd	cmpu21e8600c4d5ikqwoyvpsl	930.00	REFUNDED	CARD_MOCK	2026-05-24 10:00:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hgd5ikmalz6spk	cmpu21e8800c9d5ikql6hswkg	2916.00	PAID	CASH	2026-05-26 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hhd5ik0nb8wtct	cmpu21e8900cfd5ikjg0ir84w	409.00	PENDING	CARD_MOCK	\N	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hid5ikm8kfp7s2	cmpu21e8b00cjd5ikmzzqksi2	538.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hjd5ik0ozkejap	cmpu21e8c00cod5ikky4imeeo	2163.00	PAID	CARD_MOCK	2026-04-28 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hkd5ikpgzm5jz4	cmpu21e8e00cud5ikk1ndee4b	1056.00	PENDING	CARD_MOCK	\N	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hld5ikv3hdfmge	cmpu21e8g00cyd5ikag7ofjmw	978.00	PAID	CARD_MOCK	2026-05-27 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
cmpu21e9n00hmd5ik6ea4icd0	cmpu21e8h00d3d5ikcyl886r4	1612.00	PAID	CASH	2026-05-01 08:30:00	2026-05-31 17:29:38.171	2026-05-31 17:29:38.171
\.


--
-- Data for Name: RentalOrder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RentalOrder" (id, "userId", "orderNumber", status, "startDate", "endDate", "deliveryType", "deliveryAddress", "customerComment", "managerComment", subtotal, "depositTotal", "deliveryPrice", "totalPrice", "createdAt", "updatedAt") FROM stdin;
cmptttght000ad5ccj2ur7mhj	cmptttgf70006d5ccndvblknq	BR-20260531-1802	CANCELLED	2026-06-01 00:00:00	2026-06-05 23:59:59.999	DELIVERY	?. ???????, ??. ????????????, 10	Morning delivery please	Approved during automated manual verification	500.00	400.00	25.00	925.00	2026-05-31 13:39:30.881	2026-05-31 13:39:30.98
cmptttgkt000ed5cchp7snve3	cmptttgf70006d5ccndvblknq	BR-20260531-6613	COMPLETED	2026-06-10 00:00:00	2026-06-12 23:59:59.999	PICKUP	\N	\N	Manager note saved separately	150.00	200.00	0.00	350.00	2026-05-31 13:39:30.989	2026-05-31 13:39:31.031
cmptv773w000ad59slbs0vix7	cmptv771z0006d59sp0bse6xq	BR-20260531-8630	PENDING	2026-06-01 00:00:00	2026-06-03 23:59:59.999	DELIVERY	Mogilev, Pervomayskaya 10	Need morning delivery	\N	165.00	210.00	25.00	400.00	2026-05-31 14:18:11.516	2026-05-31 14:18:11.516
cmptv7746000ed59siycsehzu	cmptv773k0008d59s18fz2lv7	BR-20260531-4234	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	PICKUP	\N	\N	\N	165.00	210.00	0.00	375.00	2026-05-31 14:18:11.527	2026-05-31 14:18:11.527
cmpu21e7700acd5ik0jdgjcmv	cmpu2165a0003d5ugp81cvo3c	BR-SEED-0001	PENDING	2026-06-05 00:00:00	2026-06-07 23:59:59.999	PICKUP	\N	Please confirm morning pickup.	Waiting for final customer confirmation.	270.00	440.00	0.00	710.00	2026-05-31 17:29:38.083	2026-05-31 17:29:38.083
cmpu21e7p00agd5ikadllaz2e	cmpu2166y0005d5ugb4frzf2f	BR-SEED-0002	APPROVED	2026-06-02 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Minsk, Pritytskogo St. 48, warehouse yard	Need the equipment for a tight renovation schedule.	Approved by operator after stock and identity check.	344.00	430.00	25.00	799.00	2026-05-31 17:29:38.101	2026-05-31 17:29:38.101
cmpu21e7r00ald5ik4u3k3uaf	cmpu2168h0007d5ugnf2jgise	BR-SEED-0003	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Site access is available after 09:00.	Rental is in progress and inventory is reserved.	1176.00	740.00	0.00	1916.00	2026-05-31 17:29:38.103	2026-05-31 17:29:38.103
cmpu21e7t00ard5ikof10sw2f	cmpu2169y0009d5ugfhga2ez2	BR-SEED-0004	COMPLETED	2026-04-14 00:00:00	2026-04-18 23:59:59.999	DELIVERY	Brest, Moskovskaya St. 212, building plot 4	Please include extension cable recommendations.	Equipment returned and checked by the warehouse team.	320.00	320.00	25.00	665.00	2026-05-31 17:29:38.105	2026-05-31 17:29:38.105
cmpu21e7u00avd5ikev3ocvp9	cmpu216bg000bd5ugd2qb3qvf	BR-SEED-0005	CANCELLED	2026-05-15 00:00:00	2026-05-20 23:59:59.999	PICKUP	\N	Call one hour before delivery.	Cancelled at customer request after schedule change.	1452.00	1180.00	0.00	2632.00	2026-05-31 17:29:38.106	2026-05-31 17:29:38.106
cmpu21e7v00b0d5ik6plax0cb	cmpu216cy000dd5uglc96kk2d	BR-SEED-0006	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	DELIVERY	Gomel, Sovetskaya St. 118, rear loading dock	Crew works on weekdays only.	\N	1338.00	2270.00	25.00	3633.00	2026-05-31 17:29:38.108	2026-05-31 17:29:38.108
cmpu21e7x00b6d5ikbjjk2h7w	cmpu216ee000fd5ug53k7bbtd	BR-SEED-0007	APPROVED	2026-06-01 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Please confirm morning pickup.	Approved by operator after stock and identity check.	280.00	360.00	0.00	640.00	2026-05-31 17:29:38.109	2026-05-31 17:29:38.109
cmpu21e7y00bad5ik7wgkkgx9	cmpu216fw000hd5ug1jlu1bgl	BR-SEED-0008	COMPLETED	2026-04-18 00:00:00	2026-04-21 23:59:59.999	DELIVERY	Vitebsk, Lenina St. 26, municipal repair base	Need the equipment for a tight renovation schedule.	Equipment returned and checked by the warehouse team.	752.00	930.00	25.00	1707.00	2026-05-31 17:29:38.111	2026-05-31 17:29:38.111
cmpu21e7z00bfd5ikceoav8m8	cmpu216hd000jd5ugc1fzmsz3	BR-SEED-0009	ACTIVE	2026-05-26 00:00:00	2026-06-02 23:59:59.999	PICKUP	\N	Site access is available after 09:00.	Rental is in progress and inventory is reserved.	1240.00	785.00	0.00	2025.00	2026-05-31 17:29:38.112	2026-05-31 17:29:38.112
cmpu21e8100bld5ikv8egfu8g	cmpu216iv000ld5ug1eear6f0	BR-SEED-0010	REJECTED	2026-06-03 00:00:00	2026-06-08 23:59:59.999	DELIVERY	Minsk, Aerodromnaya St. 13, tower crane zone	Please include extension cable recommendations.	Rejected because the requested slot overlaps with planned maintenance.	360.00	300.00	25.00	685.00	2026-05-31 17:29:38.113	2026-05-31 17:29:38.113
cmpu21e8200bpd5ikhy662am9	cmpu216kd000nd5ugzsuleofa	BR-SEED-0011	PENDING	2026-06-05 00:00:00	2026-06-07 23:59:59.999	PICKUP	\N	Call one hour before delivery.	\N	762.00	1300.00	0.00	2062.00	2026-05-31 17:29:38.114	2026-05-31 17:29:38.114
cmpu21e8400bud5ikrxtzupir	cmpu216lu000pd5ugwgq7vwpc	BR-SEED-0012	APPROVED	2026-06-06 00:00:00	2026-06-09 23:59:59.999	DELIVERY	Minsk, Kuprevicha St. 1, tech park service lane	Crew works on weekdays only.	Approved by operator after stock and identity check.	632.00	800.00	25.00	1457.00	2026-05-31 17:29:38.116	2026-05-31 17:29:38.116
cmpu21e8500c0d5ikbk2zit6d	cmpu2165a0003d5ugp81cvo3c	BR-SEED-0013	COMPLETED	2026-04-23 00:00:00	2026-04-26 23:59:59.999	PICKUP	\N	Please confirm morning pickup.	Equipment returned and checked by the warehouse team.	272.00	330.00	0.00	602.00	2026-05-31 17:29:38.117	2026-05-31 17:29:38.117
cmpu21e8600c4d5ikqwoyvpsl	cmpu2166y0005d5ugb4frzf2f	BR-SEED-0014	CANCELLED	2026-05-24 00:00:00	2026-05-28 23:59:59.999	DELIVERY	Minsk, Pritytskogo St. 48, warehouse yard	Need the equipment for a tight renovation schedule.	Cancelled at customer request after schedule change.	930.00	930.00	25.00	1885.00	2026-05-31 17:29:38.119	2026-05-31 17:29:38.119
cmpu21e8800c9d5ikql6hswkg	cmpu2168h0007d5ugnf2jgise	BR-SEED-0015	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Site access is available after 09:00.	Rental is in progress and inventory is reserved.	1736.00	1180.00	0.00	2916.00	2026-05-31 17:29:38.12	2026-05-31 17:29:38.12
cmpu21e8900cfd5ikjg0ir84w	cmpu2169y0009d5ugfhga2ez2	BR-SEED-0016	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	DELIVERY	Brest, Moskovskaya St. 212, building plot 4	Please include extension cable recommendations.	Waiting for final customer confirmation.	144.00	240.00	25.00	409.00	2026-05-31 17:29:38.122	2026-05-31 17:29:38.122
cmpu21e8b00cjd5ikmzzqksi2	cmpu216bg000bd5ugd2qb3qvf	BR-SEED-0017	APPROVED	2026-06-05 00:00:00	2026-06-08 23:59:59.999	PICKUP	\N	Call one hour before delivery.	Approved by operator after stock and identity check.	248.00	290.00	0.00	538.00	2026-05-31 17:29:38.123	2026-05-31 17:29:38.123
cmpu21e8c00cod5ikky4imeeo	cmpu216cy000dd5uglc96kk2d	BR-SEED-0018	COMPLETED	2026-04-28 00:00:00	2026-05-01 23:59:59.999	DELIVERY	Gomel, Sovetskaya St. 118, rear loading dock	Crew works on weekdays only.	Equipment returned and checked by the warehouse team.	968.00	1170.00	25.00	2163.00	2026-05-31 17:29:38.125	2026-05-31 17:29:38.125
cmpu21e8e00cud5ikk1ndee4b	cmpu216ee000fd5ug53k7bbtd	BR-SEED-0019	PENDING	2026-06-13 00:00:00	2026-06-18 23:59:59.999	PICKUP	\N	Please confirm morning pickup.	Waiting for final customer confirmation.	576.00	480.00	0.00	1056.00	2026-05-31 17:29:38.126	2026-05-31 17:29:38.126
cmpu21e8g00cyd5ikag7ofjmw	cmpu216fw000hd5ug1jlu1bgl	BR-SEED-0020	ACTIVE	2026-05-27 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Vitebsk, Lenina St. 26, municipal repair base	Need the equipment for a tight renovation schedule.	Rental is in progress and inventory is reserved.	553.00	400.00	25.00	978.00	2026-05-31 17:29:38.128	2026-05-31 17:29:38.128
cmpu21e8h00d3d5ikcyl886r4	cmpu216hd000jd5ugc1fzmsz3	BR-SEED-0021	COMPLETED	2026-05-01 00:00:00	2026-05-02 23:59:59.999	PICKUP	\N	Site access is available after 09:00.	Equipment returned and checked by the warehouse team.	472.00	1140.00	0.00	1612.00	2026-05-31 17:29:38.129	2026-05-31 17:29:38.129
cmpu21e8i00d9d5ikvn634270	cmpu216iv000ld5ug1eear6f0	BR-SEED-0022	CANCELLED	2026-06-01 00:00:00	2026-06-03 23:59:59.999	DELIVERY	Minsk, Aerodromnaya St. 13, tower crane zone	Please include extension cable recommendations.	Cancelled at customer request after schedule change.	330.00	520.00	25.00	875.00	2026-05-31 17:29:38.131	2026-05-31 17:29:38.131
cmpu21e8k00ddd5iksxysb163	cmpu216kd000nd5ugzsuleofa	BR-SEED-0023	APPROVED	2026-06-05 00:00:00	2026-06-09 23:59:59.999	PICKUP	\N	Call one hour before delivery.	Approved by operator after stock and identity check.	640.00	635.00	0.00	1275.00	2026-05-31 17:29:38.133	2026-05-31 17:29:38.133
cmpu21e8m00did5ik9tk7ym6a	cmpu216lu000pd5ugwgq7vwpc	BR-SEED-0024	PENDING	2026-06-08 00:00:00	2026-06-13 23:59:59.999	DELIVERY	Minsk, Kuprevicha St. 1, tech park service lane	Crew works on weekdays only.	\N	1800.00	1530.00	25.00	3355.00	2026-05-31 17:29:38.134	2026-05-31 17:29:38.134
cmpu21e8n00dod5ikhk74kkqu	cmpu2165a0003d5ugp81cvo3c	BR-SEED-0025	COMPLETED	2026-05-05 00:00:00	2026-05-10 23:59:59.999	PICKUP	\N	Please confirm morning pickup.	Equipment returned and checked by the warehouse team.	816.00	680.00	0.00	1496.00	2026-05-31 17:29:38.136	2026-05-31 17:29:38.136
cmpu21e8o00dsd5ikk3ofmobr	cmpu2166y0005d5ugb4frzf2f	BR-SEED-0026	REJECTED	2026-06-03 00:00:00	2026-06-04 23:59:59.999	DELIVERY	Minsk, Pritytskogo St. 48, warehouse yard	Need the equipment for a tight renovation schedule.	Rejected because the requested slot overlaps with planned maintenance.	440.00	1160.00	25.00	1625.00	2026-05-31 17:29:38.137	2026-05-31 17:29:38.137
cmpu21e8q00dxd5ik98sn5er3	cmpu2168h0007d5ugnf2jgise	BR-SEED-0027	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Site access is available after 09:00.	Rental is in progress and inventory is reserved.	1056.00	640.00	0.00	1696.00	2026-05-31 17:29:38.138	2026-05-31 17:29:38.138
cmpu21e8r00e3d5ikwic9c0i7	cmpu2169y0009d5ugfhga2ez2	BR-SEED-0028	APPROVED	2026-06-04 00:00:00	2026-06-08 23:59:59.999	DELIVERY	Brest, Moskovskaya St. 212, building plot 4	Please include extension cable recommendations.	Approved by operator after stock and identity check.	475.00	500.00	25.00	1000.00	2026-05-31 17:29:38.14	2026-05-31 17:29:38.14
cmpu21e8t00e7d5ikggjswv8j	cmpu216bg000bd5ugd2qb3qvf	BR-SEED-0029	PENDING	2026-06-13 00:00:00	2026-06-18 23:59:59.999	PICKUP	\N	Call one hour before delivery.	\N	1224.00	1020.00	0.00	2244.00	2026-05-31 17:29:38.141	2026-05-31 17:29:38.141
cmpu21e8u00ecd5ik61b2oejv	cmpu216cy000dd5uglc96kk2d	BR-SEED-0030	COMPLETED	2026-05-10 00:00:00	2026-05-15 23:59:59.999	DELIVERY	Gomel, Sovetskaya St. 118, rear loading dock	Crew works on weekdays only.	Equipment returned and checked by the warehouse team.	1392.00	1110.00	25.00	2527.00	2026-05-31 17:29:38.142	2026-05-31 17:29:38.142
cmpu21e8v00eid5ikweuigckn	cmpu216ee000fd5ug53k7bbtd	BR-SEED-0031	CANCELLED	2026-06-10 00:00:00	2026-06-11 23:59:59.999	PICKUP	\N	Please confirm morning pickup.	Cancelled at customer request after schedule change.	180.00	410.00	0.00	590.00	2026-05-31 17:29:38.144	2026-05-31 17:29:38.144
cmpu21e8x00emd5iklmzvoh21	cmpu216fw000hd5ug1jlu1bgl	BR-SEED-0032	APPROVED	2026-06-02 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Vitebsk, Lenina St. 26, municipal repair base	Need the equipment for a tight renovation schedule.	Approved by operator after stock and identity check.	428.00	520.00	25.00	973.00	2026-05-31 17:29:38.145	2026-05-31 17:29:38.145
cmpu21e8y00erd5ikm4ngds3c	cmpu216hd000jd5ugc1fzmsz3	BR-SEED-0033	ACTIVE	2026-05-26 00:00:00	2026-06-02 23:59:59.999	PICKUP	\N	Site access is available after 09:00.	Rental is in progress and inventory is reserved.	784.00	490.00	0.00	1274.00	2026-05-31 17:29:38.146	2026-05-31 17:29:38.146
cmpu21e8z00exd5ik6fyo3s2l	cmpu216iv000ld5ug1eear6f0	BR-SEED-0034	COMPLETED	2026-05-14 00:00:00	2026-05-18 23:59:59.999	DELIVERY	Minsk, Aerodromnaya St. 13, tower crane zone	Please include extension cable recommendations.	Equipment returned and checked by the warehouse team.	120.00	120.00	25.00	265.00	2026-05-31 17:29:38.148	2026-05-31 17:29:38.148
cmpu21e9100f1d5ikuh9f3w4q	cmpu216kd000nd5ugzsuleofa	BR-SEED-0035	PENDING	2026-06-09 00:00:00	2026-06-15 23:59:59.999	PICKUP	\N	Call one hour before delivery.	\N	1050.00	740.00	0.00	1790.00	2026-05-31 17:29:38.149	2026-05-31 17:29:38.149
\.


--
-- Data for Name: RentalOrderItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RentalOrderItem" (id, "rentalOrderId", "equipmentId", quantity, "dailyPrice", "daysCount", "lineTotal", "createdAt") FROM stdin;
cmptttght000cd5cc6zee3y41	cmptttght000ad5ccj2ur7mhj	cmptttgdc0002d5cccj91948z	2	50.00	5	900.00	2026-05-31 13:39:30.881
cmptttgkt000gd5cce1rvbnli	cmptttgkt000ed5cchp7snve3	cmptttgdc0002d5cccj91948z	1	50.00	3	350.00	2026-05-31 13:39:30.989
cmptv773w000cd59sg3y1pspt	cmptv773w000ad59slbs0vix7	cmptv76zn0002d59s59ck5dru	1	55.00	3	375.00	2026-05-31 14:18:11.516
cmptv7746000gd59szp4v44g6	cmptv7746000ed59siycsehzu	cmptv76zn0002d59s59ck5dru	1	55.00	3	375.00	2026-05-31 14:18:11.527
cmpu21e7700aed5ikq69dp6v6	cmpu21e7700acd5ik0jdgjcmv	cmpu216mb0010d5ugzabpsrkm	2	45.00	3	710.00	2026-05-31 17:29:38.083
cmpu21e7p00aid5iksp3tsbx5	cmpu21e7p00agd5ikadllaz2e	cmpu216mp0014d5ugu0lz927j	1	48.00	4	432.00	2026-05-31 17:29:38.101
cmpu21e7p00ajd5ikocxqagrn	cmpu21e7p00agd5ikadllaz2e	cmpu216mw001id5ughgbdbbke	1	38.00	4	342.00	2026-05-31 17:29:38.101
cmpu21e7r00and5ikz6jqtlvq	cmpu21e7r00ald5ik4u3k3uaf	cmpu216ms001ad5ugemfo87rh	1	35.00	8	460.00	2026-05-31 17:29:38.103
cmpu21e7r00aod5ikjal1cc61	cmpu21e7r00ald5ik4u3k3uaf	cmpu216my001md5ugh8znvup9	1	44.00	8	572.00	2026-05-31 17:29:38.103
cmpu21e7r00apd5ikke4gm3p9	cmpu21e7r00ald5ik4u3k3uaf	cmpu216n6001yd5ugu0fr6hvo	1	68.00	8	884.00	2026-05-31 17:29:38.103
cmpu21e7t00atd5ik70efkky7	cmpu21e7t00ard5ikof10sw2f	cmpu216mu001ed5ug5aodaewy	2	32.00	5	640.00	2026-05-31 17:29:38.105
cmpu21e7u00axd5iks9ktwlqx	cmpu21e7u00avd5ikev3ocvp9	cmpu216mx001kd5ug4h49hfpn	2	55.00	6	1180.00	2026-05-31 17:29:38.106
cmpu21e7u00ayd5iknb85qylt	cmpu21e7u00avd5ikev3ocvp9	cmpu216n5001wd5ugfjewtyji	2	66.00	6	1452.00	2026-05-31 17:29:38.106
cmpu21e7v00b2d5ikvh1w6w51	cmpu21e7v00b0d5ik6plax0cb	cmpu216mz001od5ug0u5b0jol	2	46.00	3	706.00	2026-05-31 17:29:38.108
cmpu21e7v00b3d5iktm1nrrr6	cmpu21e7v00b0d5ik6plax0cb	cmpu216n80022d5ug8rmjz67e	2	82.00	3	1332.00	2026-05-31 17:29:38.108
cmpu21e7v00b4d5iku7dzrvmt	cmpu21e7v00b0d5ik6plax0cb	cmpu216ne002ed5ug1748imv1	2	95.00	3	1570.00	2026-05-31 17:29:38.108
cmpu21e7x00b8d5ik76jb3qxc	cmpu21e7x00b6d5ikbjjk2h7w	cmpu216n4001ud5ugmt8r8aee	1	70.00	4	640.00	2026-05-31 17:29:38.109
cmpu21e7y00bcd5ikbvtcdy53	cmpu21e7y00bad5ik7wgkkgx9	cmpu216n6001yd5ugu0fr6hvo	2	68.00	4	1224.00	2026-05-31 17:29:38.111
cmpu21e7y00bdd5ikktcq0lfz	cmpu21e7y00bad5ik7wgkkgx9	cmpu216nd002cd5ug21i5wbkv	2	26.00	4	458.00	2026-05-31 17:29:38.111
cmpu21e7z00bhd5ikli9hzjwk	cmpu21e7z00bfd5ikceoav8m8	cmpu216n90024d5ugqss61ynu	1	28.00	8	364.00	2026-05-31 17:29:38.112
cmpu21e8000bid5ik8sgzllmq	cmpu21e7z00bfd5ikceoav8m8	cmpu216nf002gd5ugzceozmj9	1	82.00	8	1096.00	2026-05-31 17:29:38.112
cmpu21e8000bjd5ikhsnp4wff	cmpu21e7z00bfd5ikceoav8m8	cmpu216nn002wd5ugx53nijsp	1	45.00	8	565.00	2026-05-31 17:29:38.112
cmpu21e8100bnd5ik3d7794r3	cmpu21e8100bld5ikv8egfu8g	cmpu216nb0028d5ugquezq4xy	2	30.00	6	660.00	2026-05-31 17:29:38.113
cmpu21e8200brd5ikthl6aj8g	cmpu21e8200bpd5ikhy662am9	cmpu216ne002ed5ug1748imv1	2	95.00	3	1570.00	2026-05-31 17:29:38.114
cmpu21e8200bsd5ikhqsxscqp	cmpu21e8200bpd5ikhy662am9	cmpu216nl002sd5uga8ohegg9	2	32.00	3	492.00	2026-05-31 17:29:38.114
cmpu21e8400bwd5ikfjhsrk8u	cmpu21e8400bud5ikrxtzupir	cmpu216ng002id5ug3p3xiw19	1	88.00	4	812.00	2026-05-31 17:29:38.116
cmpu21e8400bxd5iksssphawr	cmpu21e8400bud5ikrxtzupir	cmpu216no002yd5ugw5q3lswn	1	58.00	4	512.00	2026-05-31 17:29:38.116
cmpu21e8400byd5ikl6qx3wac	cmpu21e8400bud5ikrxtzupir	cmpu216nu003cd5ugz8tfmbiy	1	12.00	4	108.00	2026-05-31 17:29:38.116
cmpu21e8500c2d5ikwf1lih2u	cmpu21e8500c0d5ikbk2zit6d	cmpu216nj002qd5ug3rjdm07r	2	34.00	4	602.00	2026-05-31 17:29:38.117
cmpu21e8600c6d5ikwjoi67fw	cmpu21e8600c4d5ikqwoyvpsl	cmpu216nn002wd5ugx53nijsp	2	45.00	5	860.00	2026-05-31 17:29:38.119
cmpu21e8600c7d5ik1c7buruk	cmpu21e8600c4d5ikqwoyvpsl	cmpu216nt003ad5ugcgyrtsjo	2	48.00	5	1000.00	2026-05-31 17:29:38.119
cmpu21e8800cbd5ik5v8va4qj	cmpu21e8800c9d5ikql6hswkg	cmpu216np0030d5ugfq63q4af	1	62.00	8	796.00	2026-05-31 17:29:38.12
cmpu21e8800ccd5ik4toe0x7w	cmpu21e8800c9d5ikql6hswkg	cmpu216nx003gd5ug6jpvmysq	1	120.00	8	1660.00	2026-05-31 17:29:38.12
cmpu21e8800cdd5ikxk798phy	cmpu21e8800c9d5ikql6hswkg	cmpu216ms001ad5ugemfo87rh	1	35.00	8	460.00	2026-05-31 17:29:38.12
cmpu21e8900chd5ik6yg6adce	cmpu21e8900cfd5ikjg0ir84w	cmpu216ns0038d5ugivrykrme	2	24.00	3	384.00	2026-05-31 17:29:38.122
cmpu21e8b00cld5ikbmxnlird	cmpu21e8b00cjd5ikmzzqksi2	cmpu216nu003cd5ugz8tfmbiy	1	12.00	4	108.00	2026-05-31 17:29:38.123
cmpu21e8b00cmd5ikb8bnv5wn	cmpu21e8b00cjd5ikmzzqksi2	cmpu216mr0018d5ugf6vg3q9u	1	50.00	4	430.00	2026-05-31 17:29:38.123
cmpu21e8c00cqd5ikufmv4z5r	cmpu21e8c00cod5ikky4imeeo	cmpu216mb0010d5ugzabpsrkm	2	45.00	4	800.00	2026-05-31 17:29:38.125
cmpu21e8c00crd5ik9r242may	cmpu21e8c00cod5ikky4imeeo	cmpu216mt001cd5ug9xa7nqhf	2	30.00	4	540.00	2026-05-31 17:29:38.125
cmpu21e8c00csd5ik4zimelzt	cmpu21e8c00cod5ikky4imeeo	cmpu216mz001od5ug0u5b0jol	2	46.00	4	798.00	2026-05-31 17:29:38.125
cmpu21e8e00cwd5ik59ytk4t0	cmpu21e8e00cud5ikk1ndee4b	cmpu216mp0014d5ugu0lz927j	2	48.00	6	1056.00	2026-05-31 17:29:38.126
cmpu21e8g00d0d5ikea0k4tji	cmpu21e8g00cyd5ikag7ofjmw	cmpu216ms001ad5ugemfo87rh	1	35.00	7	425.00	2026-05-31 17:29:38.128
cmpu21e8g00d1d5ik9tva8toy	cmpu21e8g00cyd5ikag7ofjmw	cmpu216my001md5ugh8znvup9	1	44.00	7	528.00	2026-05-31 17:29:38.128
cmpu21e8h00d5d5ikm954lv34	cmpu21e8h00d3d5ikcyl886r4	cmpu216mu001ed5ug5aodaewy	2	32.00	2	448.00	2026-05-31 17:29:38.129
cmpu21e8h00d6d5ik59cv1alg	cmpu21e8h00d3d5ikcyl886r4	cmpu216n2001sd5ugmcaje11z	2	58.00	2	772.00	2026-05-31 17:29:38.129
cmpu21e8h00d7d5ik9vqmj5c6	cmpu21e8h00d3d5ikcyl886r4	cmpu216n90024d5ugqss61ynu	2	28.00	2	392.00	2026-05-31 17:29:38.129
cmpu21e8i00dbd5ikyzu6wyeo	cmpu21e8i00d9d5ikvn634270	cmpu216mx001kd5ug4h49hfpn	2	55.00	3	850.00	2026-05-31 17:29:38.131
cmpu21e8k00dfd5ikw1iapj4h	cmpu21e8k00ddd5iksxysb163	cmpu216mz001od5ug0u5b0jol	1	46.00	5	445.00	2026-05-31 17:29:38.133
cmpu21e8k00dgd5ikpl3a7ba6	cmpu21e8k00ddd5iksxysb163	cmpu216n80022d5ug8rmjz67e	1	82.00	5	830.00	2026-05-31 17:29:38.133
cmpu21e8m00dkd5ik3q82iu3r	cmpu21e8m00did5ik9tk7ym6a	cmpu216n4001ud5ugmt8r8aee	2	70.00	6	1560.00	2026-05-31 17:29:38.134
cmpu21e8m00dld5ikecpjdg86	cmpu21e8m00did5ik9tk7ym6a	cmpu216na0026d5uggtjk00n5	2	36.00	6	782.00	2026-05-31 17:29:38.134
cmpu21e8m00dmd5iky06doycs	cmpu21e8m00did5ik9tk7ym6a	cmpu216ng002id5ug3p3xiw19	1	88.00	6	988.00	2026-05-31 17:29:38.134
cmpu21e8n00dqd5ik8uovqo7e	cmpu21e8n00dod5ikhk74kkqu	cmpu216n6001yd5ugu0fr6hvo	2	68.00	6	1496.00	2026-05-31 17:29:38.136
cmpu21e8o00dud5ikh6wyxldc	cmpu21e8o00dsd5ikk3ofmobr	cmpu216n90024d5ugqss61ynu	2	28.00	2	392.00	2026-05-31 17:29:38.137
cmpu21e8o00dvd5ik1qlgtwij	cmpu21e8o00dsd5ikk3ofmobr	cmpu216nf002gd5ugzceozmj9	2	82.00	2	1208.00	2026-05-31 17:29:38.137
cmpu21e8q00dzd5ikwsky5cv0	cmpu21e8q00dxd5ik98sn5er3	cmpu216nb0028d5ugquezq4xy	1	30.00	8	390.00	2026-05-31 17:29:38.138
cmpu21e8q00e0d5ikvje2njui	cmpu21e8q00dxd5ik98sn5er3	cmpu216ni002od5ugcfr8ytc8	1	40.00	8	510.00	2026-05-31 17:29:38.138
cmpu21e8q00e1d5ik4phtqdsv	cmpu21e8q00dxd5ik98sn5er3	cmpu216np0030d5ugfq63q4af	1	62.00	8	796.00	2026-05-31 17:29:38.138
cmpu21e8r00e5d5ikbb2ieh9j	cmpu21e8r00e3d5ikwic9c0i7	cmpu216ne002ed5ug1748imv1	1	95.00	5	975.00	2026-05-31 17:29:38.14
cmpu21e8t00e9d5iki0h1ph4h	cmpu21e8t00e7d5ikggjswv8j	cmpu216ng002id5ug3p3xiw19	1	88.00	6	988.00	2026-05-31 17:29:38.141
cmpu21e8t00ead5ikwu5ad6km	cmpu21e8t00e7d5ikggjswv8j	cmpu216no002yd5ugw5q3lswn	2	58.00	6	1256.00	2026-05-31 17:29:38.141
cmpu21e8u00eed5ikiyl876yv	cmpu21e8u00ecd5ik61b2oejv	cmpu216nj002qd5ug3rjdm07r	2	34.00	6	738.00	2026-05-31 17:29:38.142
cmpu21e8u00efd5ikq3gmj09m	cmpu21e8u00ecd5ik61b2oejv	cmpu216nq0032d5ugzw6k0y5s	2	37.00	6	784.00	2026-05-31 17:29:38.142
cmpu21e8u00egd5ikj8a7co2s	cmpu21e8u00ecd5ik61b2oejv	cmpu216mb0010d5ugzabpsrkm	2	45.00	6	980.00	2026-05-31 17:29:38.142
cmpu21e8w00ekd5ikwl6raovd	cmpu21e8v00eid5ikweuigckn	cmpu216nn002wd5ugx53nijsp	2	45.00	2	590.00	2026-05-31 17:29:38.144
cmpu21e8x00eod5ikh6xzk2vb	cmpu21e8x00emd5iklmzvoh21	cmpu216np0030d5ugfq63q4af	1	62.00	4	548.00	2026-05-31 17:29:38.145
cmpu21e8x00epd5iktirr0c2s	cmpu21e8x00emd5iklmzvoh21	cmpu216mb0010d5ugzabpsrkm	1	45.00	4	400.00	2026-05-31 17:29:38.145
cmpu21e8y00etd5ik2oqbq5zm	cmpu21e8y00erd5ikm4ngds3c	cmpu216ns0038d5ugivrykrme	1	24.00	8	312.00	2026-05-31 17:29:38.146
cmpu21e8y00eud5ikmovo6xg2	cmpu21e8y00erd5ikm4ngds3c	cmpu216mo0012d5ugujtqybh2	1	42.00	8	546.00	2026-05-31 17:29:38.146
cmpu21e8y00evd5ik2xyelc3r	cmpu21e8y00erd5ikm4ngds3c	cmpu216mu001ed5ug5aodaewy	1	32.00	8	416.00	2026-05-31 17:29:38.146
cmpu21e8z00ezd5ik04dgu0h9	cmpu21e8z00exd5ik6fyo3s2l	cmpu216nu003cd5ugz8tfmbiy	2	12.00	5	240.00	2026-05-31 17:29:38.148
cmpu21e9100f3d5iki90010z5	cmpu21e9100f1d5ikuh9f3w4q	cmpu216mb0010d5ugzabpsrkm	2	45.00	7	1070.00	2026-05-31 17:29:38.149
cmpu21e9100f4d5iknw7msxsy	cmpu21e9100f1d5ikuh9f3w4q	cmpu216mt001cd5ug9xa7nqhf	2	30.00	7	720.00	2026-05-31 17:29:38.149
\.


--
-- Data for Name: Report; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Report" (id, "userId", "rentalOrderId", type, format, title, "fileUrl", "createdAt") FROM stdin;
cmptv777p000id59s0aakb6uj	cmptv771z0006d59sp0bse6xq	cmptv773w000ad59slbs0vix7	ORDER_DOCUMENT	PDF	Документ по заявке BR-20260531-8630	/uploads/reports/order-br-20260531-8630-9581bcd9.pdf	2026-05-31 14:18:11.653
cmptv779d000kd59szfoibk7n	cmptv771z0006d59sp0bse6xq	cmptv773w000ad59slbs0vix7	ORDER_DOCUMENT	DOCX	Документ по заявке BR-20260531-8630	/uploads/reports/order-br-20260531-8630-0ba12f16.docx	2026-05-31 14:18:11.713
cmptv77c6000md59syi2t6ctm	cmptsbj0u0003d500lnh8bwp8	cmptv7746000ed59siycsehzu	ORDER_DOCUMENT	PDF	Документ по заявке BR-20260531-4234	/uploads/reports/order-br-20260531-4234-a8b7151e.pdf	2026-05-31 14:18:11.815
cmptv77eb000od59sbnexn0uq	cmptv771z0006d59sp0bse6xq	\N	RENTAL_HISTORY	PDF	История аренд Reports Client One	/uploads/reports/rental-history-20260501-20260630-2252d1d7.pdf	2026-05-31 14:18:11.891
cmptv77ex000qd59sr92pxttr	cmptv771z0006d59sp0bse6xq	\N	RENTAL_HISTORY	DOCX	История аренд Reports Client One	/uploads/reports/rental-history-20260501-20260630-7db1e47f.docx	2026-05-31 14:18:11.914
cmptv77ln000ud59sgy6022xn	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	DOCX	Админский отчет по арендам	/uploads/reports/admin-rental-statistics-20260501-20260630-b6bbb1f7.docx	2026-05-31 14:18:12.156
cmpu21e9r00hnd5ikhhk1ti16	cmpu2165a0003d5ugp81cvo3c	cmpu21e7700acd5ik0jdgjcmv	ORDER_DOCUMENT	PDF	Seed: Order document BR-SEED-0001	\N	2026-05-31 17:29:38.176
cmpu21e9r00hod5ikv94zgfri	cmpu2166y0005d5ugb4frzf2f	cmpu21e7p00agd5ikadllaz2e	ORDER_DOCUMENT	DOCX	Seed: Order document BR-SEED-0002	\N	2026-05-31 17:29:38.176
cmpu21e9r00hpd5ikk52ats9n	cmpu2168h0007d5ugnf2jgise	cmpu21e7r00ald5ik4u3k3uaf	ORDER_DOCUMENT	PDF	Seed: Order document BR-SEED-0003	\N	2026-05-31 17:29:38.176
cmpu21e9r00hqd5ikmk5r5m71	cmpu2169y0009d5ugfhga2ez2	cmpu21e7t00ard5ikof10sw2f	ORDER_DOCUMENT	DOCX	Seed: Order document BR-SEED-0004	\N	2026-05-31 17:29:38.176
cmpu21e9r00hrd5iku714wwd9	cmpu2165a0003d5ugp81cvo3c	\N	RENTAL_HISTORY	PDF	Seed: Rental history Ivan Petrov	\N	2026-05-31 17:29:38.176
cmpu21e9r00hsd5ikufi8kgiw	cmpu2166y0005d5ugb4frzf2f	\N	RENTAL_HISTORY	DOCX	Seed: Rental history Pavel Sidorov	\N	2026-05-31 17:29:38.176
cmpu21e9r00htd5ik4tadz9yu	cmpu2168h0007d5ugnf2jgise	\N	RENTAL_HISTORY	PDF	Seed: Rental history Andrei Kozlov	\N	2026-05-31 17:29:38.176
cmpu21e9r00hud5ikeu8v5h4d	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	PDF	Seed: Admin rental statistics Q2	\N	2026-05-31 17:29:38.176
cmpu21e9r00hvd5ikr0ajryvu	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	DOCX	Seed: Admin rental statistics detailed export	\N	2026-05-31 17:29:38.176
cmpu21e9r00hwd5ikke1end7v	cmptsbj0u0003d500lnh8bwp8	\N	EQUIPMENT_UTILIZATION	PDF	Seed: Equipment utilization snapshot	\N	2026-05-31 17:29:38.176
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Review" (id, "userId", "equipmentId", rating, text, "isPublished", "createdAt", "updatedAt") FROM stdin;
cmptuda7p000gd5dsktutxjxp	cmptuda39000ad5ds3iwo16c5	cmptuda150002d5dsc5jsok49	5	???????????? ???? ? ??????? ?????????, ?????????? ?????? ?????? ?????? ? ???????.	f	2026-05-31 13:54:55.862	2026-05-31 13:54:55.906
cmptugnnu000pd5dsollq0j4c	cmptugnnk000nd5dstl88y4vj	cmptugnlw000jd5ds09u204t6	5	??? ???????? ????? ??? ???????? ????????? ?????? ? ????????? ???????.	f	2026-05-31 13:57:33.259	2026-05-31 13:57:33.268
cmptuh7ar000yd5ds7mu173ng	cmptuh7al000wd5dsj18tpce5	cmptuh78y000sd5ds3vgs7bec	4	??? ????????? ????? ??? ???????? ???????? ? ????????? ? ?????? ????????????.	f	2026-05-31 13:57:58.707	2026-05-31 13:57:58.721
cmpu21e9a00fzd5ikxq28i2jq	cmpu2165a0003d5ugp81cvo3c	cmpu216mb0010d5ugzabpsrkm	3	The equipment arrived clean, started quickly, and worked through the whole shift without issues.	f	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g0d5ikhlrjswpl	cmpu2166y0005d5ugb4frzf2f	cmpu216mr0018d5ugf6vg3q9u	4	Good condition overall. Delivery was on time and the machine handled our concrete work well.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g1d5ikyvllxerk	cmpu2168h0007d5ugnf2jgise	cmpu216mv001gd5ugfa8f7hth	5	Reliable rental for a short project. Controls were easy to understand for the crew.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g2d5ikl3p64ao1	cmpu2169y0009d5ugfhga2ez2	cmpu216n0001qd5ugicavws33	3	Helped us finish the site work faster than expected. Would rent this model again.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g3d5iki2avzvy0	cmpu216bg000bd5ugd2qb3qvf	cmpu216n6001yd5ugu0fr6hvo	4	Solid choice for routine construction tasks. Support team answered setup questions quickly.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g4d5ika500qpwl	cmpu216cy000dd5uglc96kk2d	cmpu216na0026d5uggtjk00n5	5	Tool condition matched the description and the battery or fuel usage was reasonable on site.	f	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g5d5ikqdzgmyq8	cmpu216ee000fd5ug53k7bbtd	cmpu216nf002gd5ugzceozmj9	3	Very practical unit for our schedule. Pickup and return process was straightforward.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g6d5ikq751ypr1	cmpu216fw000hd5ug1jlu1bgl	cmpu216nj002qd5ug3rjdm07r	4	Performance was stable even during longer use. No surprises during the rental window.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g7d5ikdzm2q6v1	cmpu216hd000jd5ugc1fzmsz3	cmpu216no002yd5ugw5q3lswn	5	The equipment arrived clean, started quickly, and worked through the whole shift without issues.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g8d5ik8qljyo9o	cmpu216iv000ld5ug1eear6f0	cmpu216nt003ad5ugcgyrtsjo	3	Good condition overall. Delivery was on time and the machine handled our concrete work well.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00g9d5iklaq7b7qg	cmpu216kd000nd5ugzsuleofa	cmpu216mb0010d5ugzabpsrkm	4	Reliable rental for a short project. Controls were easy to understand for the crew.	f	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9a00gad5ikxsoszo5r	cmpu216lu000pd5ugwgq7vwpc	cmpu216mr0018d5ugf6vg3q9u	5	Helped us finish the site work faster than expected. Would rent this model again.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gbd5iky00drih5	cmpu2165a0003d5ugp81cvo3c	cmpu216mw001id5ughgbdbbke	3	Solid choice for routine construction tasks. Support team answered setup questions quickly.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gcd5ik5g1qksgb	cmpu2166y0005d5ugb4frzf2f	cmpu216n0001qd5ugicavws33	4	Tool condition matched the description and the battery or fuel usage was reasonable on site.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gdd5ikhcqt2jbr	cmpu2168h0007d5ugnf2jgise	cmpu216n6001yd5ugu0fr6hvo	5	Very practical unit for our schedule. Pickup and return process was straightforward.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00ged5iko48hmmob	cmpu2169y0009d5ugfhga2ez2	cmpu216nb0028d5ugquezq4xy	3	Performance was stable even during longer use. No surprises during the rental window.	f	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gfd5ikf1dl0kxx	cmpu216bg000bd5ugd2qb3qvf	cmpu216nf002gd5ugzceozmj9	4	The equipment arrived clean, started quickly, and worked through the whole shift without issues.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00ggd5ikzs9biixb	cmpu216cy000dd5uglc96kk2d	cmpu216nj002qd5ug3rjdm07r	5	Good condition overall. Delivery was on time and the machine handled our concrete work well.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00ghd5ikgrygb2ey	cmpu216ee000fd5ug53k7bbtd	cmpu216np0030d5ugfq63q4af	3	Reliable rental for a short project. Controls were easy to understand for the crew.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gid5iknz8aluk9	cmpu216fw000hd5ug1jlu1bgl	cmpu216nt003ad5ugcgyrtsjo	4	Helped us finish the site work faster than expected. Would rent this model again.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gjd5ikfs98ohzh	cmpu216hd000jd5ugc1fzmsz3	cmpu216mb0010d5ugzabpsrkm	5	Solid choice for routine construction tasks. Support team answered setup questions quickly.	f	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gkd5ikx816hpkn	cmpu216iv000ld5ug1eear6f0	cmpu216ms001ad5ugemfo87rh	3	Tool condition matched the description and the battery or fuel usage was reasonable on site.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gld5ikifqd7thd	cmpu216kd000nd5ugzsuleofa	cmpu216mw001id5ughgbdbbke	4	Very practical unit for our schedule. Pickup and return process was straightforward.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gmd5ikpele6iqw	cmpu216lu000pd5ugwgq7vwpc	cmpu216n0001qd5ugicavws33	5	Performance was stable even during longer use. No surprises during the rental window.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gnd5ik8td12azw	cmpu2165a0003d5ugp81cvo3c	cmpu216n70020d5ugl2fz23t1	3	The equipment arrived clean, started quickly, and worked through the whole shift without issues.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00god5ikzyrj094v	cmpu2166y0005d5ugb4frzf2f	cmpu216nb0028d5ugquezq4xy	4	Good condition overall. Delivery was on time and the machine handled our concrete work well.	f	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gpd5iko45g6yux	cmpu2168h0007d5ugnf2jgise	cmpu216nf002gd5ugzceozmj9	5	Reliable rental for a short project. Controls were easy to understand for the crew.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gqd5ik4qo7z2vu	cmpu2169y0009d5ugfhga2ez2	cmpu216nl002sd5uga8ohegg9	3	Helped us finish the site work faster than expected. Would rent this model again.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00grd5ikr2weqxiu	cmpu216bg000bd5ugd2qb3qvf	cmpu216np0030d5ugfq63q4af	4	Solid choice for routine construction tasks. Support team answered setup questions quickly.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gsd5ikeniuqjbq	cmpu216cy000dd5uglc96kk2d	cmpu216nt003ad5ugcgyrtsjo	5	Tool condition matched the description and the battery or fuel usage was reasonable on site.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gtd5ik5529qqnn	cmpu216ee000fd5ug53k7bbtd	cmpu216mo0012d5ugujtqybh2	3	Very practical unit for our schedule. Pickup and return process was straightforward.	f	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gud5ik7gotm2zd	cmpu216fw000hd5ug1jlu1bgl	cmpu216ms001ad5ugemfo87rh	4	Performance was stable even during longer use. No surprises during the rental window.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gvd5ikrezaah1r	cmpu216hd000jd5ugc1fzmsz3	cmpu216mw001id5ughgbdbbke	5	The equipment arrived clean, started quickly, and worked through the whole shift without issues.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gwd5ikxtgt1x6l	cmpu216iv000ld5ug1eear6f0	cmpu216n2001sd5ugmcaje11z	3	Good condition overall. Delivery was on time and the machine handled our concrete work well.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gxd5ikznb1eyx9	cmpu216kd000nd5ugzsuleofa	cmpu216n70020d5ugl2fz23t1	4	Reliable rental for a short project. Controls were easy to understand for the crew.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gyd5ikh3awbm3w	cmpu216lu000pd5ugwgq7vwpc	cmpu216nb0028d5ugquezq4xy	5	Helped us finish the site work faster than expected. Would rent this model again.	f	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00gzd5ikg00vio7d	cmpu2165a0003d5ugp81cvo3c	cmpu216ng002id5ug3p3xiw19	3	Solid choice for routine construction tasks. Support team answered setup questions quickly.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00h0d5ikfvxdgkqm	cmpu2166y0005d5ugb4frzf2f	cmpu216nl002sd5uga8ohegg9	4	Tool condition matched the description and the battery or fuel usage was reasonable on site.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00h1d5ikzx1bjfq9	cmpu2168h0007d5ugnf2jgise	cmpu216np0030d5ugfq63q4af	5	Very practical unit for our schedule. Pickup and return process was straightforward.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
cmpu21e9b00h2d5iknpl0q9dd	cmpu2169y0009d5ugfhga2ez2	cmpu216nu003cd5ugz8tfmbiy	3	Performance was stable even during longer use. No surprises during the rental window.	t	2026-05-31 17:29:38.159	2026-05-31 17:29:38.159
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Role" (id, name, description, "createdAt", "updatedAt") FROM stdin;
cmptsbiyi0000d50016vfokjh	ADMIN	Administrator with full platform access	2026-05-31 12:57:34.651	2026-05-31 17:29:37.289
cmptsbiyx0001d500il354zhy	CLIENT	Client who can browse catalog and place rental orders	2026-05-31 12:57:34.666	2026-05-31 17:29:37.292
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, "fullName", email, phone, "passwordHash", "avatarUrl", "roleId", "isBlocked", "createdAt", "updatedAt") FROM stdin;
cmpu2168h0007d5ugnf2jgise	Andrei Kozlov	andrei.kozlov@buildrent.local	+375291110103	$2b$10$c69GW2sfPI4ZTNU1ZY/2FeFowmL8f38ZD03/0WH7IleXUwlM.TTHa	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.762	2026-05-31 17:29:37.507
cmptscbs50001d5m0vh3j3uku	Test Client	client1780232291@example.com	+375291234567	$2b$10$Fz/gVPTG2S3yTbtPySO9N.u2p3da9XivN7mOTa/g4NNjnrt.zrsNy	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 12:58:12.005	2026-05-31 12:58:12.005
cmptsdmhh0001d5f4kmdizywc	Test Client	client1780232352@example.com	+375291234567	$2b$10$U.QUUg29WaSRZWoP0OQOdOEBshvy.0qdkzYNb5ArsEn/hjdq5EM1e	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 12:59:12.534	2026-05-31 12:59:12.534
cmpu2169y0009d5ugfhga2ez2	Maksim Morozov	maksim.morozov@buildrent.local	+375291110104	$2b$10$HNBFVC77uxiGrrgE6jArT.SAeUlU69NBL9padw6O.FX/QDvxK6BYO	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.815	2026-05-31 17:29:37.558
cmpu216bg000bd5ugd2qb3qvf	Sergei Volkov	sergei.volkov@buildrent.local	+375291110105	$2b$10$8Qn.Y2Xq1mtkESM4JLvpxuAmo96XXP4ZW0U5zwS59wRrKo.6TbGau	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.869	2026-05-31 17:29:37.611
cmpu216cy000dd5uglc96kk2d	Nikita Fedorov	nikita.fedorov@buildrent.local	+375291110106	$2b$10$qIHEI2oSrboC4p1JBmBD9e/t7htSmYBFZUWreApUcwZaAZqXi0cIy	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.922	2026-05-31 17:29:37.662
cmptsu94j0001d56ohpnw1qrk	Catalog Client	catalog-client1780233128@example.com	+375291111111	$2b$10$FA0P3Z5baHXvRdTuayHv9.DnduT/ejJ6lHJtA9zexdYb0Axz8t8YS	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 13:12:08.371	2026-05-31 13:12:08.371
cmpu216ee000fd5ug53k7bbtd	Kirill Smirnov	kirill.smirnov@buildrent.local	+375291110107	$2b$10$1GOsl2O2HXeNp4q5PudLfeO/fFXkga76yX1EcLTn9RPFP2lAuyH/6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.974	2026-05-31 17:29:37.715
cmptttgf70006d5ccndvblknq	Rental Client One	client1+1780234770@example.com	+375291111111	$2b$10$HIGGSeZl.QumcixfaRtWluJueQ5Ssyd5kBq0RSshhXw9rsaCPRjuS	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 13:39:30.787	2026-05-31 13:39:30.787
cmptttggr0008d5ccilfbimef	Rental Client Two	client2+1780234770@example.com	+375292222222	$2b$10$f1v/zy0IuyGdi3VEXrtkquxeMw8wdbZKowQR.6qfoANFJdfLWdG1e	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 13:39:30.843	2026-05-31 13:39:30.843
cmptuda39000ad5ds3iwo16c5	Favorites Reviews Client One	favrev1+1780235695@example.com	+375293333333	$2b$10$3RvY3iFWk5VY0xAH/cnuEuwrD09nnziM93cgFHiO/78IM85ml9Ro6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 13:54:55.702	2026-05-31 13:54:55.702
cmptuda4t000cd5ds3k69vj2k	Favorites Reviews Client Two	favrev2+1780235695@example.com	+375294444444	$2b$10$Yke6ngKcJYlCPv8rWLm47ewDYVlCCRinIr1zqkYkNbbqvtgt46/Zq	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 13:54:55.758	2026-05-31 13:54:55.758
cmptugnnk000nd5dstl88y4vj	Public Reviews User	publicreviews+1780235853@example.com	+375299999999	$2b$10$pcEiSSvk3c6R3rapYwF1yO/RIxFvRQ5fX5QeZUiUx3Sty.AGCMP8C	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 13:57:33.249	2026-05-31 13:57:33.249
cmptuh7al000wd5dsj18tpce5	Catalog Reviews User	catalogreviews+1780235878@example.com	+375291010101	$2b$10$X2iWG9Z2ftjBIe0IE9dGWOt9VBDfj1H3N1wbeaa/3aXeEJveC9dmO	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 13:57:58.702	2026-05-31 13:57:58.702
cmptv771z0006d59sp0bse6xq	Reports Client One	reports1+1780237091@example.com	+375291111222	$2b$10$3JFZ2Ly8qqNaQOBygQdJFenVeMWCSkZSfjFk3Q69UqZtC55sgf4zy	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 14:18:11.447	2026-05-31 14:18:11.447
cmptv773k0008d59s18fz2lv7	Reports Client Two	reports2+1780237091@example.com	+375291111333	$2b$10$mQpi.DQnyAh9ns6soiuCjeCnMTDOY1MQS/YiaQkAzGSS2NoG.D6.q	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 14:18:11.504	2026-05-31 14:18:11.504
cmpu216fw000hd5ug1jlu1bgl	Artem Vasilev	artem.vasilev@buildrent.local	+375291110108	$2b$10$sjfw8TevYeZY/x2otUc5iugUmeutkYFKaSrQUjqat/mqrmWI6CaaK	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.028	2026-05-31 17:29:37.768
cmptsbj0u0003d500lnh8bwp8	BuildRent Admin	admin@buildrent.local	\N	$2b$10$6wKByAGLRGaF8.GjBjZK5e8VcLYPLHG303nb4d0N3fj0cdc9ANVqK	\N	cmptsbiyi0000d50016vfokjh	f	2026-05-31 12:57:34.734	2026-05-31 17:29:37.347
cmpu2165a0003d5ugp81cvo3c	Ivan Petrov	ivan.petrov@buildrent.local	+375291110101	$2b$10$7meyZDDAYB5Aqtb1Lrh/gOVVHBlsL5Wp1bHAjYdtY2eg5IA.2sNQa	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.647	2026-05-31 17:29:37.401
cmpu2166y0005d5ugb4frzf2f	Pavel Sidorov	pavel.sidorov@buildrent.local	+375291110102	$2b$10$xRZwOYjOLPBoyEqTC1XXPuHdAsWIfak49DXOZz.xOFpYaYn6V79LG	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.706	2026-05-31 17:29:37.453
cmpu216hd000jd5ugc1fzmsz3	Roman Egorov	roman.egorov@buildrent.local	+375291110109	$2b$10$R3X6zMI7sq9Ncx.8lEjYO.YHzJoTW/iB02buxGLaIEkhwoxzTAp9a	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.081	2026-05-31 17:29:37.819
cmpu216iv000ld5ug1eear6f0	Denis Zaitsev	denis.zaitsev@buildrent.local	+375291110110	$2b$10$kxFKnDufD9oiaaUibvDTmeRBK6ZpLS4fX3Fog6malbmlOlXrqSRSq	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.135	2026-05-31 17:29:37.871
cmpu216kd000nd5ugzsuleofa	Alexey Orlov	alexey.orlov@buildrent.local	+375291110111	$2b$10$lf/TveqLbG8AbnysIloV8ekF47Z5M1UtThjIyBSNr1roiRPeBzQlS	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.189	2026-05-31 17:29:37.923
cmpu216lu000pd5ugwgq7vwpc	Mikhail Nikitin	mikhail.nikitin@buildrent.local	+375291110112	$2b$10$4fC2sBOdFinIYnUo3dPBFOHz9A/3.egoZV6PrGgHjFI4quTfe2Oz6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.242	2026-05-31 17:29:37.974
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

\unrestrict gKL5GeYmWEqeoTiO4v0hEJAK8eH6gFVGreOSkVr7r5Syf68FLynK9vxieP6L86s

