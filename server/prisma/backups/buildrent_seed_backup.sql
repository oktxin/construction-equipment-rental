--
-- PostgreSQL database dump
--

\restrict nRhf7fKSkTfrAHLhmiDXkCTiwnTPkSXFfbcNRcFvlYPiNKR2YgMueqTdYypREhk

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
cmpu216lv000qd5ug2gknqrpl	Отбойные молотки	demolition-hammers	Тяжёлый ударный инструмент для бетона, кирпича и демонтажных работ.	hammer	2026-05-31 17:29:28.243	2026-06-04 14:06:20.797
cmpu216ly000rd5ugoikci2z9	Бетономешалки	concrete-mixers	Мобильные и площадочные бетономешалки для отделки, кладки и монолитных задач.	drum	2026-05-31 17:29:28.246	2026-06-04 14:06:20.798
cmpu216lz000sd5uggdgeivpe	Виброплиты	plate-compactors	Оборудование для уплотнения оснований, обратной засыпки и благоустройства.	layers	2026-05-31 17:29:28.247	2026-06-04 14:06:20.798
cmpu216lz000td5ugoif653lw	Генераторы	generators	Источники питания для площадок без постоянного электричества и резервных сценариев.	zap	2026-05-31 17:29:28.248	2026-06-04 14:06:20.8
cmpu216m0000ud5ugsxqx7qjc	Компрессоры	compressors	Воздушное оборудование для пневмоинструмента, покраски и сервисных работ.	wind	2026-05-31 17:29:28.248	2026-06-04 14:06:20.8
cmpu216m1000vd5ugsj97c7bk	Вышки и леса	scaffolding-towers	Безопасные системы доступа для фасадных, отделочных и внутренних работ.	building-2	2026-05-31 17:29:28.249	2026-06-04 14:06:20.801
cmpu216m1000wd5ugbjiikzj5	Сварочное оборудование	welding-equipment	Инверторы и комплектующие для металлоконструкций, ремонта и монтажа.	wrench	2026-05-31 17:29:28.25	2026-06-04 14:06:20.803
cmpu216m2000xd5ugd6z7247i	Пилы и резчики	saws-cutters	Инструменты для резки металла, камня, железобетона и асфальта.	disc-3	2026-05-31 17:29:28.25	2026-06-04 14:06:20.803
cmpu216m2000yd5ugjmxha24a	Измерительный инструмент	measuring-tools	Точная техника для разметки, нивелирования и контроля качества на объекте.	ruler	2026-05-31 17:29:28.251	2026-06-04 14:06:20.804
\.


--
-- Data for Name: Equipment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Equipment" (id, "categoryId", name, slug, "shortDescription", description, brand, model, "dailyPrice", "depositAmount", "quantityTotal", "quantityAvailable", power, weight, status, "isFeatured", "createdAt", "updatedAt") FROM stdin;
cmpu216mo0012d5ugujtqybh2	cmpu216lv000qd5ug2gknqrpl	Makita HM1214C Demolition Hammer	makita-hm1214c	Компактный демонтажный молоток для штробления стен и снятия плитки.	Сбалансированный молоток для ежедневных отделочных бригад, которым необходима надежная сила удара без необходимости транспортировки больших размеров.	Makita	HM1214C	42.00	210.00	4	3	1.50	12.30	AVAILABLE	f	2026-05-31 17:29:28.272	2026-06-04 14:06:20.813
cmpu216mt001cd5ug9xa7nqhf	cmpu216ly000rd5ugoikci2z9	Zitrek B1510 FK Mixer	zitrek-b1510-fk	Полевой миксер для бригад по внутренней отделке и ландшафтному дизайну.	Практичный электрический миксер для подготовки площадки, закладки небольшого фундамента и отделочных работ по бетону.	Zitrek	B1510 FK	30.00	150.00	5	5	0.70	58.00	AVAILABLE	f	2026-05-31 17:29:28.278	2026-06-04 14:06:20.821
cmpu216mx001kd5ug4h49hfpn	cmpu216lz000sd5uggdgeivpe	Wacker Neuson VP1550AW	wacker-neuson-vp1550aw	Профессиональный виброплита для подготовки основания тротуарной плитки и ремонта ямочного покрытия.	Надежный уплотнитель для тротуаров, засыпки траншей и плотного гранулированного основания на городских строительных площадках.	Wacker Neuson	VP1550AW	55.00	260.00	4	4	3.60	90.00	AVAILABLE	t	2026-05-31 17:29:28.282	2026-06-04 14:06:20.825
cmpu216my001md5ugh8znvup9	cmpu216lz000sd5uggdgeivpe	Huter VP-90 Plate Compactor	huter-vp-90	Универсальный уплотнитель для дорожек, бордюров и подъездных дорожек.	Компактное устройство для бригад, которым необходимо быстрое перемещение между ландшафтными работами и небольшими строительными задачами.	Huter	VP-90	44.00	220.00	5	3	4.80	88.00	AVAILABLE	f	2026-05-31 17:29:28.283	2026-06-04 14:06:20.826
cmpu216mp0014d5ugu0lz927j	cmpu216lv000qd5ug2gknqrpl	DeWalt D25902K Breaker	dewalt-d25902k	Тяжелый отбойный молоток для снятия плит и разборки кирпича.	Мощный отбойный молоток для бригад по сносу, работающих на армированных плитах, каналах и стенах из плотной кладки.	DeWalt	D25902K	48.00	240.00	4	3	1.55	10.50	AVAILABLE	f	2026-05-31 17:29:28.273	2026-06-04 14:06:20.814
cmpu216mq0016d5ugpx6o8yxs	cmpu216lv000qd5ug2gknqrpl	Hilti TE 1000-AVR Demolition Hammer	hilti-te-1000-avr	Премиум-прерыватель, зарезервированный для задач и обслуживания сайта с высокой нагрузкой.	Высокопроизводительный гидромолот Hilti, поддерживающий цикл обслуживания для выполнения интенсивных задач по сносу и подготовке анкеров.	Hilti	TE 1000-AVR	60.00	320.00	3	0	1.75	12.50	MAINTENANCE	f	2026-05-31 17:29:28.275	2026-06-04 14:06:20.817
cmpu216mr0018d5ugf6vg3q9u	cmpu216lv000qd5ug2gknqrpl	Milwaukee Kango 950 S	milwaukee-kango-950-s	Прочный инструмент для разрушения каналов, бетонных кромок и проемов.	Готовый к эксплуатации выключатель часто используется для компенсаторов, кабельных каналов и реконструкции технических помещений.	Milwaukee	Kango 950 S	50.00	230.00	3	2	1.70	11.80	AVAILABLE	f	2026-05-31 17:29:28.276	2026-06-04 14:06:20.818
cmpu216mz001od5ug0u5b0jol	cmpu216lz000sd5uggdgeivpe	Champion PC9045FH	champion-pc9045fh	Уплотнитель площадки для укладки брусчатки и засыпки траншей.	Стабильный уплотнитель со складной ручкой для транспортировки, подходящий для ландшафтных бригад и подрядчиков по укладке дорожного покрытия.	Champion	PC9045FH	46.00	215.00	4	3	4.10	92.00	AVAILABLE	f	2026-05-31 17:29:28.284	2026-06-04 14:06:20.827
cmpu216ms001ad5ugemfo87rh	cmpu216ly000rd5ugoikci2z9	Altrad Belle Minimix 150	altrad-belle-minimix-150	Компактный миксер для работ по укладке плитки, ограждений и мелкого ремонта плит.	Один из самых практичных портативных миксеров для выездных отделочных бригад и ремонтных работ с коротким циклом.	Altrad Belle	Minimix 150	35.00	180.00	4	1	0.55	61.00	AVAILABLE	t	2026-05-31 17:29:28.277	2026-06-04 14:06:20.819
cmpu216mu001ed5ug5aodaewy	cmpu216ly000rd5ugoikci2z9	Sturm CM20160 Concrete Mixer	sturm-cm20160	Смеситель среднего размера для заливки кладки и наружных работ.	Идеально подходит для строителей, которым необходима стабильная производительность при изготовлении столбов забора, тротуарной плитки и расширений плит.	Sturm	CM20160	32.00	160.00	4	3	0.80	65.00	AVAILABLE	f	2026-05-31 17:29:28.279	2026-06-04 14:06:20.822
cmpu216mv001gd5ugfa8f7hth	cmpu216ly000rd5ugoikci2z9	RedVerg RD-CM180	redverg-rd-cm180	Миксер на данный момент зарезервирован из публичной аренды в связи с диагностикой двигателя.	Высокопроизводительный миксер ожидает диагностики после предупреждения о перегреве двигателя во время длительной заливки в жилом помещении.	RedVerg	RD-CM180	34.00	170.00	3	0	0.90	72.00	UNAVAILABLE	f	2026-05-31 17:29:28.28	2026-06-04 14:06:20.823
cmpu216mw001id5ughgbdbbke	cmpu216ly000rd5ugoikci2z9	Patriot BM 208C Mixer	patriot-bm-208c	Большой миксер для заливки подъездных дорог и малоэтажных бетонных бригад.	Надежный вариант, когда проект требует более длительных циклов смешивания и больших порций бетона за смену.	Patriot	BM 208C	38.00	190.00	3	2	1.00	79.00	AVAILABLE	f	2026-05-31 17:29:28.281	2026-06-04 14:06:20.824
cmpu216ng002id5ug3p3xiw19	cmpu216m1000vd5ugsj97c7bk	Layher Zifa Compact	layher-zifa-compact	Компактная лестничная башня для внутренней отделки и доступа для обслуживания.	Специализированная компактная башенная система для узких помещений, лестничных клеток и коммерческих отделочных работ.	Layher	Zifa Compact	88.00	460.00	1	0	\N	96.00	AVAILABLE	f	2026-05-31 17:29:28.3	2026-06-04 14:06:20.844
cmpu216ni002od5ugcfr8ytc8	cmpu216m1000wd5ugbjiikzj5	ESAB Rogue ES 200i	esab-rogue-es-200i	Компактный инверторный сварочный аппарат для производственных бригад и ремонтных бригад.	Высокопроизводительный сварочный инвертор для мобильных сварщиков, занимающихся работой с воротами, рамами, арматурой и ремонтом.	ESAB	Rogue ES 200i	40.00	190.00	4	3	7.10	8.40	AVAILABLE	t	2026-05-31 17:29:28.303	2026-06-04 14:06:20.847
cmpu216n80022d5ug8rmjz67e	cmpu216lz000td5ugoif653lw	SDMO Technic 7500 TE	sdmo-technic-7500te	Трехфазный генератор для смешанного парка оборудования и временных объектов.	Надежный вариант для объектов с осветительными башнями, насосами и домиками подрядчиков, работающими от одного источника питания.	SDMO	Technic 7500 TE	82.00	420.00	2	1	6.60	98.00	AVAILABLE	f	2026-05-31 17:29:28.292	2026-06-04 14:06:20.835
cmpu216n5001wd5ugfjewtyji	cmpu216lz000td5ugoif653lw	Fubag BS 6600 AES	fubag-bs-6600-aes	Переносной бензиновый генератор для резервного электроснабжения общестроительных работ.	Проверенный генератор для сварщиков, насосов и общих цепей инструментов на строительных проектах среднего размера.	Fubag	BS 6600 AES	66.00	330.00	4	4	5.50	84.00	AVAILABLE	f	2026-05-31 17:29:28.289	2026-06-04 14:06:20.831
cmpu216n70020d5ugl2fz23t1	cmpu216lz000td5ugoif653lw	Firman SPG6500E2	firman-spg6500e2	Генератор был остановлен для проверки генератора переменного тока после периодических скачков напряжения.	Бензиновый генератор высокой мощности в настоящее время помечен как недоступный, пока проверяются генератор и блок AVR.	Firman	SPG6500E2	64.00	320.00	2	0	5.20	78.00	UNAVAILABLE	f	2026-05-31 17:29:28.291	2026-06-04 14:06:20.834
cmpu216na0026d5uggtjk00n5	cmpu216m0000ud5ugsxqx7qjc	Fubag VCF 100 CM3	fubag-vcf-100-cm3	Компрессор с ременным приводом для пневматических инструментов и небольших покрасочных работ.	Популярный компрессор для кузовных работ, поддержки мастерских и бригад, использующих ударные инструменты и гвозди.	Fubag	VCF 100 CM3	36.00	175.00	4	4	2.20	64.00	AVAILABLE	f	2026-05-31 17:29:28.294	2026-06-04 14:06:20.837
cmpu216nd002cd5ug21i5wbkv	cmpu216m0000ud5ugsxqx7qjc	Metabo Basic 250-24 W OF	metabo-basic-250-24w	Безмасляный компрессор для чистоты рабочих помещений и отделочных бригад.	Компрессор, не требующий особого обслуживания, выбран для внутренних помещений, сервисных фургонов и помещений, где важен чистый воздух.	Metabo	Basic 250-24 W OF	26.00	125.00	4	4	1.50	24.00	AVAILABLE	f	2026-05-31 17:29:28.297	2026-06-04 14:06:20.841
cmpu216nf002gd5ugzceozmj9	cmpu216m1000vd5ugsj97c7bk	Virastar VS Tower 6 m	virastar-vs-tower-6m	Модульная вышка для монтажа, покраски и складского обслуживания.	Легкая алюминиевая башня, подходящая для обслуживающего персонала и отделочных работ средней высоты.	Virastar	VS Tower 6 m	82.00	440.00	2	1	\N	145.00	AVAILABLE	f	2026-05-31 17:29:28.299	2026-06-04 14:06:20.843
cmpu216ni002md5ugaac4trp1	cmpu216m1000vd5ugsj97c7bk	Steel Frame Facade Kit 12 m	steel-frame-facade-kit-12m	Устаревший комплект фасадных лесов хранится в архиве для проверки совместимости.	Архивированный набор шаблонов сохраняется только для исторических записей и сопоставления измерений со старой клиентской документацией.	BuildRent Legacy	Facade Kit 12 m	110.00	600.00	1	0	\N	420.00	ARCHIVED	f	2026-05-31 17:29:28.302	2026-06-04 14:06:20.846
cmpu216nl002sd5uga8ohegg9	cmpu216m1000wd5ugbjiikzj5	FoxWeld Master 202M	foxweld-master-202m	Инвертор общего назначения для изготовления и обслуживания на объекте.	Универсальный сварочный инвертор, используемый для навесов, кронштейнов и быстрого ремонта конструкций на объекте.	FoxWeld	Master 202M	32.00	150.00	4	4	6.30	5.20	AVAILABLE	f	2026-05-31 17:29:28.305	2026-06-04 14:06:20.849
cmpu216n2001sd5ugmcaje11z	cmpu216lz000sd5uggdgeivpe	Zitrek CNP 30-2	zitrek-cnp-30-2	Тяжелый каток для работы на плотных основаниях на дорогах и дворах.	Прочный виброплита для более масштабных задач по уплотнению, когда бригадам требуется более сильный удар и хороший транспортный баланс.	Zitrek	CNP 30-2	58.00	270.00	3	3	4.80	125.00	AVAILABLE	f	2026-05-31 17:29:28.287	2026-06-04 14:06:20.829
cmpu216nv003ed5ugrwn6xnla	cmpu216m2000yd5ugjmxha24a	ADA Cube 360 Home Edition	ada-cube-360-home	Лазерный уровень приостановлен из-за отклонения калибровки.	Компактный лазерный уровень в настоящее время ожидает калибровки после того, как во время проверки качества был обнаружен дрейф.	ADA	Cube 360 Home Edition	10.00	45.00	5	0	\N	0.35	UNAVAILABLE	f	2026-05-31 17:29:28.316	2026-06-04 14:06:20.861
cmpu216n0001qd5ugicavws33	cmpu216lz000sd5uggdgeivpe	Masalta MS60-4 Compactor	masalta-ms60-4	Легкий каток был отправлен на техосмотр в мастерскую после долгого асфальтового сезона.	В настоящее время в продаже имеется компактный виброплита для профилактического осмотра подшипников и систем вибрации.	Masalta	MS60-4	39.00	180.00	2	0	3.10	63.00	MAINTENANCE	f	2026-05-31 17:29:28.285	2026-06-04 14:06:20.828
cmpu216nn002wd5ugx53nijsp	cmpu216m1000wd5ugbjiikzj5	Aurora Stickmate 250	aurora-stickmate-250	Инвертор повышенной мощности для работы с толстым металлом и производственных задач.	Надёжный сварочный аппарат для мастерских и строительных бригад, работающих с тяжёлыми металлическими профилями.	Aurora	Stickmate 250	45.00	205.00	2	1	8.50	7.80	AVAILABLE	f	2026-05-31 17:29:28.307	2026-06-04 14:06:20.851
cmpu216no002yd5ugw5q3lswn	cmpu216m2000xd5ugd6z7247i	Stihl TS 420 Cut-Off Saw	stihl-ts-420	Ручной резак по бетону и металлу для проемов, бордюров и труб.	Высокомобильная отрезная пила для аварийных проемов, выравнивания дорожного покрытия, стальных профилей и коммунальных работ.	Stihl	TS 420	58.00	280.00	4	3	3.20	9.60	AVAILABLE	t	2026-05-31 17:29:28.308	2026-06-04 14:06:20.852
cmpu216nr0034d5ugmb25ejc3	cmpu216m2000xd5ugd6z7247i	Eibenstock EES 1400-3 Wall Chaser	eibenstock-ees-1400-3	Стенорез недоступен, пока заменяются защитные кожухи лезвий.	Специализированный инструмент для чеканки в настоящее время нельзя арендовать до тех пор, пока не будут заменены защитное оборудование и пылезащитные уплотнения.	Eibenstock	EES 1400-3	41.00	190.00	2	0	1.40	4.70	UNAVAILABLE	f	2026-05-31 17:29:28.311	2026-06-04 14:06:20.856
cmpu216ns0036d5ug0xnnwuav	cmpu216m2000xd5ugd6z7247i	Legacy Asphalt Saw 500	legacy-asphalt-saw-500	Архивная дорожная пила сохранена только для ссылки на старый контракт.	Запись об историческом оборудовании сохранена для отчетности и документации более ранних муниципальных проектов.	BuildRent Legacy	Asphalt Saw 500	85.00	430.00	1	0	9.00	115.00	ARCHIVED	f	2026-05-31 17:29:28.312	2026-06-04 14:06:20.857
cmpu216ns0038d5ugivrykrme	cmpu216m2000yd5ugjmxha24a	Bosch GLL 3-80 CG Laser Level	bosch-gll-3-80-cg	Лазер зеленого луча для внутренней планировки и работ с подвесными потолками.	Хорошо видимый лазерный уровень для обрамления перегородок, подвесных потолков, укладки плитки и выравнивания шкафов.	Bosch	GLL 3-80 CG	24.00	120.00	6	5	\N	0.90	AVAILABLE	f	2026-05-31 17:29:28.313	2026-06-04 14:06:20.858
cmpu216nt003ad5ugcgyrtsjo	cmpu216m2000yd5ugjmxha24a	Leica Rugby 620 Rotary Laser	leica-rugby-620	Ротационный лазер для наружного применения для планировки, коммунальных услуг и выравнивания площадок.	Роторный лазер профессионального уровня, используемый для обработки больших участков, фундаментов и выравнивания наружных коммуникаций.	Leica	Rugby 620	48.00	260.00	3	3	\N	2.40	AVAILABLE	f	2026-05-31 17:29:28.314	2026-06-04 14:06:20.859
cmpu216nx003gd5ug6jpvmysq	cmpu216m2000yd5ugjmxha24a	Trimble M3 Total Station	trimble-m3-total-station	Станция геодезического класса для разметки местности, переноса осей и поддержки геодезии.	Прецизионный инструмент для подрядчиков, которым требуется сложная передача геометрии и точный контроль объекта.	Trimble	M3	120.00	700.00	1	0	\N	4.50	AVAILABLE	f	2026-05-31 17:29:28.317	2026-06-04 14:06:20.862
cmpu216np0030d5ugfq63q4af	cmpu216m2000xd5ugd6z7247i	Husqvarna K 770 Cutter	husqvarna-k770	Универсальный дисковый резак для асфальта, бордюрного камня и армирующих работ.	Надежная высокопроизводительная пила, используемая коммунальными службами, бригадами по укладке дорожного покрытия и генеральными подрядчиками при работе с плотными материалами.	Husqvarna	K 770	62.00	300.00	4	1	3.70	10.10	AVAILABLE	f	2026-05-31 17:29:28.309	2026-06-04 14:06:20.853
cmpu216nq0032d5ugzw6k0y5s	cmpu216m2000xd5ugd6z7247i	Makita LC1230 Metal Saw	makita-lc1230	Пила по металлу холодной резки для профилей, швеллеров и изготовления площадок.	Точная пила для резки металла для углов мастерских и мобильных производственных задач, где важна чистота кромок.	Makita	LC1230	37.00	170.00	3	3	1.75	19.30	AVAILABLE	f	2026-05-31 17:29:28.31	2026-06-04 14:06:20.855
cmpu216nu003cd5ugz8tfmbiy	cmpu216m2000yd5ugjmxha24a	Stanley TLM330 Distance Meter	stanley-tlm330	Компактный лазерный измеритель для быстрого измерения помещений, фасадов и проемов.	Удобный портативный дальномер для оценщиков отделки, поддержки обследований и планирования установки.	Stanley	TLM330	12.00	60.00	8	6	\N	0.18	AVAILABLE	f	2026-05-31 17:29:28.315	2026-06-04 14:06:20.86
cmpu216n6001yd5ugu0fr6hvo	cmpu216lz000td5ugoif653lw	Hyundai HHY 7050FE	hyundai-hhy-7050fe	Строительный генератор для резервных цепей, насосов и дозировочного оборудования.	Надежное портативное устройство с прочной рамой для хранения на открытом воздухе и жестких графиков работы подрядчиков.	Hyundai	HHY 7050FE	68.00	340.00	3	2	5.50	81.00	AVAILABLE	f	2026-05-31 17:29:28.29	2026-06-04 14:06:20.832
cmpu216n90024d5ugqss61ynu	cmpu216m0000ud5ugsxqx7qjc	ABAC Montecarlo L20P	abac-montecarlo-l20p	Компактный компрессор для отделочных, крепежных и продувочных работ.	Мобильный компрессор, подходящий для подрядчиков по внутренней отделке, плотников и специалистов по техническому обслуживанию, работающих внутри помещений.	ABAC	Montecarlo L20P	28.00	140.00	5	4	1.50	32.00	AVAILABLE	f	2026-05-31 17:29:28.293	2026-06-04 14:06:20.836
cmpu216nb0028d5ugquezq4xy	cmpu216m0000ud5ugsxqx7qjc	Remeza SB4/C-50.LB30A	remeza-sb4-c-50-lb30a	Компрессор для цеха для бригад пневматического монтажа и обслуживания.	Надежный компрессор белорусского производства, который хорошо подходит для отделочных столярных работ, обслуживания и ежедневного обслуживания инструментов.	Remeza	SB4/C-50.LB30A	30.00	150.00	5	4	1.80	39.00	AVAILABLE	f	2026-05-31 17:29:28.295	2026-06-04 14:06:20.838
cmpu216nj002qd5ug3rjdm07r	cmpu216m1000wd5ugbjiikzj5	Svarog REAL ARC 200 Black	svarog-real-arc-200-black	Полевой инвертор для монтажников, стальных лестниц и опорных конструкций.	Портативный сварочный аппарат, ценимый за стабильную работу дуги при ремонтных работах и ​​изготовлении стали по индивидуальному заказу.	Svarog	REAL ARC 200 Black	34.00	165.00	5	5	6.60	4.70	AVAILABLE	f	2026-05-31 17:29:28.304	2026-06-04 14:06:20.848
cmpzkjdf60026d5aw0hcrt7hd	cmpu216m1000wd5ugbjiikzj5	Resanta SAI-220	resanta-sai-220	Инвертор находится на профилактическом обслуживании после проверки вентилятора и кабеля.	Популярный сварочный аппарат временно выведен из эксплуатации, пока проверяются подшипники вентилятора и выходные кабели.	Resanta	SAI-220	29.00	145.00	3	0	7.20	4.90	MAINTENANCE	f	2026-06-04 14:06:20.85	2026-06-04 14:06:20.85
cmpu216mb0010d5ugzabpsrkm	cmpu216lv000qd5ug2gknqrpl	Bosch GBH 8-45 DV Rotary Hammer	bosch-gbh-8-45dv	Профессиональный молоток SDS-max для сверления анкеров и тяжелого долбления.	Надежный перфоратор для фасадных работ, проемов и сверления железобетона на активных строительных площадках.	Bosch	GBH 8-45 DV	45.00	220.00	5	4	1.50	8.90	AVAILABLE	t	2026-05-31 17:29:28.26	2026-06-04 14:06:20.81
cmpu216n4001ud5ugmt8r8aee	cmpu216lz000td5ugoif653lw	Honda EU30is Inverter Generator	honda-eu30is	Тихий инверторный генератор для офисов и чувствительных электроинструментов.	Малошумящий генератор премиум-класса для отделочных бригад, мобильных офисов и оборудования, требующего стабильного тока.	Honda	EU30is	70.00	360.00	3	2	3.00	59.00	AVAILABLE	t	2026-05-31 17:29:28.288	2026-06-04 14:06:20.83
cmpzkjdev001md5aw9lrt29r7	cmpu216m0000ud5ugsxqx7qjc	Patriot EURO 50/260K	patriot-euro-50-260k	Компрессор в настоящее время недоступен из-за замены блока клапанов.	Воздушный компрессор начального уровня временно снят с проката после плановой замены блока клапанов.	Patriot	EURO 50/260K	24.00	120.00	3	0	1.80	27.00	UNAVAILABLE	f	2026-06-04 14:06:20.839	2026-06-04 14:06:20.839
cmpu216ne002ed5ug1748imv1	cmpu216m1000vd5ugsj97c7bk	Krause Protec XXL 7 m Tower	krause-protec-xxl-7m	Передвижные вышки для ремонта фасада и доступа к инженерным системам под потолком.	Профессиональная алюминиевая вышка с быстроразъемным монтажом для подрядчиков, работающих на фасадах и атриумах.	Krause	Protec XXL 7 m	95.00	500.00	2	1	\N	178.00	AVAILABLE	t	2026-05-31 17:29:28.298	2026-06-04 14:06:20.842
cmpzkjdf0001wd5aw8ig8msks	cmpu216m1000vd5ugsj97c7bk	Euro Scaffold Rolling Tower 75x190	euro-scaffold-rolling-75x190	Комплект строительных лесов башни в настоящее время хранится для внутренней проверки и инвентаризации.	Сдача в аренду комплекта подвижных лесов временно приостановлена ​​до завершения полной инвентаризации и проверки стопорных штифтов.	Euro Scaffold	75x190	76.00	390.00	2	0	\N	128.00	UNAVAILABLE	f	2026-06-04 14:06:20.845	2026-06-04 14:06:20.845
\.


--
-- Data for Name: EquipmentImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentImage" (id, "equipmentId", url, alt, "sortOrder", "createdAt") FROM stdin;
cmpzkjdfm002td5aw9r8uhoju	cmpu216mb0010d5ugzabpsrkm	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%20GBH2-26%20professional%20Rotary%20Hammer%20Drill%20PICT4578.jpg	Фото оборудования Bosch GBH 8-45 DV Rotary Hammer (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm002ud5awzihzrjwk	cmpu216mb0010d5ugzabpsrkm	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%202-26%20DFR.jpg	Фото оборудования Bosch GBH 8-45 DV Rotary Hammer (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm002vd5awqwzngm52	cmpu216mo0012d5ugujtqybh2	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%20GBH2-26%20professional%20Rotary%20Hammer%20Drill%20PICT4578.jpg	Фото оборудования Makita HM1214C Demolition Hammer (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm002wd5awleshb3zq	cmpu216mo0012d5ugujtqybh2	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%202-26%20DFR.jpg	Фото оборудования Makita HM1214C Demolition Hammer (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm002xd5awbm26nten	cmpu216mp0014d5ugu0lz927j	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%20GBH2-26%20professional%20Rotary%20Hammer%20Drill%20PICT4578.jpg	Фото оборудования DeWalt D25902K Breaker (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm002yd5awnr3xjgo8	cmpu216mp0014d5ugu0lz927j	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%202-26%20DFR.jpg	Фото оборудования DeWalt D25902K Breaker (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm002zd5awtgftg7vh	cmpu216mq0016d5ugpx6o8yxs	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%20GBH2-26%20professional%20Rotary%20Hammer%20Drill%20PICT4578.jpg	Фото оборудования Hilti TE 1000-AVR Demolition Hammer (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0030d5aw0aqpkjp9	cmpu216mq0016d5ugpx6o8yxs	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%202-26%20DFR.jpg	Фото оборудования Hilti TE 1000-AVR Demolition Hammer (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0031d5aw3r11ox2i	cmpu216mr0018d5ugf6vg3q9u	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%20GBH2-26%20professional%20Rotary%20Hammer%20Drill%20PICT4578.jpg	Фото оборудования Milwaukee Kango 950 S (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0032d5awb2rcqn5o	cmpu216mr0018d5ugf6vg3q9u	https://commons.wikimedia.org/wiki/Special:FilePath/Bosch%202-26%20DFR.jpg	Фото оборудования Milwaukee Kango 950 S (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0033d5aw8lwj8eg9	cmpu216ms001ad5ugemfo87rh	https://commons.wikimedia.org/wiki/Special:FilePath/Mini%20concrete%20mixer.jpg	Фото оборудования Altrad Belle Minimix 150 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0034d5awhao0dp5p	cmpu216ms001ad5ugemfo87rh	https://commons.wikimedia.org/wiki/Special:FilePath/Kipptrommelmischer%20150%20Liter.jpg	Фото оборудования Altrad Belle Minimix 150 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0035d5awzdsnxb72	cmpu216mt001cd5ug9xa7nqhf	https://commons.wikimedia.org/wiki/Special:FilePath/Mini%20concrete%20mixer.jpg	Фото оборудования Zitrek B1510 FK Mixer (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0036d5awkcbjv5e4	cmpu216mt001cd5ug9xa7nqhf	https://commons.wikimedia.org/wiki/Special:FilePath/Kipptrommelmischer%20150%20Liter.jpg	Фото оборудования Zitrek B1510 FK Mixer (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0037d5awkjctpjcm	cmpu216mu001ed5ug5aodaewy	https://commons.wikimedia.org/wiki/Special:FilePath/Mini%20concrete%20mixer.jpg	Фото оборудования Sturm CM20160 Concrete Mixer (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0038d5awm3rcn712	cmpu216mu001ed5ug5aodaewy	https://commons.wikimedia.org/wiki/Special:FilePath/Kipptrommelmischer%20150%20Liter.jpg	Фото оборудования Sturm CM20160 Concrete Mixer (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0039d5awc26cid9i	cmpu216mv001gd5ugfa8f7hth	https://commons.wikimedia.org/wiki/Special:FilePath/Mini%20concrete%20mixer.jpg	Фото оборудования RedVerg RD-CM180 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003ad5aw5teoa5h8	cmpu216mv001gd5ugfa8f7hth	https://commons.wikimedia.org/wiki/Special:FilePath/Kipptrommelmischer%20150%20Liter.jpg	Фото оборудования RedVerg RD-CM180 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003bd5aw71r9y1jo	cmpu216mw001id5ughgbdbbke	https://commons.wikimedia.org/wiki/Special:FilePath/Mini%20concrete%20mixer.jpg	Фото оборудования Patriot BM 208C Mixer (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003cd5awcnuu3j0h	cmpu216mw001id5ughgbdbbke	https://commons.wikimedia.org/wiki/Special:FilePath/Kipptrommelmischer%20150%20Liter.jpg	Фото оборудования Patriot BM 208C Mixer (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003dd5aw1ycsbs8c	cmpu216mx001kd5ug4h49hfpn	https://commons.wikimedia.org/wiki/Special:FilePath/Plate%20compactor.jpg	Фото оборудования Wacker Neuson VP1550AW (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003ed5awltve73vh	cmpu216mx001kd5ug4h49hfpn	https://commons.wikimedia.org/wiki/Special:FilePath/Asphalt%20pavement%20plate%20compactor.jpg	Фото оборудования Wacker Neuson VP1550AW (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003fd5awxd8gvlk1	cmpu216my001md5ugh8znvup9	https://commons.wikimedia.org/wiki/Special:FilePath/Plate%20compactor.jpg	Фото оборудования Huter VP-90 Plate Compactor (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003gd5awd2dm07au	cmpu216my001md5ugh8znvup9	https://commons.wikimedia.org/wiki/Special:FilePath/Asphalt%20pavement%20plate%20compactor.jpg	Фото оборудования Huter VP-90 Plate Compactor (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003hd5aw5qiftuqu	cmpu216mz001od5ug0u5b0jol	https://commons.wikimedia.org/wiki/Special:FilePath/Plate%20compactor.jpg	Фото оборудования Champion PC9045FH (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003id5awr9jwl5oe	cmpu216mz001od5ug0u5b0jol	https://commons.wikimedia.org/wiki/Special:FilePath/Asphalt%20pavement%20plate%20compactor.jpg	Фото оборудования Champion PC9045FH (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003jd5awrzn8keng	cmpu216n0001qd5ugicavws33	https://commons.wikimedia.org/wiki/Special:FilePath/Plate%20compactor.jpg	Фото оборудования Masalta MS60-4 Compactor (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003kd5awixcoqyrx	cmpu216n0001qd5ugicavws33	https://commons.wikimedia.org/wiki/Special:FilePath/Asphalt%20pavement%20plate%20compactor.jpg	Фото оборудования Masalta MS60-4 Compactor (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003ld5awnitstnze	cmpu216n2001sd5ugmcaje11z	https://commons.wikimedia.org/wiki/Special:FilePath/Plate%20compactor.jpg	Фото оборудования Zitrek CNP 30-2 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003md5awyp7us39w	cmpu216n2001sd5ugmcaje11z	https://commons.wikimedia.org/wiki/Special:FilePath/Asphalt%20pavement%20plate%20compactor.jpg	Фото оборудования Zitrek CNP 30-2 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003nd5aw1p4b7sml	cmpu216n4001ud5ugmt8r8aee	https://commons.wikimedia.org/wiki/Special:FilePath/2023-01-03%20Portable%20electrical%20generators.jpg	Фото оборудования Honda EU30is Inverter Generator (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003od5awqfpqgyam	cmpu216n4001ud5ugmt8r8aee	https://commons.wikimedia.org/wiki/Special:FilePath/Dieselgenerator.jpg	Фото оборудования Honda EU30is Inverter Generator (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003pd5awij1xmed6	cmpu216n5001wd5ugfjewtyji	https://commons.wikimedia.org/wiki/Special:FilePath/2023-01-03%20Portable%20electrical%20generators.jpg	Фото оборудования Fubag BS 6600 AES (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003qd5awkg611odi	cmpu216n5001wd5ugfjewtyji	https://commons.wikimedia.org/wiki/Special:FilePath/Dieselgenerator.jpg	Фото оборудования Fubag BS 6600 AES (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003rd5aw9uv9kfnr	cmpu216n6001yd5ugu0fr6hvo	https://commons.wikimedia.org/wiki/Special:FilePath/2023-01-03%20Portable%20electrical%20generators.jpg	Фото оборудования Hyundai HHY 7050FE (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003sd5awyags3yrf	cmpu216n6001yd5ugu0fr6hvo	https://commons.wikimedia.org/wiki/Special:FilePath/Dieselgenerator.jpg	Фото оборудования Hyundai HHY 7050FE (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003td5awljdk04lt	cmpu216n70020d5ugl2fz23t1	https://commons.wikimedia.org/wiki/Special:FilePath/2023-01-03%20Portable%20electrical%20generators.jpg	Фото оборудования Firman SPG6500E2 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003ud5awyz61jh4o	cmpu216n70020d5ugl2fz23t1	https://commons.wikimedia.org/wiki/Special:FilePath/Dieselgenerator.jpg	Фото оборудования Firman SPG6500E2 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003vd5awudi715gy	cmpu216n80022d5ug8rmjz67e	https://commons.wikimedia.org/wiki/Special:FilePath/2023-01-03%20Portable%20electrical%20generators.jpg	Фото оборудования SDMO Technic 7500 TE (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003wd5aw8kku7pck	cmpu216n80022d5ug8rmjz67e	https://commons.wikimedia.org/wiki/Special:FilePath/Dieselgenerator.jpg	Фото оборудования SDMO Technic 7500 TE (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003xd5awlzj3a1e4	cmpu216n90024d5ugqss61ynu	https://commons.wikimedia.org/wiki/Special:FilePath/Air%20Compressor.JPG	Фото оборудования ABAC Montecarlo L20P (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm003yd5awg9sikgxk	cmpu216n90024d5ugqss61ynu	https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20Air%20Compressor%20for%20Fiber%20Laser%20Cutting%20Application.jpg	Фото оборудования ABAC Montecarlo L20P (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm003zd5awids6v19q	cmpu216na0026d5uggtjk00n5	https://commons.wikimedia.org/wiki/Special:FilePath/Air%20Compressor.JPG	Фото оборудования Fubag VCF 100 CM3 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0040d5awfz0dexys	cmpu216na0026d5uggtjk00n5	https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20Air%20Compressor%20for%20Fiber%20Laser%20Cutting%20Application.jpg	Фото оборудования Fubag VCF 100 CM3 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0041d5awkv1k4m67	cmpu216nb0028d5ugquezq4xy	https://commons.wikimedia.org/wiki/Special:FilePath/Air%20Compressor.JPG	Фото оборудования Remeza SB4/C-50.LB30A (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0042d5awka196vtn	cmpu216nb0028d5ugquezq4xy	https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20Air%20Compressor%20for%20Fiber%20Laser%20Cutting%20Application.jpg	Фото оборудования Remeza SB4/C-50.LB30A (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0043d5awsjfsfcg8	cmpzkjdev001md5aw9lrt29r7	https://commons.wikimedia.org/wiki/Special:FilePath/Air%20Compressor.JPG	Фото оборудования Patriot EURO 50/260K (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0044d5awyj8nxsny	cmpzkjdev001md5aw9lrt29r7	https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20Air%20Compressor%20for%20Fiber%20Laser%20Cutting%20Application.jpg	Фото оборудования Patriot EURO 50/260K (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0045d5awb4llvnxf	cmpu216nd002cd5ug21i5wbkv	https://commons.wikimedia.org/wiki/Special:FilePath/Air%20Compressor.JPG	Фото оборудования Metabo Basic 250-24 W OF (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0046d5awezljiyfg	cmpu216nd002cd5ug21i5wbkv	https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20Air%20Compressor%20for%20Fiber%20Laser%20Cutting%20Application.jpg	Фото оборудования Metabo Basic 250-24 W OF (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0047d5awquz2forc	cmpu216ne002ed5ug1748imv1	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffold%209154.jpg	Фото оборудования Krause Protec XXL 7 m Tower (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0048d5awb3pyqfv3	cmpu216ne002ed5ug1748imv1	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffolding%20%2827813206687%29.jpg	Фото оборудования Krause Protec XXL 7 m Tower (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0049d5awinvduq8t	cmpu216nf002gd5ugzceozmj9	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffold%209154.jpg	Фото оборудования Virastar VS Tower 6 m (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004ad5aw6wfr0t2y	cmpu216nf002gd5ugzceozmj9	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffolding%20%2827813206687%29.jpg	Фото оборудования Virastar VS Tower 6 m (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004bd5aw4hw0qh23	cmpu216ng002id5ug3p3xiw19	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffold%209154.jpg	Фото оборудования Layher Zifa Compact (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004cd5awb35fgwox	cmpu216ng002id5ug3p3xiw19	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffolding%20%2827813206687%29.jpg	Фото оборудования Layher Zifa Compact (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004dd5aw3rokhek8	cmpzkjdf0001wd5aw8ig8msks	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffold%209154.jpg	Фото оборудования Euro Scaffold Rolling Tower 75x190 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004ed5awa29h252l	cmpzkjdf0001wd5aw8ig8msks	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffolding%20%2827813206687%29.jpg	Фото оборудования Euro Scaffold Rolling Tower 75x190 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004fd5awyccfaene	cmpu216ni002md5ugaac4trp1	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffold%209154.jpg	Фото оборудования Steel Frame Facade Kit 12 m (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004gd5aw6532klgj	cmpu216ni002md5ugaac4trp1	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20scaffolding%20%2827813206687%29.jpg	Фото оборудования Steel Frame Facade Kit 12 m (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004hd5aw60orspkw	cmpu216ni002od5ugcfr8ytc8	https://images.unsplash.com/photo-1473090928358-00fcead4f08c?auto=format&fit=crop&w=1200&q=80	Фото оборудования ESAB Rogue ES 200i (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004id5awal9dndep	cmpu216ni002od5ugcfr8ytc8	https://images.unsplash.com/photo-1726421690313-2e0519335b82?auto=format&fit=crop&w=1200&q=80	Фото оборудования ESAB Rogue ES 200i (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004jd5awq6dg234l	cmpu216nj002qd5ug3rjdm07r	https://images.unsplash.com/photo-1473090928358-00fcead4f08c?auto=format&fit=crop&w=1200&q=80	Фото оборудования Svarog REAL ARC 200 Black (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004kd5aw22ml3jqy	cmpu216nj002qd5ug3rjdm07r	https://images.unsplash.com/photo-1726421690313-2e0519335b82?auto=format&fit=crop&w=1200&q=80	Фото оборудования Svarog REAL ARC 200 Black (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004ld5awm0dzax41	cmpu216nl002sd5uga8ohegg9	https://images.unsplash.com/photo-1473090928358-00fcead4f08c?auto=format&fit=crop&w=1200&q=80	Фото оборудования FoxWeld Master 202M (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004md5awu2ci842o	cmpu216nl002sd5uga8ohegg9	https://images.unsplash.com/photo-1726421690313-2e0519335b82?auto=format&fit=crop&w=1200&q=80	Фото оборудования FoxWeld Master 202M (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004nd5awbsjit6pz	cmpzkjdf60026d5aw0hcrt7hd	https://images.unsplash.com/photo-1473090928358-00fcead4f08c?auto=format&fit=crop&w=1200&q=80	Фото оборудования Resanta SAI-220 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004od5aw6islclo2	cmpzkjdf60026d5aw0hcrt7hd	https://images.unsplash.com/photo-1726421690313-2e0519335b82?auto=format&fit=crop&w=1200&q=80	Фото оборудования Resanta SAI-220 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004pd5aw8hrbly4q	cmpu216nn002wd5ugx53nijsp	https://images.unsplash.com/photo-1473090928358-00fcead4f08c?auto=format&fit=crop&w=1200&q=80	Фото оборудования Aurora Stickmate 250 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004qd5awfmpzecg2	cmpu216nn002wd5ugx53nijsp	https://images.unsplash.com/photo-1726421690313-2e0519335b82?auto=format&fit=crop&w=1200&q=80	Фото оборудования Aurora Stickmate 250 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004rd5awzujtpwee	cmpu216no002yd5ugw5q3lswn	https://images.unsplash.com/photo-1723117799189-ab87698c8938?auto=format&fit=crop&w=1200&q=80	Фото оборудования Stihl TS 420 Cut-Off Saw (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004sd5awp0nc7sbj	cmpu216no002yd5ugw5q3lswn	https://images.unsplash.com/photo-1505855796860-aa05646cbf1f?auto=format&fit=crop&w=1200&q=80	Фото оборудования Stihl TS 420 Cut-Off Saw (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004td5awn8tav985	cmpu216np0030d5ugfq63q4af	https://images.unsplash.com/photo-1723117799189-ab87698c8938?auto=format&fit=crop&w=1200&q=80	Фото оборудования Husqvarna K 770 Cutter (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004ud5aw6mnq4yz3	cmpu216np0030d5ugfq63q4af	https://images.unsplash.com/photo-1505855796860-aa05646cbf1f?auto=format&fit=crop&w=1200&q=80	Фото оборудования Husqvarna K 770 Cutter (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004vd5awxxy192x8	cmpu216nq0032d5ugzw6k0y5s	https://images.unsplash.com/photo-1723117799189-ab87698c8938?auto=format&fit=crop&w=1200&q=80	Фото оборудования Makita LC1230 Metal Saw (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004wd5aw5s1is4b1	cmpu216nq0032d5ugzw6k0y5s	https://images.unsplash.com/photo-1505855796860-aa05646cbf1f?auto=format&fit=crop&w=1200&q=80	Фото оборудования Makita LC1230 Metal Saw (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004xd5awbe43lotc	cmpu216nr0034d5ugmb25ejc3	https://images.unsplash.com/photo-1723117799189-ab87698c8938?auto=format&fit=crop&w=1200&q=80	Фото оборудования Eibenstock EES 1400-3 Wall Chaser (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm004yd5awjayb8ojn	cmpu216nr0034d5ugmb25ejc3	https://images.unsplash.com/photo-1505855796860-aa05646cbf1f?auto=format&fit=crop&w=1200&q=80	Фото оборудования Eibenstock EES 1400-3 Wall Chaser (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm004zd5aw8pzso6v1	cmpu216ns0036d5ug0xnnwuav	https://images.unsplash.com/photo-1723117799189-ab87698c8938?auto=format&fit=crop&w=1200&q=80	Фото оборудования Legacy Asphalt Saw 500 (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0050d5awakgpny5a	cmpu216ns0036d5ug0xnnwuav	https://images.unsplash.com/photo-1505855796860-aa05646cbf1f?auto=format&fit=crop&w=1200&q=80	Фото оборудования Legacy Asphalt Saw 500 (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0051d5awpgogddyy	cmpu216ns0038d5ugivrykrme	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20laser.jpg	Фото оборудования Bosch GLL 3-80 CG Laser Level (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0052d5awinggskn2	cmpu216ns0038d5ugivrykrme	https://commons.wikimedia.org/wiki/Special:FilePath/Laser-Level.jpg	Фото оборудования Bosch GLL 3-80 CG Laser Level (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0053d5awy19q9yrr	cmpu216nt003ad5ugcgyrtsjo	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20laser.jpg	Фото оборудования Leica Rugby 620 Rotary Laser (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0054d5awi7mluq9w	cmpu216nt003ad5ugcgyrtsjo	https://commons.wikimedia.org/wiki/Special:FilePath/Laser-Level.jpg	Фото оборудования Leica Rugby 620 Rotary Laser (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0055d5awifjrrmot	cmpu216nu003cd5ugz8tfmbiy	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20laser.jpg	Фото оборудования Stanley TLM330 Distance Meter (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0056d5awuxlz61g9	cmpu216nu003cd5ugz8tfmbiy	https://commons.wikimedia.org/wiki/Special:FilePath/Laser-Level.jpg	Фото оборудования Stanley TLM330 Distance Meter (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0057d5aw9ncvt2x4	cmpu216nv003ed5ugrwn6xnla	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20laser.jpg	Фото оборудования ADA Cube 360 Home Edition (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm0058d5awnq8t8fi7	cmpu216nv003ed5ugrwn6xnla	https://commons.wikimedia.org/wiki/Special:FilePath/Laser-Level.jpg	Фото оборудования ADA Cube 360 Home Edition (2)	1	2026-06-04 14:06:20.866
cmpzkjdfm0059d5awangdxyi4	cmpu216nx003gd5ug6jpvmysq	https://commons.wikimedia.org/wiki/Special:FilePath/Construction%20laser.jpg	Фото оборудования Trimble M3 Total Station (1)	0	2026-06-04 14:06:20.866
cmpzkjdfm005ad5aweepnmu9i	cmpu216nx003gd5ug6jpvmysq	https://commons.wikimedia.org/wiki/Special:FilePath/Laser-Level.jpg	Фото оборудования Trimble M3 Total Station (2)	1	2026-06-04 14:06:20.866
\.


--
-- Data for Name: EquipmentSpec; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentSpec" (id, "equipmentId", name, value, unit, "sortOrder") FROM stdin;
cmpzkjdg1005bd5awkk0vsipb	cmpu216mb0010d5ugzabpsrkm	Энергия удара	12.5	J	0
cmpzkjdg1005cd5awce74kxw9	cmpu216mb0010d5ugzabpsrkm	Тип патрона	SDS-max	\N	1
cmpzkjdg1005dd5aw234o5czh	cmpu216mb0010d5ugzabpsrkm	Диаметр сверления	45	mm	2
cmpzkjdg1005ed5awnmpok60w	cmpu216mb0010d5ugzabpsrkm	Режим работы	Сверление и долбление	\N	3
cmpzkjdg1005fd5aw6juau74h	cmpu216mo0012d5ugujtqybh2	Энергия удара	19.9	J	0
cmpzkjdg1005gd5awl0d7e8wy	cmpu216mo0012d5ugujtqybh2	Контроль вибрации	AVT	\N	1
cmpzkjdg2005hd5awilu0gvfz	cmpu216mo0012d5ugujtqybh2	Напряжение	220	V	2
cmpzkjdg2005id5aww0x62hh2	cmpu216mo0012d5ugujtqybh2	Чехол в комплекте	Да	\N	3
cmpzkjdg2005jd5awastz5h6x	cmpu216mp0014d5ugu0lz927j	Энергия удара	19	J	0
cmpzkjdg2005kd5awt8uy0p3s	cmpu216mp0014d5ugu0lz927j	Держатель инструмента	SDS-max	\N	1
cmpzkjdg2005ld5awqvjj3k7l	cmpu216mp0014d5ugu0lz927j	Ударов в минуту	2100	\N	2
cmpzkjdg2005md5awjvnrf3fs	cmpu216mp0014d5ugu0lz927j	Вариант использования	Снос перекрытий и стен	\N	3
cmpzkjdg2005nd5awrpzlnuov	cmpu216mq0016d5ugpx6o8yxs	Энергия удара	26	J	0
cmpzkjdg2005od5awx7hja920	cmpu216mq0016d5ugpx6o8yxs	Статус услуги	Ротация технического обслуживания	\N	1
cmpzkjdg2005pd5aw74kwop2n	cmpu216mq0016d5ugpx6o8yxs	Уровень шума	96	dB	2
cmpzkjdg2005qd5awnowdbbvs	cmpu216mq0016d5ugpx6o8yxs	Рекомендуемое использование	Структурный снос	\N	3
cmpzkjdg2005rd5awrahmb1v5	cmpu216mr0018d5ugf6vg3q9u	Ударов в минуту	1950	\N	0
cmpzkjdg2005sd5awqochao5w	cmpu216mr0018d5ugf6vg3q9u	Энергия удара	20	J	1
cmpzkjdg2005td5awy4q11l91	cmpu216mr0018d5ugf6vg3q9u	Длина шнура	6	m	2
cmpzkjdg2005ud5awbhlcg0fh	cmpu216mr0018d5ugf6vg3q9u	Транспортировочный кейс	Да	\N	3
cmpzkjdg2005vd5awzuvqufpa	cmpu216ms001ad5ugemfo87rh	Громкость барабана	130	L	0
cmpzkjdg2005wd5awes6rd7xf	cmpu216ms001ad5ugemfo87rh	Смешать выход	90	L	1
cmpzkjdg2005xd5awuwp5olox	cmpu216ms001ad5ugemfo87rh	Источник питания	220	V	2
cmpzkjdg2005yd5awd7o3rcca	cmpu216ms001ad5ugemfo87rh	Тип привода	Электрический	\N	3
cmpzkjdg2005zd5awqvromdu6	cmpu216mt001cd5ug9xa7nqhf	Громкость барабана	140	L	0
cmpzkjdg20060d5aw5llzudcu	cmpu216mt001cd5ug9xa7nqhf	Конструкция рамы	Переносная колесная база	\N	1
cmpzkjdg20061d5awhdunlv8a	cmpu216mt001cd5ug9xa7nqhf	Материал коронки	Чугун	\N	2
cmpzkjdg20062d5awioyhmw8z	cmpu216mt001cd5ug9xa7nqhf	Сборка	Быстросъемный барабан	\N	3
cmpzkjdg20063d5awmwlhmpk9	cmpu216mu001ed5ug5aodaewy	Громкость барабана	160	L	0
cmpzkjdg20064d5awsnvmjni4	cmpu216mu001ed5ug5aodaewy	Смешать выход	110	L	1
cmpzkjdg20065d5awzur7ojpv	cmpu216mu001ed5ug5aodaewy	Защита двигателя	Тепловое реле	\N	2
cmpzkjdg20066d5awints68ia	cmpu216mu001ed5ug5aodaewy	Контроль наклона	Маховик	\N	3
cmpzkjdg20067d5aw2zntdiu0	cmpu216mv001gd5ugfa8f7hth	Громкость барабана	180	L	0
cmpzkjdg20068d5awyuujwu4g	cmpu216mv001gd5ugfa8f7hth	Примечание о наличии	Ожидание диагностики	\N	1
cmpzkjdg20069d5awb0gl71np	cmpu216mv001gd5ugfa8f7hth	Зубчатое кольцо	Сталь	\N	2
cmpzkjdg2006ad5awfxd17i1n	cmpu216mv001gd5ugfa8f7hth	Транспортные колеса	Да	\N	3
cmpzkjdg2006bd5awz661oolk	cmpu216mw001id5ughgbdbbke	Громкость барабана	200	L	0
cmpzkjdg2006cd5awhd5ji03z	cmpu216mw001id5ughgbdbbke	Смешать выход	140	L	1
cmpzkjdg2006dd5awxivoneko	cmpu216mw001id5ughgbdbbke	Назначение пакета	Большие заливки	\N	2
cmpzkjdg2006ed5awzozg8lhy	cmpu216mw001id5ughgbdbbke	Источник питания	220	V	3
cmpzkjdg2006fd5aw9jadxvnl	cmpu216mx001kd5ug4h49hfpn	Сила уплотнения	15	kN	0
cmpzkjdg2006gd5awyqbueqh4	cmpu216mx001kd5ug4h49hfpn	Ширина пластины	500	mm	1
cmpzkjdg2006hd5awm0qkao04	cmpu216mx001kd5ug4h49hfpn	Скорость движения	25	m/min	2
cmpzkjdg2006id5awe5t6dt8h	cmpu216mx001kd5ug4h49hfpn	Тип двигателя	Бензин	\N	3
cmpzkjdg2006jd5awwacgtfuv	cmpu216my001md5ugh8znvup9	Сила уплотнения	13	kN	0
cmpzkjdg2006kd5aw965s4pkt	cmpu216my001md5ugh8znvup9	Опорная пластина	530 x 500	mm	1
cmpzkjdg2006ld5aw67t2igof	cmpu216my001md5ugh8znvup9	Топливный бак	3.6	L	2
cmpzkjdg2006md5aw14c03zfq	cmpu216my001md5ugh8znvup9	Стартовая система	Ручная отдача	\N	3
cmpzkjdg2006nd5awpjzcs369	cmpu216mz001od5ug0u5b0jol	Глубина уплотнения	300	mm	0
cmpzkjdg2006od5aw13op3sfh	cmpu216mz001od5ug0u5b0jol	Сила	15	kN	1
cmpzkjdg2006pd5awb04ohwpk	cmpu216mz001od5ug0u5b0jol	Резервуар для воды	Нет	\N	2
cmpzkjdg2006qd5awgcsfhwtp	cmpu216mz001od5ug0u5b0jol	Ручка	Складной	\N	3
cmpzkjdg2006rd5awcp7znkjf	cmpu216n0001qd5ugicavws33	Сила уплотнения	10.5	kN	0
cmpzkjdg2006sd5awh6nccns9	cmpu216n0001qd5ugicavws33	Примечание по обслуживанию	Проверка виброблока	\N	1
cmpzkjdg2006td5aw8qzpisu7	cmpu216n0001qd5ugicavws33	Транспортные колеса	Необязательный	\N	2
cmpzkjdg2006ud5awpilgnpq5	cmpu216n0001qd5ugicavws33	Тип двигателя	Бензин	\N	3
cmpzkjdg2006vd5awiu5zb6wt	cmpu216n2001sd5ugmcaje11z	Сила уплотнения	25	kN	0
cmpzkjdg2006wd5awbfvh30y4	cmpu216n2001sd5ugmcaje11z	Размер пластины	630 x 400	mm	1
cmpzkjdg2006xd5awokt2eycn	cmpu216n2001sd5ugmcaje11z	Скорость движения	18	m/min	2
cmpzkjdg2006yd5aww8lmqqb5	cmpu216n2001sd5ugmcaje11z	Вариант использования	Подготовка дорожного основания и двора	\N	3
cmpzkjdg2006zd5aw1vasnobn	cmpu216n4001ud5ugmt8r8aee	Номинальная мощность	2.8	kW	0
cmpzkjdg20070d5awbpx9eebs	cmpu216n4001ud5ugmt8r8aee	Тип топлива	Бензин	\N	1
cmpzkjdg20071d5awtcf3br1e	cmpu216n4001ud5ugmt8r8aee	Уровень шума	57	dB	2
cmpzkjdg20072d5aws6j626xc	cmpu216n4001ud5ugmt8r8aee	Время выполнения	7	ч	3
cmpzkjdg20073d5aw3abzjk1r	cmpu216n5001wd5ugfjewtyji	Номинальная мощность	5.0	kW	0
cmpzkjdg20074d5awo65s0671	cmpu216n5001wd5ugfjewtyji	Розетки	2 x 220V	\N	1
cmpzkjdg20075d5awjnv5qv2r	cmpu216n5001wd5ugfjewtyji	Стартер	Электрический	\N	2
cmpzkjdg20076d5aw3wv48kyj	cmpu216n5001wd5ugfjewtyji	Объем бака	25	L	3
cmpzkjdg20077d5awma6eym2f	cmpu216n6001yd5ugu0fr6hvo	Номинальная мощность	5.0	kW	0
cmpzkjdg20078d5awf7t7vub6	cmpu216n6001yd5ugu0fr6hvo	Топливный бак	25	L	1
cmpzkjdg20079d5awrxp376ud	cmpu216n6001yd5ugu0fr6hvo	Время выполнения	8	ч	2
cmpzkjdg2007ad5awzzhdle3d	cmpu216n6001yd5ugu0fr6hvo	Выходная фаза	Однофазный	\N	3
cmpzkjdg2007bd5awl1xk8wie	cmpu216n70020d5ugl2fz23t1	Причина проверки	Проверка AVR и альтернатора	\N	0
cmpzkjdg2007cd5aw0ti8q5bc	cmpu216n70020d5ugl2fz23t1	Номинальная мощность	5.0	kW	1
cmpzkjdg2007dd5aw4p8x9rfe	cmpu216n70020d5ugl2fz23t1	Тип топлива	Бензин	\N	2
cmpzkjdg2007ed5aww0jai254	cmpu216n70020d5ugl2fz23t1	Транспортный комплект	Комплект колес	\N	3
cmpzkjdg2007fd5awn5uok525	cmpu216n80022d5ug8rmjz67e	Номинальная мощность	6.0	kVA	0
cmpzkjdg2007gd5aw0fvhjkao	cmpu216n80022d5ug8rmjz67e	Фаза	Трехфазный	\N	1
cmpzkjdg2007hd5awv6d0kqmk	cmpu216n80022d5ug8rmjz67e	Время выполнения	9	ч	2
cmpzkjdg2007id5aw4ko83dh2	cmpu216n80022d5ug8rmjz67e	Стартер	Электрический	\N	3
cmpzkjdg2007jd5awdbf4sr1r	cmpu216n90024d5ugqss61ynu	Объем ресивера	50	L	0
cmpzkjdg2007kd5awy7ogn6f5	cmpu216n90024d5ugqss61ynu	Давление	10	бар	1
cmpzkjdg2007ld5awj9m9542v	cmpu216n90024d5ugqss61ynu	Расход воздуха	220	L/min	2
cmpzkjdg2007md5aw0ikhb9sm	cmpu216n90024d5ugqss61ynu	Портативность	Колесная база	\N	3
cmpzkjdg2007nd5awo2y8b954	cmpu216na0026d5uggtjk00n5	Объем ресивера	100	L	0
cmpzkjdg2007od5aw1p8tn178	cmpu216na0026d5uggtjk00n5	Расход воздуха	440	L/min	1
cmpzkjdg2007pd5awdxfla37m	cmpu216na0026d5uggtjk00n5	Тип привода	Пояс	\N	2
cmpzkjdg2007qd5awh9r5eh1a	cmpu216na0026d5uggtjk00n5	Давление	10	бар	3
cmpzkjdg2007rd5aw484qzf86	cmpu216nb0028d5ugquezq4xy	Объем ресивера	50	L	0
cmpzkjdg2007sd5aw7j7fe4vj	cmpu216nb0028d5ugquezq4xy	Расход воздуха	420	L/min	1
cmpzkjdg2007td5awpnhysvoi	cmpu216nb0028d5ugquezq4xy	Реле давления	Автоматический	\N	2
cmpzkjdg2007ud5awgrk6tbcm	cmpu216nb0028d5ugquezq4xy	Страна сборки	Беларусь	\N	3
cmpzkjdg2007vd5awv0gekxs2	cmpzkjdev001md5aw9lrt29r7	Объем ресивера	50	L	0
cmpzkjdg2007wd5awl27fmzie	cmpzkjdev001md5aw9lrt29r7	Расход воздуха	260	L/min	1
cmpzkjdg2007xd5awl1en4zoh	cmpzkjdev001md5aw9lrt29r7	Примечание по ремонту	Замена блока клапанов	\N	2
cmpzkjdg2007yd5awrx6snx64	cmpzkjdev001md5aw9lrt29r7	Тип привода	Прямой	\N	3
cmpzkjdg2007zd5aw95vdhtul	cmpu216nd002cd5ug21i5wbkv	Объем ресивера	24	L	0
cmpzkjdg20080d5awl5byy6it	cmpu216nd002cd5ug21i5wbkv	Без масла	Да	\N	1
cmpzkjdg20081d5awgsqgs0kl	cmpu216nd002cd5ug21i5wbkv	Расход воздуха	200	L/min	2
cmpzkjdg20082d5awy0yhx4sb	cmpu216nd002cd5ug21i5wbkv	Уровень шума	82	dB	3
cmpzkjdg20083d5awafouv652	cmpu216ne002ed5ug1748imv1	Рабочая высота	7.3	m	0
cmpzkjdg20084d5awztyfst8v	cmpu216ne002ed5ug1748imv1	Размер платформы	2.0 x 0.6	m	1
cmpzkjdg20085d5aws5dzthck	cmpu216ne002ed5ug1748imv1	Материал	Алюминий	\N	2
cmpzkjdg20086d5aw5cj8x811	cmpu216ne002ed5ug1748imv1	Использование	Внутренние и фасадные работы	\N	3
cmpzkjdg20087d5aw4yu6h6oj	cmpu216nf002gd5ugzceozmj9	Рабочая высота	6.2	m	0
cmpzkjdg30088d5aw5jrnd7kn	cmpu216nf002gd5ugzceozmj9	Нагрузка на платформу	200	kg	1
cmpzkjdg30089d5awzj6qinbe	cmpu216nf002gd5ugzceozmj9	Время сборки	20	мин	2
cmpzkjdg3008ad5awvv6j3ecg	cmpu216nf002gd5ugzceozmj9	Вид транспорта	Компактные секции	\N	3
cmpzkjdg3008bd5awjh9igggw	cmpu216ng002id5ug3p3xiw19	Рабочая высота	4.9	m	0
cmpzkjdg3008cd5aw7arh9fpf	cmpu216ng002id5ug3p3xiw19	Ширина рамы	0.85	m	1
cmpzkjdg3008dd5awjxd9wj7t	cmpu216ng002id5ug3p3xiw19	Область применения	Лестничные клетки и интерьеры	\N	2
cmpzkjdg3008ed5aw4t6jcqy4	cmpu216ng002id5ug3p3xiw19	Материал	Алюминий	\N	3
cmpzkjdg3008fd5awoav3zajb	cmpzkjdf0001wd5aw8ig8msks	Примечание по осмотру	Инвентаризация и аудит стопорных штифтов	\N	0
cmpzkjdg3008gd5awkpnrtkuv	cmpzkjdf0001wd5aw8ig8msks	Рабочая высота	5.4	m	1
cmpzkjdg3008hd5aw2rkbk28j	cmpzkjdf0001wd5aw8ig8msks	Ширина платформы	0.75	m	2
cmpzkjdg3008id5awe0zwhpcp	cmpzkjdf0001wd5aw8ig8msks	Материал	Алюминий	\N	3
cmpzkjdg3008jd5aw4enhmw85	cmpu216ni002md5ugaac4trp1	Архивная заметка	Не предлагается для новых аренд	\N	0
cmpzkjdg3008kd5aw075oscoy	cmpu216ni002md5ugaac4trp1	Рабочая высота	12	m	1
cmpzkjdg3008ld5aw9gc4xobx	cmpu216ni002md5ugaac4trp1	Материал	Сталь	\N	2
cmpzkjdg3008md5awyudl9h6b	cmpu216ni002md5ugaac4trp1	Разделы	Комплект фасадного каркаса	\N	3
cmpzkjdg3008nd5awef6krawo	cmpu216ni002od5ugcfr8ytc8	Сварочный ток	200	A	0
cmpzkjdg3008od5awwos1zj0y	cmpu216ni002od5ugcfr8ytc8	Диаметр электрода	4	mm	1
cmpzkjdg3008pd5aw1luzny24	cmpu216ni002od5ugcfr8ytc8	Входное напряжение	220	V	2
cmpzkjdg3008qd5awd7a0ihem	cmpu216ni002od5ugcfr8ytc8	Класс защиты	IP23S	\N	3
cmpzkjdg3008rd5aw50srj2rn	cmpu216nj002qd5ug3rjdm07r	Сварочный ток	200	A	0
cmpzkjdg3008sd5awxc7b1hm0	cmpu216nj002qd5ug3rjdm07r	Продолжительность включения	60	%	1
cmpzkjdg3008td5awbqx9ru6f	cmpu216nj002qd5ug3rjdm07r	Горячий старт	Да	\N	2
cmpzkjdg3008ud5aw13l7ce5d	cmpu216nj002qd5ug3rjdm07r	Сила дуги	Регулируемый	\N	3
cmpzkjdg3008vd5awxwwedcv1	cmpu216nl002sd5uga8ohegg9	Сварочный ток	200	A	0
cmpzkjdg3008wd5aw8e18922t	cmpu216nl002sd5uga8ohegg9	Отображать	Цифровой	\N	1
cmpzkjdg3008xd5aw4dzkuu0k	cmpu216nl002sd5uga8ohegg9	Диаметр электрода	5	mm	2
cmpzkjdg3008yd5awa7674flo	cmpu216nl002sd5uga8ohegg9	Охлаждение	Принудительная вентиляция	\N	3
cmpzkjdg3008zd5awypk0120n	cmpzkjdf60026d5aw0hcrt7hd	Примечание по обслуживанию	Проверка вентилятора и кабеля	\N	0
cmpzkjdg30090d5awc9mz24t9	cmpzkjdf60026d5aw0hcrt7hd	Сварочный ток	220	A	1
cmpzkjdg30091d5awyr1alsmu	cmpzkjdf60026d5aw0hcrt7hd	Диапазон напряжения	140-260	V	2
cmpzkjdg30092d5awuyczdp9g	cmpzkjdf60026d5aw0hcrt7hd	Охлаждение	Принужденный	\N	3
cmpzkjdg30093d5awkvpgt2l6	cmpu216nn002wd5ugx53nijsp	Сварочный ток	250	A	0
cmpzkjdg30094d5awao19c4bx	cmpu216nn002wd5ugx53nijsp	Продолжительность включения	60	%	1
cmpzkjdg30095d5aw5evp51vq	cmpu216nn002wd5ugx53nijsp	Диаметр электрода	6	mm	2
cmpzkjdg30096d5aw1qcstcvr	cmpu216nn002wd5ugx53nijsp	Область применения	Тяжёлые металлические профили	\N	3
cmpzkjdg30097d5awve8hj9eb	cmpu216no002yd5ugw5q3lswn	Диаметр диска	350	mm	0
cmpzkjdg30098d5aw95ycumwm	cmpu216no002yd5ugw5q3lswn	Глубина резания	125	mm	1
cmpzkjdg30099d5awfvszcota	cmpu216no002yd5ugw5q3lswn	Тип двигателя	Бензин	\N	2
cmpzkjdg3009ad5awyqxdtdny	cmpu216no002yd5ugw5q3lswn	Подключение воды	Да	\N	3
cmpzkjdg3009bd5awlu0fd7fz	cmpu216np0030d5ugfq63q4af	Диаметр диска	350	mm	0
cmpzkjdg3009cd5aw332swqjk	cmpu216np0030d5ugfq63q4af	Глубина резания	125	mm	1
cmpzkjdg3009dd5aw0sp3fko7	cmpu216np0030d5ugfq63q4af	Источник питания	Бензин	\N	2
cmpzkjdg3009ed5aw0i0rkljn	cmpu216np0030d5ugfq63q4af	Вариант использования	Бетон и сталь	\N	3
cmpzkjdg3009fd5awdlxwnxha	cmpu216nq0032d5ugzw6k0y5s	Диаметр лезвия	305	mm	0
cmpzkjdg3009gd5awv6eugxcy	cmpu216nq0032d5ugzw6k0y5s	Тип резки	Холодная нарезка	\N	1
cmpzkjdg3009hd5awivb46m00	cmpu216nq0032d5ugzw6k0y5s	Материал	Металлические профили	\N	2
cmpzkjdg3009id5awx6fm3t48	cmpu216nq0032d5ugzw6k0y5s	Источник питания	220	V	3
cmpzkjdg3009jd5awxka6n1fk	cmpu216nr0034d5ugmb25ejc3	Набор лезвий	Двойной диск	\N	0
cmpzkjdg3009kd5aw06nx5op8	cmpu216nr0034d5ugmb25ejc3	Ширина резки	10-40	mm	1
cmpzkjdg3009ld5awr641x0mt	cmpu216nr0034d5ugmb25ejc3	Примечание по ремонту	Замена защиты лезвия	\N	2
cmpzkjdg3009md5awukis7jb4	cmpu216nr0034d5ugmb25ejc3	Удаление пыли	Поддерживается	\N	3
cmpzkjdg3009nd5awaxe8elty	cmpu216ns0036d5ug0xnnwuav	Архивная заметка	Только исторические записи	\N	0
cmpzkjdg3009od5awgvk0wzf9	cmpu216ns0036d5ug0xnnwuav	Диаметр диска	500	mm	1
cmpzkjdg3009pd5awkkze7wqj	cmpu216ns0036d5ug0xnnwuav	Тип двигателя	Бензин	\N	2
cmpzkjdg3009qd5awfgvgb49b	cmpu216ns0036d5ug0xnnwuav	Вариант использования	Дорожный ремонт	\N	3
cmpzkjdg3009rd5awza9q13it	cmpu216ns0038d5ugivrykrme	Диапазон	30	m	0
cmpzkjdg3009sd5awi14e7d3r	cmpu216ns0038d5ugivrykrme	Цвет луча	Зеленый	\N	1
cmpzkjdg3009td5awdv7uj1fj	cmpu216ns0038d5ugivrykrme	Точность	+/- 0.2	mm/m	2
cmpzkjdg3009ud5awnpsupxy5	cmpu216ns0038d5ugivrykrme	Bluetooth	Да	\N	3
cmpzkjdg3009vd5awimi7l8gf	cmpu216nt003ad5ugcgyrtsjo	Диапазон	800	m	0
cmpzkjdg3009wd5aw3tsw2o92	cmpu216nt003ad5ugcgyrtsjo	Защита	IP67	\N	1
cmpzkjdg3009xd5awoia099ni	cmpu216nt003ad5ugcgyrtsjo	Точность	+/- 1.5	мм на 30 м	2
cmpzkjdg3009yd5awmgqgiwwa	cmpu216nt003ad5ugcgyrtsjo	Область применения	Наружная сортировка	\N	3
cmpzkjdg3009zd5awywk2xmfx	cmpu216nu003cd5ugz8tfmbiy	Диапазон	100	m	0
cmpzkjdg300a0d5awqift6dng	cmpu216nu003cd5ugz8tfmbiy	Точность	+/- 1.5	mm	1
cmpzkjdg300a1d5aw7fs975b9	cmpu216nu003cd5ugz8tfmbiy	Отображать	с подсветкой	\N	2
cmpzkjdg300a2d5aw63yq7ycw	cmpu216nu003cd5ugz8tfmbiy	Функции	Площадь и объем	\N	3
cmpzkjdg300a3d5aw8bvcq1je	cmpu216nv003ed5ugrwn6xnla	Примечание по калибровке	Ожидание калибровки	\N	0
cmpzkjdg300a4d5awtvtkuewm	cmpu216nv003ed5ugrwn6xnla	Диапазон	20	m	1
cmpzkjdg300a5d5awc178n885	cmpu216nv003ed5ugrwn6xnla	Балочные плоскости	1 х 360 градусов	\N	2
cmpzkjdg300a6d5awa248j69j	cmpu216nv003ed5ugrwn6xnla	Резьба для штатива	1/4	\N	3
cmpzkjdg300a7d5awhhjgmol8	cmpu216nx003gd5ug6jpvmysq	Угловая точность	5	сек	0
cmpzkjdg300a8d5awvrp57oje	cmpu216nx003gd5ug6jpvmysq	Диапазон с призмой	3000	m	1
cmpzkjdg300a9d5awxjxynbdu	cmpu216nx003gd5ug6jpvmysq	Хранилище	Внутренняя память	\N	2
cmpzkjdg300aad5awc68lxed9	cmpu216nx003gd5ug6jpvmysq	Вариант использования	План строительства	\N	3
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Favorite" (id, "userId", "equipmentId", "createdAt") FROM stdin;
cmpzkjdjq00f5d5awyfsankgm	cmpu2165a0003d5ugp81cvo3c	cmpu216mb0010d5ugzabpsrkm	2026-06-04 14:06:21.014
cmpzkjdjq00f6d5awt7n9mkjg	cmpu2166y0005d5ugb4frzf2f	cmpu216mq0016d5ugpx6o8yxs	2026-06-04 14:06:21.014
cmpzkjdjq00f7d5aw45k0mzqs	cmpu2168h0007d5ugnf2jgise	cmpu216mu001ed5ug5aodaewy	2026-06-04 14:06:21.014
cmpzkjdjq00f8d5awhzqlwqgj	cmpu2169y0009d5ugfhga2ez2	cmpu216mx001kd5ug4h49hfpn	2026-06-04 14:06:21.014
cmpzkjdjq00f9d5awq7qyii3d	cmpu216bg000bd5ugd2qb3qvf	cmpu216n2001sd5ugmcaje11z	2026-06-04 14:06:21.014
cmpzkjdjq00fad5awn9zu730a	cmpu216cy000dd5uglc96kk2d	cmpu216n6001yd5ugu0fr6hvo	2026-06-04 14:06:21.014
cmpzkjdjq00fbd5awaeb7m4b8	cmpu216ee000fd5ug53k7bbtd	cmpu216na0026d5uggtjk00n5	2026-06-04 14:06:21.014
cmpzkjdjq00fcd5awu2xy1wy4	cmpu216fw000hd5ug1jlu1bgl	cmpu216nd002cd5ug21i5wbkv	2026-06-04 14:06:21.014
cmpzkjdjq00fdd5aw1amngk47	cmpu216hd000jd5ugc1fzmsz3	cmpzkjdf0001wd5aw8ig8msks	2026-06-04 14:06:21.014
cmpzkjdjq00fed5awvorhb8fq	cmpu216iv000ld5ug1eear6f0	cmpu216nl002sd5uga8ohegg9	2026-06-04 14:06:21.014
cmpzkjdjq00ffd5aw0bjv01r4	cmpu216kd000nd5ugzsuleofa	cmpu216np0030d5ugfq63q4af	2026-06-04 14:06:21.014
cmpzkjdjq00fgd5awhcq9g6ci	cmpu216lu000pd5ugwgq7vwpc	cmpu216ns0038d5ugivrykrme	2026-06-04 14:06:21.014
cmpzkjdjq00fhd5awjvyh4j7t	cmpu2165a0003d5ugp81cvo3c	cmpu216nx003gd5ug6jpvmysq	2026-06-04 14:06:21.014
cmpzkjdjq00fid5awdinldhar	cmpu2166y0005d5ugb4frzf2f	cmpu216mp0014d5ugu0lz927j	2026-06-04 14:06:21.014
cmpzkjdjq00fjd5awuq0bw06n	cmpu2168h0007d5ugnf2jgise	cmpu216mt001cd5ug9xa7nqhf	2026-06-04 14:06:21.014
cmpzkjdjq00fkd5awkqoq3a41	cmpu2169y0009d5ugfhga2ez2	cmpu216mw001id5ughgbdbbke	2026-06-04 14:06:21.014
cmpzkjdjq00fld5awfuic2ixu	cmpu216bg000bd5ugd2qb3qvf	cmpu216n0001qd5ugicavws33	2026-06-04 14:06:21.014
cmpzkjdjq00fmd5awavzehse9	cmpu216cy000dd5uglc96kk2d	cmpu216n5001wd5ugfjewtyji	2026-06-04 14:06:21.014
cmpzkjdjq00fnd5awe7gh95hk	cmpu216ee000fd5ug53k7bbtd	cmpu216n90024d5ugqss61ynu	2026-06-04 14:06:21.014
cmpzkjdjq00fod5aw3oiib11t	cmpu216fw000hd5ug1jlu1bgl	cmpzkjdev001md5aw9lrt29r7	2026-06-04 14:06:21.014
cmpzkjdjq00fpd5awkyrwnh0l	cmpu216hd000jd5ugc1fzmsz3	cmpu216ng002id5ug3p3xiw19	2026-06-04 14:06:21.014
cmpzkjdjq00fqd5aww7dkst2c	cmpu216iv000ld5ug1eear6f0	cmpu216nj002qd5ug3rjdm07r	2026-06-04 14:06:21.014
cmpzkjdjq00frd5aw0m9xypwy	cmpu216kd000nd5ugzsuleofa	cmpu216no002yd5ugw5q3lswn	2026-06-04 14:06:21.014
cmpzkjdjq00fsd5awww5n4qi6	cmpu216lu000pd5ugwgq7vwpc	cmpu216nr0034d5ugmb25ejc3	2026-06-04 14:06:21.014
cmpzkjdjq00ftd5awno9bv727	cmpu2165a0003d5ugp81cvo3c	cmpu216nv003ed5ugrwn6xnla	2026-06-04 14:06:21.014
cmpzkjdjq00fud5awte8pl23b	cmpu2166y0005d5ugb4frzf2f	cmpu216mo0012d5ugujtqybh2	2026-06-04 14:06:21.014
cmpzkjdjq00fvd5awjafdnmv6	cmpu2168h0007d5ugnf2jgise	cmpu216ms001ad5ugemfo87rh	2026-06-04 14:06:21.014
cmpzkjdjq00fwd5awcjeahkto	cmpu2169y0009d5ugfhga2ez2	cmpu216mv001gd5ugfa8f7hth	2026-06-04 14:06:21.014
cmpzkjdjq00fxd5awlqu9afas	cmpu216bg000bd5ugd2qb3qvf	cmpu216mz001od5ug0u5b0jol	2026-06-04 14:06:21.014
cmpzkjdjq00fyd5awzxstbg51	cmpu216cy000dd5uglc96kk2d	cmpu216n4001ud5ugmt8r8aee	2026-06-04 14:06:21.014
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, "rentalOrderId", amount, status, method, "paidAt", "createdAt", "updatedAt") FROM stdin;
cmpzkjdkg00h3d5aw3pew9ja2	cmpzkjdhp00acd5aw0sraur01	710.00	FAILED	BANK_TRANSFER_MOCK	\N	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00h4d5awi3zq29ym	cmpzkjdi800agd5awazrvc91b	799.00	PAID	CASH	2026-06-02 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00h5d5aw98jfhtdp	cmpzkjdia00ald5awqza0lsrz	1916.00	PAID	CARD_MOCK	2026-05-26 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00h6d5awg2n7mkzy	cmpzkjdic00ard5awq8j8sz8e	665.00	PAID	CASH	2026-04-14 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00h7d5awv0btjimy	cmpzkjdie00avd5awzkr1ujma	1180.00	REFUNDED	CARD_MOCK	2026-05-15 10:00:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00h8d5awapys1rdk	cmpzkjdif00b0d5awsfctdv3z	3633.00	PENDING	CARD_MOCK	\N	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00h9d5aw4uwtivdx	cmpzkjdih00b6d5awuxs4d9ad	640.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00had5awpd3ynkwf	cmpzkjdii00bad5awnongckbs	1707.00	PAID	CASH	2026-04-18 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hbd5awlgxuuyfv	cmpzkjdij00bfd5awnatl9vwo	2025.00	PAID	CARD_MOCK	2026-05-26 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hcd5awv2f33vxs	cmpzkjdim00bpd5aw4zvaaai6	2062.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hdd5aw9awr40ds	cmpzkjdio00bud5awu8uguj67	1457.00	PAID	CARD_MOCK	2026-06-06 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hed5aw15lybvms	cmpzkjdip00c0d5awy8u4nzk0	602.00	PAID	CASH	2026-04-23 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hfd5awg8xruaul	cmpzkjdir00c4d5aw8pd7stxh	930.00	REFUNDED	CARD_MOCK	2026-05-24 10:00:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hgd5awd38bwade	cmpzkjdis00c9d5aw1pfqbi1c	2916.00	PAID	CASH	2026-05-26 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hhd5awtj3wy8jb	cmpzkjdit00cfd5awlr9i36kn	409.00	PENDING	CARD_MOCK	\N	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hid5awwr88yw26	cmpzkjdiv00cjd5awz2ta42vq	538.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hjd5awvl38h7nw	cmpzkjdiw00cod5aw89zg8vfl	2163.00	PAID	CARD_MOCK	2026-04-28 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hkd5awlkmgmuu8	cmpzkjdiy00cud5awqm2ofjh6	1056.00	PENDING	CARD_MOCK	\N	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hld5awjjbez92j	cmpzkjdiz00cyd5awbekoflh4	978.00	PAID	CARD_MOCK	2026-05-27 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
cmpzkjdkg00hmd5aw5nywy3w2	cmpzkjdj100d3d5aw1ui69grm	1612.00	PAID	CASH	2026-05-01 08:30:00	2026-06-04 14:06:21.04	2026-06-04 14:06:21.04
\.


--
-- Data for Name: RentalOrder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RentalOrder" (id, "userId", "orderNumber", status, "startDate", "endDate", "deliveryType", "deliveryAddress", "customerComment", "managerComment", subtotal, "depositTotal", "deliveryPrice", "totalPrice", "createdAt", "updatedAt") FROM stdin;
cmpzkjdj100d3d5aw1ui69grm	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0021	COMPLETED	2026-05-01 00:00:00	2026-05-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Техника возвращена и проверена складской командой.	472.00	1140.00	0.00	1612.00	2026-06-04 14:06:20.989	2026-06-04 14:06:20.989
cmpzkjdj200d9d5aw2vl3and5	cmpu216iv000ld5ug1eear6f0	BR-202605-0022	CANCELLED	2026-06-01 00:00:00	2026-06-03 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Заявка отменена по просьбе клиента после изменения графика работ.	330.00	520.00	25.00	875.00	2026-06-04 14:06:20.991	2026-06-04 14:06:20.991
cmpzkjdj300ddd5aw857x7iv3	cmpu216kd000nd5ugzsuleofa	BR-202605-0023	APPROVED	2026-06-05 00:00:00	2026-06-09 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка подтверждена после проверки остатков и контактных данных.	640.00	635.00	0.00	1275.00	2026-06-04 14:06:20.992	2026-06-04 14:06:20.992
cmpzkjdj500did5awp20r4nrn	cmpu216lu000pd5ugwgq7vwpc	BR-202605-0024	PENDING	2026-06-08 00:00:00	2026-06-13 23:59:59.999	DELIVERY	Минск, улица Купревича, 1, сервисный проезд технопарка	Бригада работает только по будням.	\N	1800.00	1530.00	25.00	3355.00	2026-06-04 14:06:20.993	2026-06-04 14:06:20.993
cmpzkjdj700dod5aw5u236win	cmpu2165a0003d5ugp81cvo3c	BR-202605-0025	COMPLETED	2026-05-05 00:00:00	2026-05-10 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Техника возвращена и проверена складской командой.	816.00	680.00	0.00	1496.00	2026-06-04 14:06:20.995	2026-06-04 14:06:20.995
cmpzkjdj800dsd5awbjkbhu2y	cmpu2166y0005d5ugb4frzf2f	BR-202605-0026	REJECTED	2026-06-03 00:00:00	2026-06-04 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Отклонено из-за пересечения с техническим обслуживанием оборудования.	440.00	1160.00	25.00	1625.00	2026-06-04 14:06:20.996	2026-06-04 14:06:20.996
cmpzkjdj900dxd5awkwtmjp8g	cmpu2168h0007d5ugnf2jgise	BR-202605-0027	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1056.00	640.00	0.00	1696.00	2026-06-04 14:06:20.998	2026-06-04 14:06:20.998
cmpzkjdjb00e3d5awjefzbaef	cmpu2169y0009d5ugfhga2ez2	BR-202605-0028	APPROVED	2026-06-04 00:00:00	2026-06-08 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Заявка подтверждена после проверки остатков и контактных данных.	475.00	500.00	25.00	1000.00	2026-06-04 14:06:20.999	2026-06-04 14:06:20.999
cmpzkjdjc00e7d5aw6ueua8bn	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0029	PENDING	2026-06-13 00:00:00	2026-06-18 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	1224.00	1020.00	0.00	2244.00	2026-06-04 14:06:21.001	2026-06-04 14:06:21.001
cmpzkjdjd00ecd5awr3j2ejcq	cmpu216cy000dd5uglc96kk2d	BR-202605-0030	COMPLETED	2026-05-10 00:00:00	2026-05-15 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	Техника возвращена и проверена складской командой.	1392.00	1110.00	25.00	2527.00	2026-06-04 14:06:21.002	2026-06-04 14:06:21.002
cmpzkjdjf00eid5awsb033eko	cmpu216ee000fd5ug53k7bbtd	BR-202605-0031	CANCELLED	2026-06-10 00:00:00	2026-06-11 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Заявка отменена по просьбе клиента после изменения графика работ.	180.00	410.00	0.00	590.00	2026-06-04 14:06:21.003	2026-06-04 14:06:21.003
cmpzkjdjg00emd5aw1rg4cszl	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0032	APPROVED	2026-06-02 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Заявка подтверждена после проверки остатков и контактных данных.	428.00	520.00	25.00	973.00	2026-06-04 14:06:21.005	2026-06-04 14:06:21.005
cmpzkjdji00erd5awch6r5b6r	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0033	ACTIVE	2026-05-26 00:00:00	2026-06-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	784.00	490.00	0.00	1274.00	2026-06-04 14:06:21.006	2026-06-04 14:06:21.006
cmpzkjdjj00exd5awyjxqxgw8	cmpu216iv000ld5ug1eear6f0	BR-202605-0034	COMPLETED	2026-05-14 00:00:00	2026-05-18 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Техника возвращена и проверена складской командой.	120.00	120.00	25.00	265.00	2026-06-04 14:06:21.007	2026-06-04 14:06:21.007
cmpzkjdjk00f1d5awt6kn2rag	cmpu216kd000nd5ugzsuleofa	BR-202605-0035	PENDING	2026-06-09 00:00:00	2026-06-15 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	1050.00	740.00	0.00	1790.00	2026-06-04 14:06:21.009	2026-06-04 14:06:21.009
cmpzkjdhp00acd5aw0sraur01	cmpu2165a0003d5ugp81cvo3c	BR-202605-0001	PENDING	2026-06-05 00:00:00	2026-06-07 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Ожидаем финальное подтверждение по времени получения.	270.00	440.00	0.00	710.00	2026-06-04 14:06:20.941	2026-06-04 14:06:20.941
cmpzkjdi800agd5awazrvc91b	cmpu2166y0005d5ugb4frzf2f	BR-202605-0002	APPROVED	2026-06-02 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Заявка подтверждена после проверки остатков и контактных данных.	344.00	430.00	25.00	799.00	2026-06-04 14:06:20.96	2026-06-04 14:06:20.96
cmpzkjdia00ald5awqza0lsrz	cmpu2168h0007d5ugnf2jgise	BR-202605-0003	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1176.00	740.00	0.00	1916.00	2026-06-04 14:06:20.963	2026-06-04 14:06:20.963
cmpzkjdic00ard5awq8j8sz8e	cmpu2169y0009d5ugfhga2ez2	BR-202605-0004	COMPLETED	2026-04-14 00:00:00	2026-04-18 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Техника возвращена и проверена складской командой.	320.00	320.00	25.00	665.00	2026-06-04 14:06:20.964	2026-06-04 14:06:20.964
cmpzkjdie00avd5awzkr1ujma	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0005	CANCELLED	2026-05-15 00:00:00	2026-05-20 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка отменена по просьбе клиента после изменения графика работ.	1452.00	1180.00	0.00	2632.00	2026-06-04 14:06:20.966	2026-06-04 14:06:20.966
cmpzkjdif00b0d5awsfctdv3z	cmpu216cy000dd5uglc96kk2d	BR-202605-0006	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	\N	1338.00	2270.00	25.00	3633.00	2026-06-04 14:06:20.968	2026-06-04 14:06:20.968
cmpzkjdih00b6d5awuxs4d9ad	cmpu216ee000fd5ug53k7bbtd	BR-202605-0007	APPROVED	2026-06-01 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Заявка подтверждена после проверки остатков и контактных данных.	280.00	360.00	0.00	640.00	2026-06-04 14:06:20.969	2026-06-04 14:06:20.969
cmpzkjdii00bad5awnongckbs	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0008	COMPLETED	2026-04-18 00:00:00	2026-04-21 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Техника возвращена и проверена складской командой.	752.00	930.00	25.00	1707.00	2026-06-04 14:06:20.97	2026-06-04 14:06:20.97
cmpzkjdij00bfd5awnatl9vwo	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0009	ACTIVE	2026-05-26 00:00:00	2026-06-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1240.00	785.00	0.00	2025.00	2026-06-04 14:06:20.972	2026-06-04 14:06:20.972
cmpzkjdil00bld5awczvxesu9	cmpu216iv000ld5ug1eear6f0	BR-202605-0010	REJECTED	2026-06-03 00:00:00	2026-06-08 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Отклонено из-за пересечения с техническим обслуживанием оборудования.	360.00	300.00	25.00	685.00	2026-06-04 14:06:20.973	2026-06-04 14:06:20.973
cmpzkjdim00bpd5aw4zvaaai6	cmpu216kd000nd5ugzsuleofa	BR-202605-0011	PENDING	2026-06-05 00:00:00	2026-06-07 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	762.00	1300.00	0.00	2062.00	2026-06-04 14:06:20.975	2026-06-04 14:06:20.975
cmpzkjdio00bud5awu8uguj67	cmpu216lu000pd5ugwgq7vwpc	BR-202605-0012	APPROVED	2026-06-06 00:00:00	2026-06-09 23:59:59.999	DELIVERY	Минск, улица Купревича, 1, сервисный проезд технопарка	Бригада работает только по будням.	Заявка подтверждена после проверки остатков и контактных данных.	632.00	800.00	25.00	1457.00	2026-06-04 14:06:20.976	2026-06-04 14:06:20.976
cmpzkjdip00c0d5awy8u4nzk0	cmpu2165a0003d5ugp81cvo3c	BR-202605-0013	COMPLETED	2026-04-23 00:00:00	2026-04-26 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Техника возвращена и проверена складской командой.	272.00	330.00	0.00	602.00	2026-06-04 14:06:20.978	2026-06-04 14:06:20.978
cmpzkjdir00c4d5aw8pd7stxh	cmpu2166y0005d5ugb4frzf2f	BR-202605-0014	CANCELLED	2026-05-24 00:00:00	2026-05-28 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Заявка отменена по просьбе клиента после изменения графика работ.	930.00	930.00	25.00	1885.00	2026-06-04 14:06:20.979	2026-06-04 14:06:20.979
cmpzkjdis00c9d5aw1pfqbi1c	cmpu2168h0007d5ugnf2jgise	BR-202605-0015	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1736.00	1180.00	0.00	2916.00	2026-06-04 14:06:20.98	2026-06-04 14:06:20.98
cmpzkjdit00cfd5awlr9i36kn	cmpu2169y0009d5ugfhga2ez2	BR-202605-0016	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Ожидаем финальное подтверждение по времени получения.	144.00	240.00	25.00	409.00	2026-06-04 14:06:20.982	2026-06-04 14:06:20.982
cmpzkjdiv00cjd5awz2ta42vq	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0017	APPROVED	2026-06-05 00:00:00	2026-06-08 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка подтверждена после проверки остатков и контактных данных.	248.00	290.00	0.00	538.00	2026-06-04 14:06:20.983	2026-06-04 14:06:20.983
cmpzkjdiw00cod5aw89zg8vfl	cmpu216cy000dd5uglc96kk2d	BR-202605-0018	COMPLETED	2026-04-28 00:00:00	2026-05-01 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	Техника возвращена и проверена складской командой.	968.00	1170.00	25.00	2163.00	2026-06-04 14:06:20.985	2026-06-04 14:06:20.985
cmpzkjdiy00cud5awqm2ofjh6	cmpu216ee000fd5ug53k7bbtd	BR-202605-0019	PENDING	2026-06-13 00:00:00	2026-06-18 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Ожидаем финальное подтверждение по времени получения.	576.00	480.00	0.00	1056.00	2026-06-04 14:06:20.986	2026-06-04 14:06:20.986
cmpzkjdiz00cyd5awbekoflh4	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0020	ACTIVE	2026-05-27 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Аренда в процессе, оборудование зарезервировано за клиентом.	553.00	400.00	25.00	978.00	2026-06-04 14:06:20.987	2026-06-04 14:06:20.987
\.


--
-- Data for Name: RentalOrderItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RentalOrderItem" (id, "rentalOrderId", "equipmentId", quantity, "dailyPrice", "daysCount", "lineTotal", "createdAt") FROM stdin;
cmpzkjdhp00aed5awijufo8fq	cmpzkjdhp00acd5aw0sraur01	cmpu216mb0010d5ugzabpsrkm	2	45.00	3	710.00	2026-06-04 14:06:20.941
cmpzkjdi800aid5aw0l3qyruv	cmpzkjdi800agd5awazrvc91b	cmpu216mp0014d5ugu0lz927j	1	48.00	4	432.00	2026-06-04 14:06:20.96
cmpzkjdi800ajd5awjhqsgygh	cmpzkjdi800agd5awazrvc91b	cmpu216mw001id5ughgbdbbke	1	38.00	4	342.00	2026-06-04 14:06:20.96
cmpzkjdia00and5awinmcfjk4	cmpzkjdia00ald5awqza0lsrz	cmpu216ms001ad5ugemfo87rh	1	35.00	8	460.00	2026-06-04 14:06:20.963
cmpzkjdia00aod5awotnumcci	cmpzkjdia00ald5awqza0lsrz	cmpu216my001md5ugh8znvup9	1	44.00	8	572.00	2026-06-04 14:06:20.963
cmpzkjdia00apd5awpoarz5g9	cmpzkjdia00ald5awqza0lsrz	cmpu216n6001yd5ugu0fr6hvo	1	68.00	8	884.00	2026-06-04 14:06:20.963
cmpzkjdic00atd5aw74wni97r	cmpzkjdic00ard5awq8j8sz8e	cmpu216mu001ed5ug5aodaewy	2	32.00	5	640.00	2026-06-04 14:06:20.964
cmpzkjdie00axd5aws9dggm8y	cmpzkjdie00avd5awzkr1ujma	cmpu216mx001kd5ug4h49hfpn	2	55.00	6	1180.00	2026-06-04 14:06:20.966
cmpzkjdie00ayd5awb8hfcj20	cmpzkjdie00avd5awzkr1ujma	cmpu216n5001wd5ugfjewtyji	2	66.00	6	1452.00	2026-06-04 14:06:20.966
cmpzkjdif00b2d5awji5q5ec9	cmpzkjdif00b0d5awsfctdv3z	cmpu216mz001od5ug0u5b0jol	2	46.00	3	706.00	2026-06-04 14:06:20.968
cmpzkjdif00b3d5awrlbx66xo	cmpzkjdif00b0d5awsfctdv3z	cmpu216n80022d5ug8rmjz67e	2	82.00	3	1332.00	2026-06-04 14:06:20.968
cmpzkjdif00b4d5aw4fnck7b5	cmpzkjdif00b0d5awsfctdv3z	cmpu216ne002ed5ug1748imv1	2	95.00	3	1570.00	2026-06-04 14:06:20.968
cmpzkjdih00b8d5awikbppyz1	cmpzkjdih00b6d5awuxs4d9ad	cmpu216n4001ud5ugmt8r8aee	1	70.00	4	640.00	2026-06-04 14:06:20.969
cmpzkjdii00bcd5aw1cyl3hxc	cmpzkjdii00bad5awnongckbs	cmpu216n6001yd5ugu0fr6hvo	2	68.00	4	1224.00	2026-06-04 14:06:20.97
cmpzkjdii00bdd5awwove9it8	cmpzkjdii00bad5awnongckbs	cmpu216nd002cd5ug21i5wbkv	2	26.00	4	458.00	2026-06-04 14:06:20.97
cmpzkjdij00bhd5awa05kveeh	cmpzkjdij00bfd5awnatl9vwo	cmpu216n90024d5ugqss61ynu	1	28.00	8	364.00	2026-06-04 14:06:20.972
cmpzkjdij00bid5awq4gtdc5w	cmpzkjdij00bfd5awnatl9vwo	cmpu216nf002gd5ugzceozmj9	1	82.00	8	1096.00	2026-06-04 14:06:20.972
cmpzkjdij00bjd5awmcu8r03j	cmpzkjdij00bfd5awnatl9vwo	cmpu216nn002wd5ugx53nijsp	1	45.00	8	565.00	2026-06-04 14:06:20.972
cmpzkjdil00bnd5awrhmh5eka	cmpzkjdil00bld5awczvxesu9	cmpu216nb0028d5ugquezq4xy	2	30.00	6	660.00	2026-06-04 14:06:20.973
cmpzkjdim00brd5awiz99q0j3	cmpzkjdim00bpd5aw4zvaaai6	cmpu216ne002ed5ug1748imv1	2	95.00	3	1570.00	2026-06-04 14:06:20.975
cmpzkjdim00bsd5aw9tgsfg0f	cmpzkjdim00bpd5aw4zvaaai6	cmpu216nl002sd5uga8ohegg9	2	32.00	3	492.00	2026-06-04 14:06:20.975
cmpzkjdio00bwd5awcm1b4ed8	cmpzkjdio00bud5awu8uguj67	cmpu216ng002id5ug3p3xiw19	1	88.00	4	812.00	2026-06-04 14:06:20.976
cmpzkjdio00bxd5aw66jar28y	cmpzkjdio00bud5awu8uguj67	cmpu216no002yd5ugw5q3lswn	1	58.00	4	512.00	2026-06-04 14:06:20.976
cmpzkjdio00byd5awbnkmlxge	cmpzkjdio00bud5awu8uguj67	cmpu216nu003cd5ugz8tfmbiy	1	12.00	4	108.00	2026-06-04 14:06:20.976
cmpzkjdip00c2d5awyely3337	cmpzkjdip00c0d5awy8u4nzk0	cmpu216nj002qd5ug3rjdm07r	2	34.00	4	602.00	2026-06-04 14:06:20.978
cmpzkjdir00c6d5awwkfh1u7o	cmpzkjdir00c4d5aw8pd7stxh	cmpu216nn002wd5ugx53nijsp	2	45.00	5	860.00	2026-06-04 14:06:20.979
cmpzkjdir00c7d5awbmgceupw	cmpzkjdir00c4d5aw8pd7stxh	cmpu216nt003ad5ugcgyrtsjo	2	48.00	5	1000.00	2026-06-04 14:06:20.979
cmpzkjdis00cbd5awio941usf	cmpzkjdis00c9d5aw1pfqbi1c	cmpu216np0030d5ugfq63q4af	1	62.00	8	796.00	2026-06-04 14:06:20.98
cmpzkjdis00ccd5aweomto3p9	cmpzkjdis00c9d5aw1pfqbi1c	cmpu216nx003gd5ug6jpvmysq	1	120.00	8	1660.00	2026-06-04 14:06:20.98
cmpzkjdis00cdd5aw9dbq3j2w	cmpzkjdis00c9d5aw1pfqbi1c	cmpu216ms001ad5ugemfo87rh	1	35.00	8	460.00	2026-06-04 14:06:20.98
cmpzkjdit00chd5awwpg3ueaw	cmpzkjdit00cfd5awlr9i36kn	cmpu216ns0038d5ugivrykrme	2	24.00	3	384.00	2026-06-04 14:06:20.982
cmpzkjdiv00cld5awclvv58es	cmpzkjdiv00cjd5awz2ta42vq	cmpu216nu003cd5ugz8tfmbiy	1	12.00	4	108.00	2026-06-04 14:06:20.983
cmpzkjdiv00cmd5aw9afcgerg	cmpzkjdiv00cjd5awz2ta42vq	cmpu216mr0018d5ugf6vg3q9u	1	50.00	4	430.00	2026-06-04 14:06:20.983
cmpzkjdiw00cqd5aw9wok1eoy	cmpzkjdiw00cod5aw89zg8vfl	cmpu216mb0010d5ugzabpsrkm	2	45.00	4	800.00	2026-06-04 14:06:20.985
cmpzkjdiw00crd5aw157akrz6	cmpzkjdiw00cod5aw89zg8vfl	cmpu216mt001cd5ug9xa7nqhf	2	30.00	4	540.00	2026-06-04 14:06:20.985
cmpzkjdiw00csd5awsch0m7vf	cmpzkjdiw00cod5aw89zg8vfl	cmpu216mz001od5ug0u5b0jol	2	46.00	4	798.00	2026-06-04 14:06:20.985
cmpzkjdiy00cwd5awri7kyp7v	cmpzkjdiy00cud5awqm2ofjh6	cmpu216mp0014d5ugu0lz927j	2	48.00	6	1056.00	2026-06-04 14:06:20.986
cmpzkjdiz00d0d5aw06iqfd4m	cmpzkjdiz00cyd5awbekoflh4	cmpu216ms001ad5ugemfo87rh	1	35.00	7	425.00	2026-06-04 14:06:20.987
cmpzkjdiz00d1d5awacw3cfv1	cmpzkjdiz00cyd5awbekoflh4	cmpu216my001md5ugh8znvup9	1	44.00	7	528.00	2026-06-04 14:06:20.987
cmpzkjdj100d5d5awsfo8hhid	cmpzkjdj100d3d5aw1ui69grm	cmpu216mu001ed5ug5aodaewy	2	32.00	2	448.00	2026-06-04 14:06:20.989
cmpzkjdj100d6d5aw0ctygyvp	cmpzkjdj100d3d5aw1ui69grm	cmpu216n2001sd5ugmcaje11z	2	58.00	2	772.00	2026-06-04 14:06:20.989
cmpzkjdj100d7d5awafuxlvtx	cmpzkjdj100d3d5aw1ui69grm	cmpu216n90024d5ugqss61ynu	2	28.00	2	392.00	2026-06-04 14:06:20.989
cmpzkjdj200dbd5awma5hv3fc	cmpzkjdj200d9d5aw2vl3and5	cmpu216mx001kd5ug4h49hfpn	2	55.00	3	850.00	2026-06-04 14:06:20.991
cmpzkjdj300dfd5aw11mswql8	cmpzkjdj300ddd5aw857x7iv3	cmpu216mz001od5ug0u5b0jol	1	46.00	5	445.00	2026-06-04 14:06:20.992
cmpzkjdj400dgd5awptwr8idf	cmpzkjdj300ddd5aw857x7iv3	cmpu216n80022d5ug8rmjz67e	1	82.00	5	830.00	2026-06-04 14:06:20.992
cmpzkjdj500dkd5awkhe1yvlp	cmpzkjdj500did5awp20r4nrn	cmpu216n4001ud5ugmt8r8aee	2	70.00	6	1560.00	2026-06-04 14:06:20.993
cmpzkjdj500dld5aw9cj49hb1	cmpzkjdj500did5awp20r4nrn	cmpu216na0026d5uggtjk00n5	2	36.00	6	782.00	2026-06-04 14:06:20.993
cmpzkjdj500dmd5awyiabpkxr	cmpzkjdj500did5awp20r4nrn	cmpu216ng002id5ug3p3xiw19	1	88.00	6	988.00	2026-06-04 14:06:20.993
cmpzkjdj700dqd5awrvk4zyac	cmpzkjdj700dod5aw5u236win	cmpu216n6001yd5ugu0fr6hvo	2	68.00	6	1496.00	2026-06-04 14:06:20.995
cmpzkjdj800dud5awgnsl41fp	cmpzkjdj800dsd5awbjkbhu2y	cmpu216n90024d5ugqss61ynu	2	28.00	2	392.00	2026-06-04 14:06:20.996
cmpzkjdj800dvd5awh0vlb0mi	cmpzkjdj800dsd5awbjkbhu2y	cmpu216nf002gd5ugzceozmj9	2	82.00	2	1208.00	2026-06-04 14:06:20.996
cmpzkjdj900dzd5aw5e1jxaby	cmpzkjdj900dxd5awkwtmjp8g	cmpu216nb0028d5ugquezq4xy	1	30.00	8	390.00	2026-06-04 14:06:20.998
cmpzkjdj900e0d5awm4ljoirs	cmpzkjdj900dxd5awkwtmjp8g	cmpu216ni002od5ugcfr8ytc8	1	40.00	8	510.00	2026-06-04 14:06:20.998
cmpzkjdj900e1d5aw42aoj8gi	cmpzkjdj900dxd5awkwtmjp8g	cmpu216np0030d5ugfq63q4af	1	62.00	8	796.00	2026-06-04 14:06:20.998
cmpzkjdjb00e5d5awuon5ycl1	cmpzkjdjb00e3d5awjefzbaef	cmpu216ne002ed5ug1748imv1	1	95.00	5	975.00	2026-06-04 14:06:20.999
cmpzkjdjc00e9d5aw4gxyyh01	cmpzkjdjc00e7d5aw6ueua8bn	cmpu216ng002id5ug3p3xiw19	1	88.00	6	988.00	2026-06-04 14:06:21.001
cmpzkjdjc00ead5awaa3rw5ib	cmpzkjdjc00e7d5aw6ueua8bn	cmpu216no002yd5ugw5q3lswn	2	58.00	6	1256.00	2026-06-04 14:06:21.001
cmpzkjdjd00eed5awo369ojs6	cmpzkjdjd00ecd5awr3j2ejcq	cmpu216nj002qd5ug3rjdm07r	2	34.00	6	738.00	2026-06-04 14:06:21.002
cmpzkjdjd00efd5aws99ul5dc	cmpzkjdjd00ecd5awr3j2ejcq	cmpu216nq0032d5ugzw6k0y5s	2	37.00	6	784.00	2026-06-04 14:06:21.002
cmpzkjdjd00egd5awqt91wlov	cmpzkjdjd00ecd5awr3j2ejcq	cmpu216mb0010d5ugzabpsrkm	2	45.00	6	980.00	2026-06-04 14:06:21.002
cmpzkjdjf00ekd5awznkt0n7h	cmpzkjdjf00eid5awsb033eko	cmpu216nn002wd5ugx53nijsp	2	45.00	2	590.00	2026-06-04 14:06:21.003
cmpzkjdjg00eod5awb0rv8vcn	cmpzkjdjg00emd5aw1rg4cszl	cmpu216np0030d5ugfq63q4af	1	62.00	4	548.00	2026-06-04 14:06:21.005
cmpzkjdjg00epd5awaasqqnv1	cmpzkjdjg00emd5aw1rg4cszl	cmpu216mb0010d5ugzabpsrkm	1	45.00	4	400.00	2026-06-04 14:06:21.005
cmpzkjdji00etd5aw9do2ayw6	cmpzkjdji00erd5awch6r5b6r	cmpu216ns0038d5ugivrykrme	1	24.00	8	312.00	2026-06-04 14:06:21.006
cmpzkjdji00eud5awn626jkyi	cmpzkjdji00erd5awch6r5b6r	cmpu216mo0012d5ugujtqybh2	1	42.00	8	546.00	2026-06-04 14:06:21.006
cmpzkjdji00evd5awg3laz911	cmpzkjdji00erd5awch6r5b6r	cmpu216mu001ed5ug5aodaewy	1	32.00	8	416.00	2026-06-04 14:06:21.006
cmpzkjdjj00ezd5awp9fzwrjq	cmpzkjdjj00exd5awyjxqxgw8	cmpu216nu003cd5ugz8tfmbiy	2	12.00	5	240.00	2026-06-04 14:06:21.007
cmpzkjdjk00f3d5awbex7ikj8	cmpzkjdjk00f1d5awt6kn2rag	cmpu216mb0010d5ugzabpsrkm	2	45.00	7	1070.00	2026-06-04 14:06:21.009
cmpzkjdjk00f4d5aw6cq8dc8k	cmpzkjdjk00f1d5awt6kn2rag	cmpu216mt001cd5ug9xa7nqhf	2	30.00	7	720.00	2026-06-04 14:06:21.009
\.


--
-- Data for Name: Report; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Report" (id, "userId", "rentalOrderId", type, format, title, "fileUrl", "createdAt") FROM stdin;
cmpzkjdks00hnd5awudmzazq0	cmpu2165a0003d5ugp81cvo3c	cmpzkjdhp00acd5aw0sraur01	ORDER_DOCUMENT	PDF	Документ по заявке BR-202605-0001	\N	2026-06-04 14:06:21.053
cmpzkjdks00hod5awmv3rux31	cmpu2166y0005d5ugb4frzf2f	cmpzkjdi800agd5awazrvc91b	ORDER_DOCUMENT	DOCX	Документ по заявке BR-202605-0002	\N	2026-06-04 14:06:21.053
cmpzkjdks00hpd5awpx3ew0x9	cmpu2168h0007d5ugnf2jgise	cmpzkjdia00ald5awqza0lsrz	ORDER_DOCUMENT	PDF	Документ по заявке BR-202605-0003	\N	2026-06-04 14:06:21.053
cmpzkjdks00hqd5awj98naaly	cmpu2169y0009d5ugfhga2ez2	cmpzkjdic00ard5awq8j8sz8e	ORDER_DOCUMENT	DOCX	Документ по заявке BR-202605-0004	\N	2026-06-04 14:06:21.053
cmpzkjdks00hrd5awz6g7we6n	cmpu2165a0003d5ugp81cvo3c	\N	RENTAL_HISTORY	PDF	История аренды: Иван Петров	\N	2026-06-04 14:06:21.053
cmpzkjdks00hsd5aw3yrqedur	cmpu2166y0005d5ugb4frzf2f	\N	RENTAL_HISTORY	DOCX	История аренды: Павел Сидоров	\N	2026-06-04 14:06:21.053
cmpzkjdks00htd5awqc8fnwrj	cmpu2168h0007d5ugnf2jgise	\N	RENTAL_HISTORY	PDF	История аренды: Андрей Козлов	\N	2026-06-04 14:06:21.053
cmpzkjdks00hud5aw4zvyw2ru	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	PDF	Статистика аренды за квартал	\N	2026-06-04 14:06:21.053
cmpzkjdks00hvd5awlw5jd5ru	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	DOCX	Статистика аренды: подробная выгрузка	\N	2026-06-04 14:06:21.053
cmpzkjdkt00hwd5awmrvkjjjg	cmptsbj0u0003d500lnh8bwp8	\N	EQUIPMENT_UTILIZATION	PDF	Сводка по использованию оборудования	\N	2026-06-04 14:06:21.053
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Review" (id, "userId", "equipmentId", rating, text, "isPublished", "createdAt", "updatedAt") FROM stdin;
cmpzkjdjw00fzd5awts5kt85p	cmpu2165a0003d5ugp81cvo3c	cmpu216mb0010d5ugzabpsrkm	3	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	f	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g0d5aw4nxsgbcl	cmpu2166y0005d5ugb4frzf2f	cmpu216mr0018d5ugf6vg3q9u	4	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g1d5awoukgn4ea	cmpu2168h0007d5ugnf2jgise	cmpu216mv001gd5ugfa8f7hth	5	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g2d5aw09bkrctz	cmpu2169y0009d5ugfhga2ez2	cmpu216n0001qd5ugicavws33	3	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g3d5awxbieeizo	cmpu216bg000bd5ugd2qb3qvf	cmpu216n6001yd5ugu0fr6hvo	4	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g4d5aw5q0cbhgj	cmpu216cy000dd5uglc96kk2d	cmpu216na0026d5uggtjk00n5	5	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	f	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g5d5awuptghnkq	cmpu216ee000fd5ug53k7bbtd	cmpu216nf002gd5ugzceozmj9	3	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g6d5awqp1dceez	cmpu216fw000hd5ug1jlu1bgl	cmpu216nj002qd5ug3rjdm07r	4	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g7d5awi0v9mj94	cmpu216hd000jd5ugc1fzmsz3	cmpu216no002yd5ugw5q3lswn	5	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g8d5awf9ryerw0	cmpu216iv000ld5ug1eear6f0	cmpu216nt003ad5ugcgyrtsjo	3	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00g9d5aw2ni48wud	cmpu216kd000nd5ugzsuleofa	cmpu216mb0010d5ugzabpsrkm	4	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	f	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00gad5aw7eigc1tb	cmpu216lu000pd5ugwgq7vwpc	cmpu216mr0018d5ugf6vg3q9u	5	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00gbd5awkdzvxfp3	cmpu2165a0003d5ugp81cvo3c	cmpu216mw001id5ughgbdbbke	3	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00gcd5awubihpy4m	cmpu2166y0005d5ugb4frzf2f	cmpu216n0001qd5ugicavws33	4	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00gdd5aw4099ru7u	cmpu2168h0007d5ugnf2jgise	cmpu216n6001yd5ugu0fr6hvo	5	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00ged5awxqts8y57	cmpu2169y0009d5ugfhga2ez2	cmpu216nb0028d5ugquezq4xy	3	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	f	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00gfd5aw2nz53not	cmpu216bg000bd5ugd2qb3qvf	cmpu216nf002gd5ugzceozmj9	4	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00ggd5awdgi9zmur	cmpu216cy000dd5uglc96kk2d	cmpu216nj002qd5ug3rjdm07r	5	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00ghd5aw26qf2ktl	cmpu216ee000fd5ug53k7bbtd	cmpu216np0030d5ugfq63q4af	3	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00gid5awv8wcm2bc	cmpu216fw000hd5ug1jlu1bgl	cmpu216nt003ad5ugcgyrtsjo	4	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjw00gjd5awkdy9agh1	cmpu216hd000jd5ugc1fzmsz3	cmpu216mb0010d5ugzabpsrkm	5	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	f	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gkd5awwm4p2s6t	cmpu216iv000ld5ug1eear6f0	cmpu216ms001ad5ugemfo87rh	3	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gld5awv7a3cwgq	cmpu216kd000nd5ugzsuleofa	cmpu216mw001id5ughgbdbbke	4	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gmd5aw7wssn5d3	cmpu216lu000pd5ugwgq7vwpc	cmpu216n0001qd5ugicavws33	5	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gnd5aw3vunjwbk	cmpu2165a0003d5ugp81cvo3c	cmpu216n70020d5ugl2fz23t1	3	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00god5awz8mxto4e	cmpu2166y0005d5ugb4frzf2f	cmpu216nb0028d5ugquezq4xy	4	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	f	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gpd5awm3lbcnpl	cmpu2168h0007d5ugnf2jgise	cmpu216nf002gd5ugzceozmj9	5	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gqd5aw0rfthgkf	cmpu2169y0009d5ugfhga2ez2	cmpu216nl002sd5uga8ohegg9	3	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00grd5awrkukeihb	cmpu216bg000bd5ugd2qb3qvf	cmpu216np0030d5ugfq63q4af	4	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gsd5awwxacfqfb	cmpu216cy000dd5uglc96kk2d	cmpu216nt003ad5ugcgyrtsjo	5	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gtd5awt4yqgq79	cmpu216ee000fd5ug53k7bbtd	cmpu216mo0012d5ugujtqybh2	3	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	f	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gud5aw0hi8magv	cmpu216fw000hd5ug1jlu1bgl	cmpu216ms001ad5ugemfo87rh	4	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gvd5awoesj3zwb	cmpu216hd000jd5ugc1fzmsz3	cmpu216mw001id5ughgbdbbke	5	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gwd5awq8di8whp	cmpu216iv000ld5ug1eear6f0	cmpu216n2001sd5ugmcaje11z	3	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gxd5aw1d79qv1o	cmpu216kd000nd5ugzsuleofa	cmpu216n70020d5ugl2fz23t1	4	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gyd5awtirlwc6r	cmpu216lu000pd5ugwgq7vwpc	cmpu216nb0028d5ugquezq4xy	5	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	f	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00gzd5awdrv5jvsq	cmpu2165a0003d5ugp81cvo3c	cmpu216ng002id5ug3p3xiw19	3	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00h0d5aw8gy4cjia	cmpu2166y0005d5ugb4frzf2f	cmpu216nl002sd5uga8ohegg9	4	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00h1d5awz9xo6ocr	cmpu2168h0007d5ugnf2jgise	cmpu216np0030d5ugfq63q4af	5	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
cmpzkjdjx00h2d5awn9u5qkqa	cmpu2169y0009d5ugfhga2ez2	cmpu216nu003cd5ugz8tfmbiy	3	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-04 14:06:21.021	2026-06-04 14:06:21.021
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Role" (id, name, description, "createdAt", "updatedAt") FROM stdin;
cmptsbiyi0000d50016vfokjh	ADMIN	Administrator with full platform access	2026-05-31 12:57:34.651	2026-06-04 14:06:19.987
cmptsbiyx0001d500il354zhy	CLIENT	Client who can browse catalog and place rental orders	2026-05-31 12:57:34.666	2026-06-04 14:06:20.005
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, "fullName", email, phone, "passwordHash", "avatarUrl", "roleId", "isBlocked", "createdAt", "updatedAt") FROM stdin;
cmpu2168h0007d5ugnf2jgise	Андрей Козлов	andrei.kozlov@buildrent.local	+375291110103	$2b$10$c69GW2sfPI4ZTNU1ZY/2FeFowmL8f38ZD03/0WH7IleXUwlM.TTHa	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.762	2026-06-04 14:06:20.227
cmpu2169y0009d5ugfhga2ez2	Максим Морозов	maksim.morozov@buildrent.local	+375291110104	$2b$10$HNBFVC77uxiGrrgE6jArT.SAeUlU69NBL9padw6O.FX/QDvxK6BYO	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.815	2026-06-04 14:06:20.281
cmpu216bg000bd5ugd2qb3qvf	Сергей Волков	sergei.volkov@buildrent.local	+375291110105	$2b$10$8Qn.Y2Xq1mtkESM4JLvpxuAmo96XXP4ZW0U5zwS59wRrKo.6TbGau	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.869	2026-06-04 14:06:20.337
cmpu216cy000dd5uglc96kk2d	Никита Федоров	nikita.fedorov@buildrent.local	+375291110106	$2b$10$qIHEI2oSrboC4p1JBmBD9e/t7htSmYBFZUWreApUcwZaAZqXi0cIy	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.922	2026-06-04 14:06:20.393
cmpu216ee000fd5ug53k7bbtd	Кирилл Смирнов	kirill.smirnov@buildrent.local	+375291110107	$2b$10$1GOsl2O2HXeNp4q5PudLfeO/fFXkga76yX1EcLTn9RPFP2lAuyH/6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.974	2026-06-04 14:06:20.449
cmptsbj0u0003d500lnh8bwp8	Администратор BuildRent	admin@buildrent.local	\N	$2b$10$6wKByAGLRGaF8.GjBjZK5e8VcLYPLHG303nb4d0N3fj0cdc9ANVqK	\N	cmptsbiyi0000d50016vfokjh	f	2026-05-31 12:57:34.734	2026-06-04 14:06:20.062
cmpu2165a0003d5ugp81cvo3c	Иван Петров	ivan.petrov@buildrent.local	+375291110101	$2b$10$7meyZDDAYB5Aqtb1Lrh/gOVVHBlsL5Wp1bHAjYdtY2eg5IA.2sNQa	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.647	2026-06-04 14:06:20.118
cmpu216fw000hd5ug1jlu1bgl	Артём Васильев	artem.vasilev@buildrent.local	+375291110108	$2b$10$sjfw8TevYeZY/x2otUc5iugUmeutkYFKaSrQUjqat/mqrmWI6CaaK	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.028	2026-06-04 14:06:20.505
cmpu2166y0005d5ugb4frzf2f	Павел Сидоров	pavel.sidorov@buildrent.local	+375291110102	$2b$10$xRZwOYjOLPBoyEqTC1XXPuHdAsWIfak49DXOZz.xOFpYaYn6V79LG	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.706	2026-06-04 14:06:20.172
cmpu216hd000jd5ugc1fzmsz3	Роман Егоров	roman.egorov@buildrent.local	+375291110109	$2b$10$R3X6zMI7sq9Ncx.8lEjYO.YHzJoTW/iB02buxGLaIEkhwoxzTAp9a	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.081	2026-06-04 14:06:20.561
cmpu216iv000ld5ug1eear6f0	Денис Зайцев	denis.zaitsev@buildrent.local	+375291110110	$2b$10$kxFKnDufD9oiaaUibvDTmeRBK6ZpLS4fX3Fog6malbmlOlXrqSRSq	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.135	2026-06-04 14:06:20.617
cmpu216kd000nd5ugzsuleofa	Алексей Орлов	alexey.orlov@buildrent.local	+375291110111	$2b$10$lf/TveqLbG8AbnysIloV8ekF47Z5M1UtThjIyBSNr1roiRPeBzQlS	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.189	2026-06-04 14:06:20.672
cmpu216lu000pd5ugwgq7vwpc	Михаил Никитин	mikhail.nikitin@buildrent.local	+375291110112	$2b$10$4fC2sBOdFinIYnUo3dPBFOHz9A/3.egoZV6PrGgHjFI4quTfe2Oz6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.242	2026-06-04 14:06:20.727
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

\unrestrict nRhf7fKSkTfrAHLhmiDXkCTiwnTPkSXFfbcNRcFvlYPiNKR2YgMueqTdYypREhk

