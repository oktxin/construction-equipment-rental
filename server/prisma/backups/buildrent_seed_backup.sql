--
-- PostgreSQL database dump
--

\restrict maGloEhL2bSbyOuffrc69KlYFP7GkVnXAAgrZKCrpPZ3cRcWs1zzPM93aqM4QJV

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
cmpu216lv000qd5ug2gknqrpl	Отбойные молотки	demolition-hammers	Тяжёлый ударный инструмент для бетона, кирпича и демонтажных работ.	hammer	2026-05-31 17:29:28.243	2026-06-02 14:34:30.977
cmpu216ly000rd5ugoikci2z9	Бетономешалки	concrete-mixers	Мобильные и площадочные бетономешалки для отделки, кладки и монолитных задач.	drum	2026-05-31 17:29:28.246	2026-06-02 14:34:30.978
cmpu216lz000sd5uggdgeivpe	Виброплиты	plate-compactors	Оборудование для уплотнения оснований, обратной засыпки и благоустройства.	layers	2026-05-31 17:29:28.247	2026-06-02 14:34:30.979
cmpu216lz000td5ugoif653lw	Генераторы	generators	Источники питания для площадок без постоянного электричества и резервных сценариев.	zap	2026-05-31 17:29:28.248	2026-06-02 14:34:30.979
cmpu216m0000ud5ugsxqx7qjc	Компрессоры	compressors	Воздушное оборудование для пневмоинструмента, покраски и сервисных работ.	wind	2026-05-31 17:29:28.248	2026-06-02 14:34:30.98
cmpu216m1000vd5ugsj97c7bk	Вышки и леса	scaffolding-towers	Безопасные системы доступа для фасадных, отделочных и внутренних работ.	building-2	2026-05-31 17:29:28.249	2026-06-02 14:34:30.981
cmpu216m1000wd5ugbjiikzj5	Сварочное оборудование	welding-equipment	Инверторы и комплектующие для металлоконструкций, ремонта и монтажа.	wrench	2026-05-31 17:29:28.25	2026-06-02 14:34:30.981
cmpu216m2000xd5ugd6z7247i	Пилы и резчики	saws-cutters	Инструменты для резки металла, камня, железобетона и асфальта.	disc-3	2026-05-31 17:29:28.25	2026-06-02 14:34:30.982
cmpu216m2000yd5ugjmxha24a	Измерительный инструмент	measuring-tools	Точная техника для разметки, нивелирования и контроля качества на объекте.	ruler	2026-05-31 17:29:28.251	2026-06-02 14:34:30.983
\.


--
-- Data for Name: Equipment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Equipment" (id, "categoryId", name, slug, "shortDescription", description, brand, model, "dailyPrice", "depositAmount", "quantityTotal", "quantityAvailable", power, weight, status, "isFeatured", "createdAt", "updatedAt") FROM stdin;
cmpu216mx001kd5ug4h49hfpn	cmpu216lz000sd5uggdgeivpe	Wacker Neuson VP1550AW	wacker-neuson-vp1550aw	Профессиональный виброплита для подготовки основания тротуарной плитки и ремонта ямочного покрытия.	Надежный уплотнитель для тротуаров, засыпки траншей и плотного гранулированного основания на городских строительных площадках.	Wacker Neuson	VP1550AW	55.00	260.00	4	4	3.60	90.00	AVAILABLE	t	2026-05-31 17:29:28.282	2026-06-02 14:34:30.999
cmpu216mp0014d5ugu0lz927j	cmpu216lv000qd5ug2gknqrpl	DeWalt D25902K Breaker	dewalt-d25902k	Тяжелый отбойный молоток для снятия плит и разборки кирпича.	Мощный отбойный молоток для бригад по сносу, работающих на армированных плитах, каналах и стенах из плотной кладки.	DeWalt	D25902K	48.00	240.00	4	3	1.55	10.50	AVAILABLE	f	2026-05-31 17:29:28.273	2026-06-02 14:34:30.991
cmpu216mt001cd5ug9xa7nqhf	cmpu216ly000rd5ugoikci2z9	Zitrek B1510 FK Mixer	zitrek-b1510-fk	Полевой миксер для бригад по внутренней отделке и ландшафтному дизайну.	Практичный электрический миксер для подготовки площадки, закладки небольшого фундамента и отделочных работ по бетону.	Zitrek	B1510 FK	30.00	150.00	5	5	0.70	58.00	AVAILABLE	f	2026-05-31 17:29:28.278	2026-06-02 14:34:30.995
cmpu216mu001ed5ug5aodaewy	cmpu216ly000rd5ugoikci2z9	Sturm CM20160 Concrete Mixer	sturm-cm20160	Смеситель среднего размера для заливки кладки и наружных работ.	Идеально подходит для строителей, которым необходима стабильная производительность при изготовлении столбов забора, тротуарной плитки и расширений плит.	Sturm	CM20160	32.00	160.00	4	3	0.80	65.00	AVAILABLE	f	2026-05-31 17:29:28.279	2026-06-02 14:34:30.996
cmpu216my001md5ugh8znvup9	cmpu216lz000sd5uggdgeivpe	Huter VP-90 Plate Compactor	huter-vp-90	Универсальный уплотнитель для дорожек, бордюров и подъездных дорожек.	Компактное устройство для бригад, которым необходимо быстрое перемещение между ландшафтными работами и небольшими строительными задачами.	Huter	VP-90	44.00	220.00	5	3	4.80	88.00	AVAILABLE	f	2026-05-31 17:29:28.283	2026-06-02 14:34:31.001
cmpu216mz001od5ug0u5b0jol	cmpu216lz000sd5uggdgeivpe	Champion PC9045FH	champion-pc9045fh	Уплотнитель площадки для укладки брусчатки и засыпки траншей.	Стабильный уплотнитель со складной ручкой для транспортировки, подходящий для ландшафтных бригад и подрядчиков по укладке дорожного покрытия.	Champion	PC9045FH	46.00	215.00	4	3	4.10	92.00	AVAILABLE	f	2026-05-31 17:29:28.284	2026-06-02 14:34:31.002
cmpu216mv001gd5ugfa8f7hth	cmpu216ly000rd5ugoikci2z9	RedVerg RD-CM180	redverg-rd-cm180	Миксер на данный момент зарезервирован из публичной аренды в связи с диагностикой двигателя.	Высокопроизводительный миксер ожидает диагностики после предупреждения о перегреве двигателя во время длительной заливки в жилом помещении.	RedVerg	RD-CM180	34.00	170.00	3	0	0.90	72.00	UNAVAILABLE	f	2026-05-31 17:29:28.28	2026-06-02 14:34:30.997
cmpu216mb0010d5ugzabpsrkm	cmpu216lv000qd5ug2gknqrpl	Bosch GBH 8-45 DV Rotary Hammer	bosch-gbh-8-45dv	Профессиональный молоток SDS-max для сверления анкеров и тяжелого долбления.	Надежный перфоратор для фасадных работ, проемов и сверления железобетона на активных строительных площадках.	Bosch	GBH 8-45 DV	45.00	220.00	5	4	1.50	8.90	AVAILABLE	t	2026-05-31 17:29:28.26	2026-06-02 14:34:30.988
cmpu216mq0016d5ugpx6o8yxs	cmpu216lv000qd5ug2gknqrpl	Hilti TE 1000-AVR Demolition Hammer	hilti-te-1000-avr	Премиум-прерыватель, зарезервированный для задач и обслуживания сайта с высокой нагрузкой.	Высокопроизводительный гидромолот Hilti, поддерживающий цикл обслуживания для выполнения интенсивных задач по сносу и подготовке анкеров.	Hilti	TE 1000-AVR	60.00	320.00	3	0	1.75	12.50	MAINTENANCE	f	2026-05-31 17:29:28.275	2026-06-02 14:34:30.992
cmpu216mr0018d5ugf6vg3q9u	cmpu216lv000qd5ug2gknqrpl	Milwaukee Kango 950 S	milwaukee-kango-950-s	Прочный инструмент для разрушения каналов, бетонных кромок и проемов.	Готовый к эксплуатации выключатель часто используется для компенсаторов, кабельных каналов и реконструкции технических помещений.	Milwaukee	Kango 950 S	50.00	230.00	3	2	1.70	11.80	AVAILABLE	f	2026-05-31 17:29:28.276	2026-06-02 14:34:30.993
cmpu216ms001ad5ugemfo87rh	cmpu216ly000rd5ugoikci2z9	Altrad Belle Minimix 150	altrad-belle-minimix-150	Компактный миксер для работ по укладке плитки, ограждений и мелкого ремонта плит.	Один из самых практичных портативных миксеров для выездных отделочных бригад и ремонтных работ с коротким циклом.	Altrad Belle	Minimix 150	35.00	180.00	4	1	0.55	61.00	AVAILABLE	t	2026-05-31 17:29:28.277	2026-06-02 14:34:30.994
cmpu216mw001id5ughgbdbbke	cmpu216ly000rd5ugoikci2z9	Patriot BM 208C Mixer	patriot-bm-208c	Большой миксер для заливки подъездных дорог и малоэтажных бетонных бригад.	Надежный вариант, когда проект требует более длительных циклов смешивания и больших порций бетона за смену.	Patriot	BM 208C	38.00	190.00	3	2	1.00	79.00	AVAILABLE	f	2026-05-31 17:29:28.281	2026-06-02 14:34:30.998
cmpu216mo0012d5ugujtqybh2	cmpu216lv000qd5ug2gknqrpl	Makita HM1214C Demolition Hammer	makita-hm1214c	Компактный демонтажный молоток для штробления стен и снятия плитки.	Сбалансированный молоток для ежедневных отделочных бригад, которым необходима надежная сила удара без необходимости транспортировки больших размеров.	Makita	HM1214C	42.00	210.00	4	3	1.50	12.30	AVAILABLE	f	2026-05-31 17:29:28.272	2026-06-02 14:34:30.989
cmpu216n80022d5ug8rmjz67e	cmpu216lz000td5ugoif653lw	SDMO Technic 7500 TE	sdmo-technic-7500te	Трехфазный генератор для смешанного парка оборудования и временных объектов.	Надежный вариант для объектов с осветительными башнями, насосами и домиками подрядчиков, работающими от одного источника питания.	SDMO	Technic 7500 TE	82.00	420.00	2	1	6.60	98.00	AVAILABLE	f	2026-05-31 17:29:28.292	2026-06-02 14:34:31.021
cmpu216na0026d5uggtjk00n5	cmpu216m0000ud5ugsxqx7qjc	Fubag VCF 100 CM3	fubag-vcf-100-cm3	Компрессор с ременным приводом для пневматических инструментов и небольших покрасочных работ.	Популярный компрессор для кузовных работ, поддержки мастерских и бригад, использующих ударные инструменты и гвозди.	Fubag	VCF 100 CM3	36.00	175.00	4	4	2.20	64.00	AVAILABLE	f	2026-05-31 17:29:28.294	2026-06-02 14:34:31.024
cmpu216nc002ad5ugd8hcmskj	cmpu216m0000ud5ugsxqx7qjc	Patriot EURO 50/260K	patriot-euro-50-260k	Компрессор в настоящее время недоступен из-за замены блока клапанов.	Воздушный компрессор начального уровня временно снят с проката после плановой замены блока клапанов.	Patriot	EURO 50/260K	24.00	120.00	3	0	1.80	27.00	UNAVAILABLE	f	2026-05-31 17:29:28.296	2026-06-02 14:34:31.026
cmpu216nd002cd5ug21i5wbkv	cmpu216m0000ud5ugsxqx7qjc	Metabo Basic 250-24 W OF	metabo-basic-250-24w	Безмасляный компрессор для чистоты рабочих помещений и отделочных бригад.	Компрессор, не требующий особого обслуживания, выбран для внутренних помещений, сервисных фургонов и помещений, где важен чистый воздух.	Metabo	Basic 250-24 W OF	26.00	125.00	4	4	1.50	24.00	AVAILABLE	f	2026-05-31 17:29:28.297	2026-06-02 14:34:31.027
cmpu216nf002gd5ugzceozmj9	cmpu216m1000vd5ugsj97c7bk	Virastar VS Tower 6 m	virastar-vs-tower-6m	Модульная вышка для монтажа, покраски и складского обслуживания.	Легкая алюминиевая башня, подходящая для обслуживающего персонала и отделочных работ средней высоты.	Virastar	VS Tower 6 m	82.00	440.00	2	1	\N	145.00	AVAILABLE	f	2026-05-31 17:29:28.299	2026-06-02 14:34:31.03
cmpu216ng002id5ug3p3xiw19	cmpu216m1000vd5ugsj97c7bk	Layher Zifa Compact	layher-zifa-compact	Компактная лестничная башня для внутренней отделки и доступа для обслуживания.	Специализированная компактная башенная система для узких помещений, лестничных клеток и коммерческих отделочных работ.	Layher	Zifa Compact	88.00	460.00	1	0	\N	96.00	AVAILABLE	f	2026-05-31 17:29:28.3	2026-06-02 14:34:31.031
cmpu216ni002md5ugaac4trp1	cmpu216m1000vd5ugsj97c7bk	Steel Frame Facade Kit 12 m	steel-frame-facade-kit-12m	Устаревший комплект фасадных лесов хранится в архиве для проверки совместимости.	Архивированный набор шаблонов сохраняется только для исторических записей и сопоставления измерений со старой клиентской документацией.	BuildRent Legacy	Facade Kit 12 m	110.00	600.00	1	0	\N	420.00	ARCHIVED	f	2026-05-31 17:29:28.302	2026-06-02 14:34:31.033
cmpu216ni002od5ugcfr8ytc8	cmpu216m1000wd5ugbjiikzj5	ESAB Rogue ES 200i	esab-rogue-es-200i	Компактный инверторный сварочный аппарат для производственных бригад и ремонтных бригад.	Высокопроизводительный сварочный инвертор для мобильных сварщиков, занимающихся работой с воротами, рамами, арматурой и ремонтом.	ESAB	Rogue ES 200i	40.00	190.00	4	3	7.10	8.40	AVAILABLE	t	2026-05-31 17:29:28.303	2026-06-02 14:34:31.034
cmpu216nl002sd5uga8ohegg9	cmpu216m1000wd5ugbjiikzj5	FoxWeld Master 202M	foxweld-master-202m	Инвертор общего назначения для изготовления и обслуживания на объекте.	Универсальный сварочный инвертор, используемый для навесов, кронштейнов и быстрого ремонта конструкций на объекте.	FoxWeld	Master 202M	32.00	150.00	4	4	6.30	5.20	AVAILABLE	f	2026-05-31 17:29:28.305	2026-06-02 14:34:31.036
cmpu216nl002ud5ugscckzjwu	cmpu216m1000wd5ugbjiikzj5	Resanta SAI-220	resanta-sai-220	Инвертор находится на профилактическом обслуживании после проверки вентилятора и кабеля.	Популярный сварочный аппарат временно выведен из эксплуатации, пока проверяются подшипники вентилятора и выходные кабели.	Resanta	SAI-220	29.00	145.00	3	0	7.20	4.90	MAINTENANCE	f	2026-05-31 17:29:28.306	2026-06-02 14:34:31.037
cmpu216n2001sd5ugmcaje11z	cmpu216lz000sd5uggdgeivpe	Zitrek CNP 30-2	zitrek-cnp-30-2	Тяжелый каток для работы на плотных основаниях на дорогах и дворах.	Прочный виброплита для более масштабных задач по уплотнению, когда бригадам требуется более сильный удар и хороший транспортный баланс.	Zitrek	CNP 30-2	58.00	270.00	3	3	4.80	125.00	AVAILABLE	f	2026-05-31 17:29:28.287	2026-06-02 14:34:31.004
cmpu216n5001wd5ugfjewtyji	cmpu216lz000td5ugoif653lw	Fubag BS 6600 AES	fubag-bs-6600-aes	Переносной бензиновый генератор для резервного электроснабжения общестроительных работ.	Проверенный генератор для сварщиков, насосов и общих цепей инструментов на строительных проектах среднего размера.	Fubag	BS 6600 AES	66.00	330.00	4	4	5.50	84.00	AVAILABLE	f	2026-05-31 17:29:28.289	2026-06-02 14:34:31.017
cmpu216n70020d5ugl2fz23t1	cmpu216lz000td5ugoif653lw	Firman SPG6500E2	firman-spg6500e2	Генератор был остановлен для проверки генератора переменного тока после периодических скачков напряжения.	Бензиновый генератор высокой мощности в настоящее время помечен как недоступный, пока проверяются генератор и блок AVR.	Firman	SPG6500E2	64.00	320.00	2	0	5.20	78.00	UNAVAILABLE	f	2026-05-31 17:29:28.291	2026-06-02 14:34:31.02
cmpu216ns0036d5ug0xnnwuav	cmpu216m2000xd5ugd6z7247i	Legacy Asphalt Saw 500	legacy-asphalt-saw-500	Архивная дорожная пила сохранена только для ссылки на старый контракт.	Запись об историческом оборудовании сохранена для отчетности и документации более ранних муниципальных проектов.	BuildRent Legacy	Asphalt Saw 500	85.00	430.00	1	0	9.00	115.00	ARCHIVED	f	2026-05-31 17:29:28.312	2026-06-02 14:34:31.045
cmpu216nu003cd5ugz8tfmbiy	cmpu216m2000yd5ugjmxha24a	Stanley TLM330 Distance Meter	stanley-tlm330	Компактный лазерный измеритель для быстрого измерения помещений, фасадов и проемов.	Удобный портативный дальномер для оценщиков отделки, поддержки обследований и планирования установки.	Stanley	TLM330	12.00	60.00	8	6	\N	0.18	AVAILABLE	f	2026-05-31 17:29:28.315	2026-06-02 14:34:31.049
cmpu216nv003ed5ugrwn6xnla	cmpu216m2000yd5ugjmxha24a	ADA Cube 360 Home Edition	ada-cube-360-home	Лазерный уровень приостановлен из-за отклонения калибровки.	Компактный лазерный уровень в настоящее время ожидает калибровки после того, как во время проверки качества был обнаружен дрейф.	ADA	Cube 360 Home Edition	10.00	45.00	5	0	\N	0.35	UNAVAILABLE	f	2026-05-31 17:29:28.316	2026-06-02 14:34:31.051
cmpu216nx003gd5ug6jpvmysq	cmpu216m2000yd5ugjmxha24a	Trimble M3 Total Station	trimble-m3-total-station	Станция геодезического класса для разметки местности, переноса осей и поддержки геодезии.	Прецизионный инструмент для подрядчиков, которым требуется сложная передача геометрии и точный контроль объекта.	Trimble	M3	120.00	700.00	1	0	\N	4.50	AVAILABLE	f	2026-05-31 17:29:28.317	2026-06-02 14:34:31.052
cmpu216nn002wd5ugx53nijsp	cmpu216m1000wd5ugbjiikzj5	Aurora Stickmate 250	aurora-stickmate-250	Инвертор повышенной мощности для работы с толстым металлом и производственных задач.	Надёжный сварочный аппарат для мастерских и строительных бригад, работающих с тяжёлыми металлическими профилями.	Aurora	Stickmate 250	45.00	205.00	2	1	8.50	7.80	AVAILABLE	f	2026-05-31 17:29:28.307	2026-06-02 14:34:31.038
cmpu216no002yd5ugw5q3lswn	cmpu216m2000xd5ugd6z7247i	Stihl TS 420 Cut-Off Saw	stihl-ts-420	Ручной резак по бетону и металлу для проемов, бордюров и труб.	Высокомобильная отрезная пила для аварийных проемов, выравнивания дорожного покрытия, стальных профилей и коммунальных работ.	Stihl	TS 420	58.00	280.00	4	3	3.20	9.60	AVAILABLE	t	2026-05-31 17:29:28.308	2026-06-02 14:34:31.039
cmpu216np0030d5ugfq63q4af	cmpu216m2000xd5ugd6z7247i	Husqvarna K 770 Cutter	husqvarna-k770	Универсальный дисковый резак для асфальта, бордюрного камня и армирующих работ.	Надежная высокопроизводительная пила, используемая коммунальными службами, бригадами по укладке дорожного покрытия и генеральными подрядчиками при работе с плотными материалами.	Husqvarna	K 770	62.00	300.00	4	1	3.70	10.10	AVAILABLE	f	2026-05-31 17:29:28.309	2026-06-02 14:34:31.041
cmpu216nq0032d5ugzw6k0y5s	cmpu216m2000xd5ugd6z7247i	Makita LC1230 Metal Saw	makita-lc1230	Пила по металлу холодной резки для профилей, швеллеров и изготовления площадок.	Точная пила для резки металла для углов мастерских и мобильных производственных задач, где важна чистота кромок.	Makita	LC1230	37.00	170.00	3	3	1.75	19.30	AVAILABLE	f	2026-05-31 17:29:28.31	2026-06-02 14:34:31.042
cmpu216ns0038d5ugivrykrme	cmpu216m2000yd5ugjmxha24a	Bosch GLL 3-80 CG Laser Level	bosch-gll-3-80-cg	Лазер зеленого луча для внутренней планировки и работ с подвесными потолками.	Хорошо видимый лазерный уровень для обрамления перегородок, подвесных потолков, укладки плитки и выравнивания шкафов.	Bosch	GLL 3-80 CG	24.00	120.00	6	5	\N	0.90	AVAILABLE	f	2026-05-31 17:29:28.313	2026-06-02 14:34:31.046
cmpu216nt003ad5ugcgyrtsjo	cmpu216m2000yd5ugjmxha24a	Leica Rugby 620 Rotary Laser	leica-rugby-620	Ротационный лазер для наружного применения для планировки, коммунальных услуг и выравнивания площадок.	Роторный лазер профессионального уровня, используемый для обработки больших участков, фундаментов и выравнивания наружных коммуникаций.	Leica	Rugby 620	48.00	260.00	3	3	\N	2.40	AVAILABLE	f	2026-05-31 17:29:28.314	2026-06-02 14:34:31.048
cmpu216n0001qd5ugicavws33	cmpu216lz000sd5uggdgeivpe	Masalta MS60-4 Compactor	masalta-ms60-4	Легкий каток был отправлен на техосмотр в мастерскую после долгого асфальтового сезона.	В настоящее время в продаже имеется компактный виброплита для профилактического осмотра подшипников и систем вибрации.	Masalta	MS60-4	39.00	180.00	2	0	3.10	63.00	MAINTENANCE	f	2026-05-31 17:29:28.285	2026-06-02 14:34:31.003
cmpu216nr0034d5ugmb25ejc3	cmpu216m2000xd5ugd6z7247i	Eibenstock EES 1400-3 Wall Chaser	eibenstock-ees-1400-3	Стенорез недоступен, пока заменяются защитные кожухи лезвий.	Специализированный инструмент для чеканки в настоящее время нельзя арендовать до тех пор, пока не будут заменены защитное оборудование и пылезащитные уплотнения.	Eibenstock	EES 1400-3	41.00	190.00	2	0	1.40	4.70	UNAVAILABLE	f	2026-05-31 17:29:28.311	2026-06-02 14:34:31.043
cmpu216n4001ud5ugmt8r8aee	cmpu216lz000td5ugoif653lw	Honda EU30is Inverter Generator	honda-eu30is	Тихий инверторный генератор для офисов и чувствительных электроинструментов.	Малошумящий генератор премиум-класса для отделочных бригад, мобильных офисов и оборудования, требующего стабильного тока.	Honda	EU30is	70.00	360.00	3	2	3.00	59.00	AVAILABLE	t	2026-05-31 17:29:28.288	2026-06-02 14:34:31.005
cmpu216n6001yd5ugu0fr6hvo	cmpu216lz000td5ugoif653lw	Hyundai HHY 7050FE	hyundai-hhy-7050fe	Строительный генератор для резервных цепей, насосов и дозировочного оборудования.	Надежное портативное устройство с прочной рамой для хранения на открытом воздухе и жестких графиков работы подрядчиков.	Hyundai	HHY 7050FE	68.00	340.00	3	2	5.50	81.00	AVAILABLE	f	2026-05-31 17:29:28.29	2026-06-02 14:34:31.019
cmpu216n90024d5ugqss61ynu	cmpu216m0000ud5ugsxqx7qjc	ABAC Montecarlo L20P	abac-montecarlo-l20p	Компактный компрессор для отделочных, крепежных и продувочных работ.	Мобильный компрессор, подходящий для подрядчиков по внутренней отделке, плотников и специалистов по техническому обслуживанию, работающих внутри помещений.	ABAC	Montecarlo L20P	28.00	140.00	5	4	1.50	32.00	AVAILABLE	f	2026-05-31 17:29:28.293	2026-06-02 14:34:31.022
cmpu216nb0028d5ugquezq4xy	cmpu216m0000ud5ugsxqx7qjc	Remeza SB4/C-50.LB30A	remeza-sb4-c-50-lb30a	Компрессор для цеха для бригад пневматического монтажа и обслуживания.	Надежный компрессор белорусского производства, который хорошо подходит для отделочных столярных работ, обслуживания и ежедневного обслуживания инструментов.	Remeza	SB4/C-50.LB30A	30.00	150.00	5	4	1.80	39.00	AVAILABLE	f	2026-05-31 17:29:28.295	2026-06-02 14:34:31.025
cmpu216ne002ed5ug1748imv1	cmpu216m1000vd5ugsj97c7bk	Krause Protec XXL 7 m Tower	krause-protec-xxl-7m	Передвижные вышки для ремонта фасада и доступа к инженерным системам под потолком.	Профессиональная алюминиевая вышка с быстроразъемным монтажом для подрядчиков, работающих на фасадах и атриумах.	Krause	Protec XXL 7 m	95.00	500.00	2	1	\N	178.00	AVAILABLE	t	2026-05-31 17:29:28.298	2026-06-02 14:34:31.028
cmpu216nh002kd5ugmw8ldssu	cmpu216m1000vd5ugsj97c7bk	Euro Scaffold Rolling Tower 75x190	euro-scaffold-rolling-75x190	Комплект строительных лесов башни в настоящее время хранится для внутренней проверки и инвентаризации.	Сдача в аренду комплекта подвижных лесов временно приостановлена ​​до завершения полной инвентаризации и проверки стопорных штифтов.	Euro Scaffold	75x190	76.00	390.00	2	0	\N	128.00	UNAVAILABLE	f	2026-05-31 17:29:28.301	2026-06-02 14:34:31.032
cmpu216nj002qd5ug3rjdm07r	cmpu216m1000wd5ugbjiikzj5	Svarog REAL ARC 200 Black	svarog-real-arc-200-black	Полевой инвертор для монтажников, стальных лестниц и опорных конструкций.	Портативный сварочный аппарат, ценимый за стабильную работу дуги при ремонтных работах и ​​изготовлении стали по индивидуальному заказу.	Svarog	REAL ARC 200 Black	34.00	165.00	5	5	6.60	4.70	AVAILABLE	f	2026-05-31 17:29:28.304	2026-06-02 14:34:31.035
\.


--
-- Data for Name: EquipmentImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentImage" (id, "equipmentId", url, alt, "sortOrder", "createdAt") FROM stdin;
cmpwqnw9x002td5zk6v7mjhzf	cmpu216mb0010d5ugzabpsrkm	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Bosch GBH 8-45 DV Rotary Hammer ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x002ud5zkob2dprtz	cmpu216mb0010d5ugzabpsrkm	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Bosch GBH 8-45 DV Rotary Hammer ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x002vd5zkf408vj1y	cmpu216mo0012d5ugujtqybh2	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Makita HM1214C Demolition Hammer ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x002wd5zka5yaw6nj	cmpu216mo0012d5ugujtqybh2	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Makita HM1214C Demolition Hammer ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x002xd5zkd8bm43zo	cmpu216mp0014d5ugu0lz927j	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	DeWalt D25902K Breaker ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x002yd5zkom6ggrmw	cmpu216mp0014d5ugu0lz927j	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	DeWalt D25902K Breaker ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x002zd5zkx37kv71n	cmpu216mq0016d5ugpx6o8yxs	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Hilti TE 1000-AVR Demolition Hammer ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0030d5zk9sl5rdiq	cmpu216mq0016d5ugpx6o8yxs	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Hilti TE 1000-AVR Demolition Hammer ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0031d5zktpdliurw	cmpu216mr0018d5ugf6vg3q9u	https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80	Milwaukee Kango 950 S ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0032d5zkbfcrud0x	cmpu216mr0018d5ugf6vg3q9u	https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80	Milwaukee Kango 950 S ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0033d5zkjveu38tx	cmpu216ms001ad5ugemfo87rh	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Altrad Belle Minimix 150 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0034d5zkgxkij93r	cmpu216ms001ad5ugemfo87rh	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Altrad Belle Minimix 150 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0035d5zkswlxbujv	cmpu216mt001cd5ug9xa7nqhf	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Zitrek B1510 FK Mixer ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0036d5zk3xqhnydg	cmpu216mt001cd5ug9xa7nqhf	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Zitrek B1510 FK Mixer ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0037d5zkx6zwqska	cmpu216mu001ed5ug5aodaewy	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Sturm CM20160 Concrete Mixer ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0038d5zkcxoy07hx	cmpu216mu001ed5ug5aodaewy	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Sturm CM20160 Concrete Mixer ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0039d5zkttnznbj6	cmpu216mv001gd5ugfa8f7hth	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	RedVerg RD-CM180 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003ad5zk56wx0dvc	cmpu216mv001gd5ugfa8f7hth	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	RedVerg RD-CM180 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003bd5zk2ngfqfib	cmpu216mw001id5ughgbdbbke	https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=1200&q=80	Patriot BM 208C Mixer ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003cd5zk9nrdpym3	cmpu216mw001id5ughgbdbbke	https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80	Patriot BM 208C Mixer ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003dd5zkbq93ixiu	cmpu216mx001kd5ug4h49hfpn	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Wacker Neuson VP1550AW ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003ed5zkiimoy8to	cmpu216mx001kd5ug4h49hfpn	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Wacker Neuson VP1550AW ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003fd5zkrwlzrccr	cmpu216my001md5ugh8znvup9	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Huter VP-90 Plate Compactor ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003gd5zko49t87ss	cmpu216my001md5ugh8znvup9	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Huter VP-90 Plate Compactor ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003hd5zklg2rcxxf	cmpu216mz001od5ug0u5b0jol	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Champion PC9045FH ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003id5zkaqwptvkk	cmpu216mz001od5ug0u5b0jol	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Champion PC9045FH ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003jd5zkf7g76u3b	cmpu216n0001qd5ugicavws33	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Masalta MS60-4 Compactor ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003kd5zkupgwxaam	cmpu216n0001qd5ugicavws33	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Masalta MS60-4 Compactor ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003ld5zkm2vhwhdw	cmpu216n2001sd5ugmcaje11z	https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80	Zitrek CNP 30-2 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003md5zk952ztc3h	cmpu216n2001sd5ugmcaje11z	https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?auto=format&fit=crop&w=1200&q=80	Zitrek CNP 30-2 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003nd5zkec64vwsg	cmpu216n4001ud5ugmt8r8aee	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Honda EU30is Inverter Generator ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003od5zk7ry16fm6	cmpu216n4001ud5ugmt8r8aee	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Honda EU30is Inverter Generator ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003pd5zkjivjj4jl	cmpu216n5001wd5ugfjewtyji	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Fubag BS 6600 AES ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003qd5zkr0ptj6ro	cmpu216n5001wd5ugfjewtyji	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Fubag BS 6600 AES ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003rd5zkob76aept	cmpu216n6001yd5ugu0fr6hvo	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Hyundai HHY 7050FE ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003sd5zkf6h9dcjf	cmpu216n6001yd5ugu0fr6hvo	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Hyundai HHY 7050FE ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003td5zkvnefnnqa	cmpu216n70020d5ugl2fz23t1	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	Firman SPG6500E2 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003ud5zkydibyq70	cmpu216n70020d5ugl2fz23t1	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Firman SPG6500E2 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003vd5zki1lny087	cmpu216n80022d5ug8rmjz67e	https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80	SDMO Technic 7500 TE ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003wd5zke1uvhdju	cmpu216n80022d5ug8rmjz67e	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	SDMO Technic 7500 TE ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003xd5zk3pf7b33g	cmpu216n90024d5ugqss61ynu	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	ABAC Montecarlo L20P ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x003yd5zky5dcdqsl	cmpu216n90024d5ugqss61ynu	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	ABAC Montecarlo L20P ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x003zd5zkcy9t5lgs	cmpu216na0026d5uggtjk00n5	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Fubag VCF 100 CM3 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0040d5zk6esvqvu3	cmpu216na0026d5uggtjk00n5	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Fubag VCF 100 CM3 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0041d5zkds58rltz	cmpu216nb0028d5ugquezq4xy	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Remeza SB4/C-50.LB30A ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0042d5zkh55qb8x3	cmpu216nb0028d5ugquezq4xy	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Remeza SB4/C-50.LB30A ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0043d5zkmyrdyvb5	cmpu216nc002ad5ugd8hcmskj	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Patriot EURO 50/260K ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0044d5zk39dajjfg	cmpu216nc002ad5ugd8hcmskj	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Patriot EURO 50/260K ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0045d5zkh3zkwdou	cmpu216nd002cd5ug21i5wbkv	https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80	Metabo Basic 250-24 W OF ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0046d5zk737iafn0	cmpu216nd002cd5ug21i5wbkv	https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80	Metabo Basic 250-24 W OF ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0047d5zkdr3am6xq	cmpu216ne002ed5ug1748imv1	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Krause Protec XXL 7 m Tower ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0048d5zk2qvpassi	cmpu216ne002ed5ug1748imv1	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Krause Protec XXL 7 m Tower ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0049d5zknqjyhmec	cmpu216nf002gd5ugzceozmj9	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Virastar VS Tower 6 m ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004ad5zko3nflxe9	cmpu216nf002gd5ugzceozmj9	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Virastar VS Tower 6 m ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004bd5zkicx6oe3p	cmpu216ng002id5ug3p3xiw19	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Layher Zifa Compact ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004cd5zkifp8su2s	cmpu216ng002id5ug3p3xiw19	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Layher Zifa Compact ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004dd5zkq8d9xaem	cmpu216nh002kd5ugmw8ldssu	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Euro Scaffold Rolling Tower 75x190 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004ed5zkzbf9sugs	cmpu216nh002kd5ugmw8ldssu	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Euro Scaffold Rolling Tower 75x190 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004fd5zko790cuws	cmpu216ni002md5ugaac4trp1	https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80	Steel Frame Facade Kit 12 m ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004gd5zkl7hghkbh	cmpu216ni002md5ugaac4trp1	https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80	Steel Frame Facade Kit 12 m ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004hd5zkk7bj6git	cmpu216ni002od5ugcfr8ytc8	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	ESAB Rogue ES 200i ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004id5zk8bmdt3n0	cmpu216ni002od5ugcfr8ytc8	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	ESAB Rogue ES 200i ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004jd5zkyxz6vbqx	cmpu216nj002qd5ug3rjdm07r	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Svarog REAL ARC 200 Black ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004kd5zkoc3y7lqp	cmpu216nj002qd5ug3rjdm07r	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Svarog REAL ARC 200 Black ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004ld5zkrktuav2j	cmpu216nl002sd5uga8ohegg9	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	FoxWeld Master 202M ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004md5zk85ywxayx	cmpu216nl002sd5uga8ohegg9	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	FoxWeld Master 202M ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004nd5zkljwhugse	cmpu216nl002ud5ugscckzjwu	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Resanta SAI-220 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004od5zk9o9eep9t	cmpu216nl002ud5ugscckzjwu	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Resanta SAI-220 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004pd5zkqajc8ghf	cmpu216nn002wd5ugx53nijsp	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Aurora Stickmate 250 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004qd5zkdx873ex6	cmpu216nn002wd5ugx53nijsp	https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80	Aurora Stickmate 250 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004rd5zkrssckrjh	cmpu216no002yd5ugw5q3lswn	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Stihl TS 420 Cut-Off Saw ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004sd5zkwyzejinz	cmpu216no002yd5ugw5q3lswn	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Stihl TS 420 Cut-Off Saw ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004td5zkbq1nejwl	cmpu216np0030d5ugfq63q4af	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Husqvarna K 770 Cutter ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004ud5zkjw5q2f6v	cmpu216np0030d5ugfq63q4af	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Husqvarna K 770 Cutter ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004vd5zk5vkwp5pn	cmpu216nq0032d5ugzw6k0y5s	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Makita LC1230 Metal Saw ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004wd5zkpqwqk3mi	cmpu216nq0032d5ugzw6k0y5s	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Makita LC1230 Metal Saw ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004xd5zkhm8fli91	cmpu216nr0034d5ugmb25ejc3	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Eibenstock EES 1400-3 Wall Chaser ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x004yd5zku8wlx2mp	cmpu216nr0034d5ugmb25ejc3	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Eibenstock EES 1400-3 Wall Chaser ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x004zd5zkbfh2i93u	cmpu216ns0036d5ug0xnnwuav	https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80	Legacy Asphalt Saw 500 ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0050d5zkcz9c98nc	cmpu216ns0036d5ug0xnnwuav	https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80	Legacy Asphalt Saw 500 ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0051d5zkfvlylu7h	cmpu216ns0038d5ugivrykrme	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Bosch GLL 3-80 CG Laser Level ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0052d5zkmmf767iz	cmpu216ns0038d5ugivrykrme	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Bosch GLL 3-80 CG Laser Level ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0053d5zk2je6u7yn	cmpu216nt003ad5ugcgyrtsjo	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Leica Rugby 620 Rotary Laser ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0054d5zktw2wi5sc	cmpu216nt003ad5ugcgyrtsjo	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Leica Rugby 620 Rotary Laser ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0055d5zkxyiqz3yu	cmpu216nu003cd5ugz8tfmbiy	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Stanley TLM330 Distance Meter ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0056d5zk22vfpg86	cmpu216nu003cd5ugz8tfmbiy	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Stanley TLM330 Distance Meter ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0057d5zkevpp54l6	cmpu216nv003ed5ugrwn6xnla	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	ADA Cube 360 Home Edition ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x0058d5zknl859uvu	cmpu216nv003ed5ugrwn6xnla	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	ADA Cube 360 Home Edition ракурс 2	1	2026-06-02 14:34:31.077
cmpwqnw9x0059d5zkdiw2dj9d	cmpu216nx003gd5ug6jpvmysq	https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80	Trimble M3 Total Station ракурс 1	0	2026-06-02 14:34:31.077
cmpwqnw9x005ad5zk50d9u34q	cmpu216nx003gd5ug6jpvmysq	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80	Trimble M3 Total Station ракурс 2	1	2026-06-02 14:34:31.077
\.


--
-- Data for Name: EquipmentSpec; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentSpec" (id, "equipmentId", name, value, unit, "sortOrder") FROM stdin;
cmpwqnwad005bd5zk3uh6mqhk	cmpu216mb0010d5ugzabpsrkm	Энергия удара	12.5	J	0
cmpwqnwad005cd5zkyvb40c5h	cmpu216mb0010d5ugzabpsrkm	Тип патрона	SDS-max	\N	1
cmpwqnwad005dd5zkx210isio	cmpu216mb0010d5ugzabpsrkm	Диаметр сверления	45	mm	2
cmpwqnwad005ed5zkfapqglvd	cmpu216mb0010d5ugzabpsrkm	Режим работы	Сверление и долбление	\N	3
cmpwqnwad005fd5zki0gqlwb4	cmpu216mo0012d5ugujtqybh2	Энергия удара	19.9	J	0
cmpwqnwad005gd5zk469hkzve	cmpu216mo0012d5ugujtqybh2	Контроль вибрации	AVT	\N	1
cmpwqnwad005hd5zk95c5kaki	cmpu216mo0012d5ugujtqybh2	Напряжение	220	V	2
cmpwqnwad005id5zk7aefae43	cmpu216mo0012d5ugujtqybh2	Чехол в комплекте	Да	\N	3
cmpwqnwad005jd5zk8n3z07tj	cmpu216mp0014d5ugu0lz927j	Энергия удара	19	J	0
cmpwqnwad005kd5zkkqggzzj1	cmpu216mp0014d5ugu0lz927j	Держатель инструмента	SDS-max	\N	1
cmpwqnwad005ld5zksxpwsqmw	cmpu216mp0014d5ugu0lz927j	Ударов в минуту	2100	\N	2
cmpwqnwad005md5zkp4agwyb7	cmpu216mp0014d5ugu0lz927j	Вариант использования	Снос перекрытий и стен	\N	3
cmpwqnwad005nd5zk3d3q1x80	cmpu216mq0016d5ugpx6o8yxs	Энергия удара	26	J	0
cmpwqnwad005od5zkcfh2ssl3	cmpu216mq0016d5ugpx6o8yxs	Статус услуги	Ротация технического обслуживания	\N	1
cmpwqnwad005pd5zk5ozxofpr	cmpu216mq0016d5ugpx6o8yxs	Уровень шума	96	dB	2
cmpwqnwad005qd5zkrtdbqvkr	cmpu216mq0016d5ugpx6o8yxs	Рекомендуемое использование	Структурный снос	\N	3
cmpwqnwad005rd5zk53kpmwnp	cmpu216mr0018d5ugf6vg3q9u	Ударов в минуту	1950	\N	0
cmpwqnwad005sd5zk5ipu5qry	cmpu216mr0018d5ugf6vg3q9u	Энергия удара	20	J	1
cmpwqnwad005td5zkakfplap8	cmpu216mr0018d5ugf6vg3q9u	Длина шнура	6	m	2
cmpwqnwad005ud5zk0wxnxwqe	cmpu216mr0018d5ugf6vg3q9u	Транспортировочный кейс	Да	\N	3
cmpwqnwad005vd5zk4q31ima0	cmpu216ms001ad5ugemfo87rh	Громкость барабана	130	L	0
cmpwqnwad005wd5zkrfy8rmpw	cmpu216ms001ad5ugemfo87rh	Смешать выход	90	L	1
cmpwqnwad005xd5zk2sdz3b6b	cmpu216ms001ad5ugemfo87rh	Источник питания	220	V	2
cmpwqnwad005yd5zkd7j5ayj5	cmpu216ms001ad5ugemfo87rh	Тип привода	Электрический	\N	3
cmpwqnwad005zd5zknik2kwvs	cmpu216mt001cd5ug9xa7nqhf	Громкость барабана	140	L	0
cmpwqnwad0060d5zki5dyulr3	cmpu216mt001cd5ug9xa7nqhf	Конструкция рамы	Переносная колесная база	\N	1
cmpwqnwad0061d5zk51zfpltz	cmpu216mt001cd5ug9xa7nqhf	Материал коронки	Чугун	\N	2
cmpwqnwad0062d5zkli7gfzy8	cmpu216mt001cd5ug9xa7nqhf	Сборка	Быстросъемный барабан	\N	3
cmpwqnwad0063d5zkezj8kr5f	cmpu216mu001ed5ug5aodaewy	Громкость барабана	160	L	0
cmpwqnwad0064d5zkl44yftck	cmpu216mu001ed5ug5aodaewy	Смешать выход	110	L	1
cmpwqnwad0065d5zkmo2on7es	cmpu216mu001ed5ug5aodaewy	Защита двигателя	Тепловое реле	\N	2
cmpwqnwad0066d5zk29mvtocg	cmpu216mu001ed5ug5aodaewy	Контроль наклона	Маховик	\N	3
cmpwqnwad0067d5zkcjb576dp	cmpu216mv001gd5ugfa8f7hth	Громкость барабана	180	L	0
cmpwqnwad0068d5zkhxhqcubd	cmpu216mv001gd5ugfa8f7hth	Примечание о наличии	Ожидание диагностики	\N	1
cmpwqnwad0069d5zk52fj7jsc	cmpu216mv001gd5ugfa8f7hth	Зубчатое кольцо	Сталь	\N	2
cmpwqnwad006ad5zkutemg71a	cmpu216mv001gd5ugfa8f7hth	Транспортные колеса	Да	\N	3
cmpwqnwad006bd5zkwa4h1yrs	cmpu216mw001id5ughgbdbbke	Громкость барабана	200	L	0
cmpwqnwad006cd5zkl06lsd6y	cmpu216mw001id5ughgbdbbke	Смешать выход	140	L	1
cmpwqnwad006dd5zkjzicnmei	cmpu216mw001id5ughgbdbbke	Назначение пакета	Большие заливки	\N	2
cmpwqnwad006ed5zkps8o5rfd	cmpu216mw001id5ughgbdbbke	Источник питания	220	V	3
cmpwqnwad006fd5zkdxase92b	cmpu216mx001kd5ug4h49hfpn	Сила уплотнения	15	kN	0
cmpwqnwad006gd5zk612nwrnz	cmpu216mx001kd5ug4h49hfpn	Ширина пластины	500	mm	1
cmpwqnwad006hd5zkdv8h3yg0	cmpu216mx001kd5ug4h49hfpn	Скорость движения	25	m/min	2
cmpwqnwad006id5zky6xzu2i9	cmpu216mx001kd5ug4h49hfpn	Тип двигателя	Бензин	\N	3
cmpwqnwad006jd5zke79z6a7y	cmpu216my001md5ugh8znvup9	Сила уплотнения	13	kN	0
cmpwqnwad006kd5zk747jgejp	cmpu216my001md5ugh8znvup9	Опорная пластина	530 x 500	mm	1
cmpwqnwad006ld5zk2mdgwzvs	cmpu216my001md5ugh8znvup9	Топливный бак	3.6	L	2
cmpwqnwad006md5zkc82q9qwz	cmpu216my001md5ugh8znvup9	Стартовая система	Ручная отдача	\N	3
cmpwqnwad006nd5zkcvdjvn4o	cmpu216mz001od5ug0u5b0jol	Глубина уплотнения	300	mm	0
cmpwqnwad006od5zkmxnyvbub	cmpu216mz001od5ug0u5b0jol	Сила	15	kN	1
cmpwqnwad006pd5zkvjxvnqeh	cmpu216mz001od5ug0u5b0jol	Резервуар для воды	Нет	\N	2
cmpwqnwad006qd5zknz6clm9t	cmpu216mz001od5ug0u5b0jol	Ручка	Складной	\N	3
cmpwqnwad006rd5zk38bkr9ey	cmpu216n0001qd5ugicavws33	Сила уплотнения	10.5	kN	0
cmpwqnwad006sd5zktm2ausxc	cmpu216n0001qd5ugicavws33	Примечание по обслуживанию	Проверка виброблока	\N	1
cmpwqnwad006td5zkl5zdhcb2	cmpu216n0001qd5ugicavws33	Транспортные колеса	Необязательный	\N	2
cmpwqnwad006ud5zk2hoi44ex	cmpu216n0001qd5ugicavws33	Тип двигателя	Бензин	\N	3
cmpwqnwad006vd5zklnb1rvlb	cmpu216n2001sd5ugmcaje11z	Сила уплотнения	25	kN	0
cmpwqnwad006wd5zkbzo82p6l	cmpu216n2001sd5ugmcaje11z	Размер пластины	630 x 400	mm	1
cmpwqnwad006xd5zkuamutkkc	cmpu216n2001sd5ugmcaje11z	Скорость движения	18	m/min	2
cmpwqnwad006yd5zkephukd2r	cmpu216n2001sd5ugmcaje11z	Вариант использования	Подготовка дорожного основания и двора	\N	3
cmpwqnwad006zd5zkkoijec1y	cmpu216n4001ud5ugmt8r8aee	Номинальная мощность	2.8	kW	0
cmpwqnwad0070d5zk7cyk3dkr	cmpu216n4001ud5ugmt8r8aee	Тип топлива	Бензин	\N	1
cmpwqnwad0071d5zkk8qw3jrj	cmpu216n4001ud5ugmt8r8aee	Уровень шума	57	dB	2
cmpwqnwad0072d5zk0uhvl4lg	cmpu216n4001ud5ugmt8r8aee	Время выполнения	7	ч	3
cmpwqnwad0073d5zkpp020us8	cmpu216n5001wd5ugfjewtyji	Номинальная мощность	5.0	kW	0
cmpwqnwad0074d5zk0r7w51pb	cmpu216n5001wd5ugfjewtyji	Розетки	2 x 220V	\N	1
cmpwqnwad0075d5zk9nujurdv	cmpu216n5001wd5ugfjewtyji	Стартер	Электрический	\N	2
cmpwqnwad0076d5zkgptote37	cmpu216n5001wd5ugfjewtyji	Объем бака	25	L	3
cmpwqnwad0077d5zkbzx52rbr	cmpu216n6001yd5ugu0fr6hvo	Номинальная мощность	5.0	kW	0
cmpwqnwad0078d5zkcr6euqr2	cmpu216n6001yd5ugu0fr6hvo	Топливный бак	25	L	1
cmpwqnwad0079d5zkdwy3atl7	cmpu216n6001yd5ugu0fr6hvo	Время выполнения	8	ч	2
cmpwqnwad007ad5zksb9yio04	cmpu216n6001yd5ugu0fr6hvo	Выходная фаза	Однофазный	\N	3
cmpwqnwad007bd5zkixaasdg8	cmpu216n70020d5ugl2fz23t1	Причина проверки	Проверка AVR и альтернатора	\N	0
cmpwqnwad007cd5zktd91v64q	cmpu216n70020d5ugl2fz23t1	Номинальная мощность	5.0	kW	1
cmpwqnwad007dd5zk7evjsgl0	cmpu216n70020d5ugl2fz23t1	Тип топлива	Бензин	\N	2
cmpwqnwad007ed5zkpyflfyrb	cmpu216n70020d5ugl2fz23t1	Транспортный комплект	Комплект колес	\N	3
cmpwqnwad007fd5zkq9a83jvq	cmpu216n80022d5ug8rmjz67e	Номинальная мощность	6.0	kVA	0
cmpwqnwad007gd5zkrmwbccj8	cmpu216n80022d5ug8rmjz67e	Фаза	Трехфазный	\N	1
cmpwqnwad007hd5zk4nrjcxx5	cmpu216n80022d5ug8rmjz67e	Время выполнения	9	ч	2
cmpwqnwad007id5zk1krirtil	cmpu216n80022d5ug8rmjz67e	Стартер	Электрический	\N	3
cmpwqnwad007jd5zkkcuqfyr2	cmpu216n90024d5ugqss61ynu	Объем ресивера	50	L	0
cmpwqnwad007kd5zkx8w8rx1r	cmpu216n90024d5ugqss61ynu	Давление	10	бар	1
cmpwqnwad007ld5zkqsolxd07	cmpu216n90024d5ugqss61ynu	Расход воздуха	220	L/min	2
cmpwqnwad007md5zknd5utwsp	cmpu216n90024d5ugqss61ynu	Портативность	Колесная база	\N	3
cmpwqnwad007nd5zkdm6x7l65	cmpu216na0026d5uggtjk00n5	Объем ресивера	100	L	0
cmpwqnwad007od5zkz4r1b84n	cmpu216na0026d5uggtjk00n5	Расход воздуха	440	L/min	1
cmpwqnwad007pd5zkk39u35za	cmpu216na0026d5uggtjk00n5	Тип привода	Пояс	\N	2
cmpwqnwad007qd5zkvfxo78cw	cmpu216na0026d5uggtjk00n5	Давление	10	бар	3
cmpwqnwad007rd5zk5vdnkikl	cmpu216nb0028d5ugquezq4xy	Объем ресивера	50	L	0
cmpwqnwad007sd5zkk8uqa2p1	cmpu216nb0028d5ugquezq4xy	Расход воздуха	420	L/min	1
cmpwqnwad007td5zkovh6q1br	cmpu216nb0028d5ugquezq4xy	Реле давления	Автоматический	\N	2
cmpwqnwad007ud5zk0bnpgeh6	cmpu216nb0028d5ugquezq4xy	Страна сборки	Беларусь	\N	3
cmpwqnwad007vd5zkugqxyyyr	cmpu216nc002ad5ugd8hcmskj	Объем ресивера	50	L	0
cmpwqnwad007wd5zkgzy6kgzu	cmpu216nc002ad5ugd8hcmskj	Расход воздуха	260	L/min	1
cmpwqnwae007xd5zkhn6dkny3	cmpu216nc002ad5ugd8hcmskj	Примечание по ремонту	Замена блока клапанов	\N	2
cmpwqnwae007yd5zkit3b60kp	cmpu216nc002ad5ugd8hcmskj	Тип привода	Прямой	\N	3
cmpwqnwae007zd5zk60w8j4iv	cmpu216nd002cd5ug21i5wbkv	Объем ресивера	24	L	0
cmpwqnwae0080d5zkqgrd3sz3	cmpu216nd002cd5ug21i5wbkv	Без масла	Да	\N	1
cmpwqnwae0081d5zkojxoyatt	cmpu216nd002cd5ug21i5wbkv	Расход воздуха	200	L/min	2
cmpwqnwae0082d5zkv4erfwkh	cmpu216nd002cd5ug21i5wbkv	Уровень шума	82	dB	3
cmpwqnwae0083d5zk9dvw4cuk	cmpu216ne002ed5ug1748imv1	Рабочая высота	7.3	m	0
cmpwqnwae0084d5zkix5lkun5	cmpu216ne002ed5ug1748imv1	Размер платформы	2.0 x 0.6	m	1
cmpwqnwae0085d5zknp1aioz5	cmpu216ne002ed5ug1748imv1	Материал	Алюминий	\N	2
cmpwqnwae0086d5zkfv2djvyg	cmpu216ne002ed5ug1748imv1	Использование	Внутренние и фасадные работы	\N	3
cmpwqnwae0087d5zksrpqb58p	cmpu216nf002gd5ugzceozmj9	Рабочая высота	6.2	m	0
cmpwqnwae0088d5zkhxtpz8it	cmpu216nf002gd5ugzceozmj9	Нагрузка на платформу	200	kg	1
cmpwqnwae0089d5zkgno6h3je	cmpu216nf002gd5ugzceozmj9	Время сборки	20	мин	2
cmpwqnwae008ad5zkzimeeoyn	cmpu216nf002gd5ugzceozmj9	Вид транспорта	Компактные секции	\N	3
cmpwqnwae008bd5zkpt4x5fpr	cmpu216ng002id5ug3p3xiw19	Рабочая высота	4.9	m	0
cmpwqnwae008cd5zk86zlkk31	cmpu216ng002id5ug3p3xiw19	Ширина рамы	0.85	m	1
cmpwqnwae008dd5zki0nu5hn1	cmpu216ng002id5ug3p3xiw19	Область применения	Лестничные клетки и интерьеры	\N	2
cmpwqnwae008ed5zk36aimbxc	cmpu216ng002id5ug3p3xiw19	Материал	Алюминий	\N	3
cmpwqnwae008fd5zk977dwv6o	cmpu216nh002kd5ugmw8ldssu	Примечание по осмотру	Инвентаризация и аудит стопорных штифтов	\N	0
cmpwqnwae008gd5zkl4qf4qve	cmpu216nh002kd5ugmw8ldssu	Рабочая высота	5.4	m	1
cmpwqnwae008hd5zkoppc0f7c	cmpu216nh002kd5ugmw8ldssu	Ширина платформы	0.75	m	2
cmpwqnwae008id5zkqpp8j95d	cmpu216nh002kd5ugmw8ldssu	Материал	Алюминий	\N	3
cmpwqnwae008jd5zk432e9yac	cmpu216ni002md5ugaac4trp1	Архивная заметка	Не предлагается для новых аренд	\N	0
cmpwqnwae008kd5zkpy4ksvvs	cmpu216ni002md5ugaac4trp1	Рабочая высота	12	m	1
cmpwqnwae008ld5zkwv4tfdwi	cmpu216ni002md5ugaac4trp1	Материал	Сталь	\N	2
cmpwqnwae008md5zkwf5481sz	cmpu216ni002md5ugaac4trp1	Разделы	Комплект фасадного каркаса	\N	3
cmpwqnwae008nd5zkmvvyqckz	cmpu216ni002od5ugcfr8ytc8	Сварочный ток	200	A	0
cmpwqnwae008od5zknt54pe04	cmpu216ni002od5ugcfr8ytc8	Диаметр электрода	4	mm	1
cmpwqnwae008pd5zk2au03ghu	cmpu216ni002od5ugcfr8ytc8	Входное напряжение	220	V	2
cmpwqnwae008qd5zkda41jzw2	cmpu216ni002od5ugcfr8ytc8	Класс защиты	IP23S	\N	3
cmpwqnwae008rd5zkv0zodoz9	cmpu216nj002qd5ug3rjdm07r	Сварочный ток	200	A	0
cmpwqnwae008sd5zkmbwy8m59	cmpu216nj002qd5ug3rjdm07r	Продолжительность включения	60	%	1
cmpwqnwae008td5zk3sup7dhj	cmpu216nj002qd5ug3rjdm07r	Горячий старт	Да	\N	2
cmpwqnwae008ud5zkp9csdi7p	cmpu216nj002qd5ug3rjdm07r	Сила дуги	Регулируемый	\N	3
cmpwqnwae008vd5zkbxse2pj7	cmpu216nl002sd5uga8ohegg9	Сварочный ток	200	A	0
cmpwqnwae008wd5zkokqgv66d	cmpu216nl002sd5uga8ohegg9	Отображать	Цифровой	\N	1
cmpwqnwae008xd5zkn0ntaldr	cmpu216nl002sd5uga8ohegg9	Диаметр электрода	5	mm	2
cmpwqnwae008yd5zksxgfyjt6	cmpu216nl002sd5uga8ohegg9	Охлаждение	Принудительная вентиляция	\N	3
cmpwqnwae008zd5zksv3mpsmz	cmpu216nl002ud5ugscckzjwu	Примечание по обслуживанию	Проверка вентилятора и кабеля	\N	0
cmpwqnwae0090d5zkgz5dxidc	cmpu216nl002ud5ugscckzjwu	Сварочный ток	220	A	1
cmpwqnwae0091d5zkk19zkfwr	cmpu216nl002ud5ugscckzjwu	Диапазон напряжения	140-260	V	2
cmpwqnwae0092d5zkepcapqu2	cmpu216nl002ud5ugscckzjwu	Охлаждение	Принужденный	\N	3
cmpwqnwae0093d5zkicfcg93o	cmpu216nn002wd5ugx53nijsp	Сварочный ток	250	A	0
cmpwqnwae0094d5zk0vw35qqc	cmpu216nn002wd5ugx53nijsp	Продолжительность включения	60	%	1
cmpwqnwae0095d5zk5sudpedi	cmpu216nn002wd5ugx53nijsp	Диаметр электрода	6	mm	2
cmpwqnwae0096d5zkam1zhp7q	cmpu216nn002wd5ugx53nijsp	Область применения	Тяжёлые металлические профили	\N	3
cmpwqnwae0097d5zk7wjbp3vm	cmpu216no002yd5ugw5q3lswn	Диаметр диска	350	mm	0
cmpwqnwae0098d5zk1se8md8w	cmpu216no002yd5ugw5q3lswn	Глубина резания	125	mm	1
cmpwqnwae0099d5zkequ0nts4	cmpu216no002yd5ugw5q3lswn	Тип двигателя	Бензин	\N	2
cmpwqnwae009ad5zks77s91j8	cmpu216no002yd5ugw5q3lswn	Подключение воды	Да	\N	3
cmpwqnwae009bd5zkpiiy87t7	cmpu216np0030d5ugfq63q4af	Диаметр диска	350	mm	0
cmpwqnwae009cd5zkfs4rmkfu	cmpu216np0030d5ugfq63q4af	Глубина резания	125	mm	1
cmpwqnwae009dd5zki6ul0wo5	cmpu216np0030d5ugfq63q4af	Источник питания	Бензин	\N	2
cmpwqnwae009ed5zkv2uakv4h	cmpu216np0030d5ugfq63q4af	Вариант использования	Бетон и сталь	\N	3
cmpwqnwae009fd5zkeqif81a1	cmpu216nq0032d5ugzw6k0y5s	Диаметр лезвия	305	mm	0
cmpwqnwae009gd5zkohpurjvy	cmpu216nq0032d5ugzw6k0y5s	Тип резки	Холодная нарезка	\N	1
cmpwqnwae009hd5zk2ivmwalt	cmpu216nq0032d5ugzw6k0y5s	Материал	Металлические профили	\N	2
cmpwqnwae009id5zkbigckuh8	cmpu216nq0032d5ugzw6k0y5s	Источник питания	220	V	3
cmpwqnwae009jd5zkgzvmuh2p	cmpu216nr0034d5ugmb25ejc3	Набор лезвий	Двойной диск	\N	0
cmpwqnwae009kd5zk61qf7dkf	cmpu216nr0034d5ugmb25ejc3	Ширина резки	10-40	mm	1
cmpwqnwae009ld5zkdxwl2dfg	cmpu216nr0034d5ugmb25ejc3	Примечание по ремонту	Замена защиты лезвия	\N	2
cmpwqnwae009md5zklf95f04t	cmpu216nr0034d5ugmb25ejc3	Удаление пыли	Поддерживается	\N	3
cmpwqnwae009nd5zktavaewnb	cmpu216ns0036d5ug0xnnwuav	Архивная заметка	Только исторические записи	\N	0
cmpwqnwae009od5zkh12tgbql	cmpu216ns0036d5ug0xnnwuav	Диаметр диска	500	mm	1
cmpwqnwae009pd5zkwpy0lzdr	cmpu216ns0036d5ug0xnnwuav	Тип двигателя	Бензин	\N	2
cmpwqnwae009qd5zkkeeyc81q	cmpu216ns0036d5ug0xnnwuav	Вариант использования	Дорожный ремонт	\N	3
cmpwqnwae009rd5zk812bohp4	cmpu216ns0038d5ugivrykrme	Диапазон	30	m	0
cmpwqnwae009sd5zktr9wgxn2	cmpu216ns0038d5ugivrykrme	Цвет луча	Зеленый	\N	1
cmpwqnwae009td5zkr7bg06iw	cmpu216ns0038d5ugivrykrme	Точность	+/- 0.2	mm/m	2
cmpwqnwae009ud5zk9hyukmdw	cmpu216ns0038d5ugivrykrme	Bluetooth	Да	\N	3
cmpwqnwae009vd5zkbx7vnbsu	cmpu216nt003ad5ugcgyrtsjo	Диапазон	800	m	0
cmpwqnwae009wd5zkk86mtl7t	cmpu216nt003ad5ugcgyrtsjo	Защита	IP67	\N	1
cmpwqnwae009xd5zkj5rx9ko3	cmpu216nt003ad5ugcgyrtsjo	Точность	+/- 1.5	мм на 30 м	2
cmpwqnwae009yd5zk2echrjjj	cmpu216nt003ad5ugcgyrtsjo	Область применения	Наружная сортировка	\N	3
cmpwqnwae009zd5zkjnsbjuix	cmpu216nu003cd5ugz8tfmbiy	Диапазон	100	m	0
cmpwqnwae00a0d5zk4psjvljj	cmpu216nu003cd5ugz8tfmbiy	Точность	+/- 1.5	mm	1
cmpwqnwae00a1d5zk5wdlxvsr	cmpu216nu003cd5ugz8tfmbiy	Отображать	с подсветкой	\N	2
cmpwqnwae00a2d5zk61imx2zp	cmpu216nu003cd5ugz8tfmbiy	Функции	Площадь и объем	\N	3
cmpwqnwae00a3d5zk28grvobk	cmpu216nv003ed5ugrwn6xnla	Примечание по калибровке	Ожидание калибровки	\N	0
cmpwqnwae00a4d5zklj2j0bql	cmpu216nv003ed5ugrwn6xnla	Диапазон	20	m	1
cmpwqnwae00a5d5zkx41e3062	cmpu216nv003ed5ugrwn6xnla	Балочные плоскости	1 х 360 градусов	\N	2
cmpwqnwae00a6d5zkdrsolekd	cmpu216nv003ed5ugrwn6xnla	Резьба для штатива	1/4	\N	3
cmpwqnwae00a7d5zkf1raxxuo	cmpu216nx003gd5ug6jpvmysq	Угловая точность	5	сек	0
cmpwqnwae00a8d5zk3v3zmmks	cmpu216nx003gd5ug6jpvmysq	Диапазон с призмой	3000	m	1
cmpwqnwae00a9d5zku3gw0710	cmpu216nx003gd5ug6jpvmysq	Хранилище	Внутренняя память	\N	2
cmpwqnwae00aad5zkzo2xhs5j	cmpu216nx003gd5ug6jpvmysq	Вариант использования	План строительства	\N	3
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Favorite" (id, "userId", "equipmentId", "createdAt") FROM stdin;
cmpwqnwdx00f5d5zkqaw432fe	cmpu2165a0003d5ugp81cvo3c	cmpu216mb0010d5ugzabpsrkm	2026-06-02 14:34:31.221
cmpwqnwdx00f6d5zkzzyw6zm5	cmpu2166y0005d5ugb4frzf2f	cmpu216mq0016d5ugpx6o8yxs	2026-06-02 14:34:31.221
cmpwqnwdx00f7d5zkebkjdnnw	cmpu2168h0007d5ugnf2jgise	cmpu216mu001ed5ug5aodaewy	2026-06-02 14:34:31.221
cmpwqnwdx00f8d5zk8tf8hxw2	cmpu2169y0009d5ugfhga2ez2	cmpu216mx001kd5ug4h49hfpn	2026-06-02 14:34:31.221
cmpwqnwdx00f9d5zk04k43jna	cmpu216bg000bd5ugd2qb3qvf	cmpu216n2001sd5ugmcaje11z	2026-06-02 14:34:31.221
cmpwqnwdx00fad5zk3lc5souo	cmpu216cy000dd5uglc96kk2d	cmpu216n6001yd5ugu0fr6hvo	2026-06-02 14:34:31.221
cmpwqnwdx00fbd5zkrxg13czz	cmpu216ee000fd5ug53k7bbtd	cmpu216na0026d5uggtjk00n5	2026-06-02 14:34:31.221
cmpwqnwdx00fcd5zksqlov0kz	cmpu216fw000hd5ug1jlu1bgl	cmpu216nd002cd5ug21i5wbkv	2026-06-02 14:34:31.221
cmpwqnwdx00fdd5zk32wvyxv2	cmpu216hd000jd5ugc1fzmsz3	cmpu216nh002kd5ugmw8ldssu	2026-06-02 14:34:31.221
cmpwqnwdx00fed5zkel98mcti	cmpu216iv000ld5ug1eear6f0	cmpu216nl002sd5uga8ohegg9	2026-06-02 14:34:31.221
cmpwqnwdx00ffd5zkyey0vrxn	cmpu216kd000nd5ugzsuleofa	cmpu216np0030d5ugfq63q4af	2026-06-02 14:34:31.221
cmpwqnwdx00fgd5zktlmqgn0r	cmpu216lu000pd5ugwgq7vwpc	cmpu216ns0038d5ugivrykrme	2026-06-02 14:34:31.221
cmpwqnwdx00fhd5zkl6dxivlh	cmpu2165a0003d5ugp81cvo3c	cmpu216nx003gd5ug6jpvmysq	2026-06-02 14:34:31.221
cmpwqnwdx00fid5zkcwmcrqdy	cmpu2166y0005d5ugb4frzf2f	cmpu216mp0014d5ugu0lz927j	2026-06-02 14:34:31.221
cmpwqnwdx00fjd5zkapjmo87u	cmpu2168h0007d5ugnf2jgise	cmpu216mt001cd5ug9xa7nqhf	2026-06-02 14:34:31.221
cmpwqnwdx00fkd5zk54msrtqj	cmpu2169y0009d5ugfhga2ez2	cmpu216mw001id5ughgbdbbke	2026-06-02 14:34:31.221
cmpwqnwdx00fld5zkvt997kyn	cmpu216bg000bd5ugd2qb3qvf	cmpu216n0001qd5ugicavws33	2026-06-02 14:34:31.221
cmpwqnwdx00fmd5zkciqz16y4	cmpu216cy000dd5uglc96kk2d	cmpu216n5001wd5ugfjewtyji	2026-06-02 14:34:31.221
cmpwqnwdx00fnd5zk9n339de3	cmpu216ee000fd5ug53k7bbtd	cmpu216n90024d5ugqss61ynu	2026-06-02 14:34:31.221
cmpwqnwdx00fod5zkfxbgromw	cmpu216fw000hd5ug1jlu1bgl	cmpu216nc002ad5ugd8hcmskj	2026-06-02 14:34:31.221
cmpwqnwdx00fpd5zknnjufpjm	cmpu216hd000jd5ugc1fzmsz3	cmpu216ng002id5ug3p3xiw19	2026-06-02 14:34:31.221
cmpwqnwdx00fqd5zkvb7z8xv5	cmpu216iv000ld5ug1eear6f0	cmpu216nj002qd5ug3rjdm07r	2026-06-02 14:34:31.221
cmpwqnwdx00frd5zk2qrt76j9	cmpu216kd000nd5ugzsuleofa	cmpu216no002yd5ugw5q3lswn	2026-06-02 14:34:31.221
cmpwqnwdx00fsd5zku9erx8f2	cmpu216lu000pd5ugwgq7vwpc	cmpu216nr0034d5ugmb25ejc3	2026-06-02 14:34:31.221
cmpwqnwdx00ftd5zkhj8nfp43	cmpu2165a0003d5ugp81cvo3c	cmpu216nv003ed5ugrwn6xnla	2026-06-02 14:34:31.221
cmpwqnwdx00fud5zkq5fpy7of	cmpu2166y0005d5ugb4frzf2f	cmpu216mo0012d5ugujtqybh2	2026-06-02 14:34:31.221
cmpwqnwdx00fvd5zkd0vxz3tn	cmpu2168h0007d5ugnf2jgise	cmpu216ms001ad5ugemfo87rh	2026-06-02 14:34:31.221
cmpwqnwdx00fwd5zkjq5gf6sk	cmpu2169y0009d5ugfhga2ez2	cmpu216mv001gd5ugfa8f7hth	2026-06-02 14:34:31.221
cmpwqnwdx00fxd5zkasvid76v	cmpu216bg000bd5ugd2qb3qvf	cmpu216mz001od5ug0u5b0jol	2026-06-02 14:34:31.221
cmpwqnwdx00fyd5zkeqn2xh10	cmpu216cy000dd5uglc96kk2d	cmpu216n4001ud5ugmt8r8aee	2026-06-02 14:34:31.221
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, "rentalOrderId", amount, status, method, "paidAt", "createdAt", "updatedAt") FROM stdin;
cmpwqnwev00h3d5zkhm4fhapu	cmpwqnwby00acd5zki7pe2cor	710.00	FAILED	BANK_TRANSFER_MOCK	\N	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00h4d5zkzy9k4b2t	cmpwqnwch00agd5zkyvw3qd5q	799.00	PAID	CASH	2026-06-02 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00h5d5zkmlezvm3t	cmpwqnwcj00ald5zkh4qctg4j	1916.00	PAID	CARD_MOCK	2026-05-26 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00h6d5zkkph151kn	cmpwqnwcl00ard5zkbzu0zb6p	665.00	PAID	CASH	2026-04-14 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00h7d5zkb970f4xq	cmpwqnwcm00avd5zkasxo0ic1	1180.00	REFUNDED	CARD_MOCK	2026-05-15 10:00:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00h8d5zkqirxpaa5	cmpwqnwco00b0d5zkvizm8nll	3633.00	PENDING	CARD_MOCK	\N	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00h9d5zkn2kxh2pd	cmpwqnwcp00b6d5zk7s0kb6h7	640.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00had5zko6nzy0sb	cmpwqnwcq00bad5zkf5d7hpo5	1707.00	PAID	CASH	2026-04-18 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hbd5zk5lq7qynm	cmpwqnwcs00bfd5zk657ls684	2025.00	PAID	CARD_MOCK	2026-05-26 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hcd5zkee9q5kzj	cmpwqnwcu00bpd5zk66iubjql	2062.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hdd5zkszwmwcqw	cmpwqnwcw00bud5zkub8gms3o	1457.00	PAID	CARD_MOCK	2026-06-06 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hed5zk4ml81769	cmpwqnwcx00c0d5zkz4v8i85r	602.00	PAID	CASH	2026-04-23 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hfd5zks5ec7i94	cmpwqnwcz00c4d5zkbwyns79d	930.00	REFUNDED	CARD_MOCK	2026-05-24 10:00:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hgd5zkbu6nfdm9	cmpwqnwd000c9d5zk9taaipv3	2916.00	PAID	CASH	2026-05-26 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hhd5zkjzhpr4xo	cmpwqnwd100cfd5zkq12m2erb	409.00	PENDING	CARD_MOCK	\N	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hid5zkzjh8d084	cmpwqnwd300cjd5zkfgymxfg3	538.00	PENDING	BANK_TRANSFER_MOCK	\N	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hjd5zkuawy5z0n	cmpwqnwd500cod5zkb2rpvc4a	2163.00	PAID	CARD_MOCK	2026-04-28 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hkd5zkph04faj9	cmpwqnwd600cud5zkpi9naduq	1056.00	PENDING	CARD_MOCK	\N	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hld5zknr6n0z08	cmpwqnwd700cyd5zka6xoxh1n	978.00	PAID	CARD_MOCK	2026-05-27 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
cmpwqnwev00hmd5zkmsrv1gel	cmpwqnwd900d3d5zkjs6uo94f	1612.00	PAID	CASH	2026-05-01 08:30:00	2026-06-02 14:34:31.255	2026-06-02 14:34:31.255
\.


--
-- Data for Name: RentalOrder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RentalOrder" (id, "userId", "orderNumber", status, "startDate", "endDate", "deliveryType", "deliveryAddress", "customerComment", "managerComment", subtotal, "depositTotal", "deliveryPrice", "totalPrice", "createdAt", "updatedAt") FROM stdin;
cmpwqnwda00d9d5zku9uf0f07	cmpu216iv000ld5ug1eear6f0	BR-202605-0022	CANCELLED	2026-06-01 00:00:00	2026-06-03 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Заявка отменена по просьбе клиента после изменения графика работ.	330.00	520.00	25.00	875.00	2026-06-02 14:34:31.199	2026-06-02 14:34:31.199
cmpwqnwdb00ddd5zkaie4mrer	cmpu216kd000nd5ugzsuleofa	BR-202605-0023	APPROVED	2026-06-05 00:00:00	2026-06-09 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка подтверждена после проверки остатков и контактных данных.	640.00	635.00	0.00	1275.00	2026-06-02 14:34:31.2	2026-06-02 14:34:31.2
cmpwqnwdd00did5zk4co2qt05	cmpu216lu000pd5ugwgq7vwpc	BR-202605-0024	PENDING	2026-06-08 00:00:00	2026-06-13 23:59:59.999	DELIVERY	Минск, улица Купревича, 1, сервисный проезд технопарка	Бригада работает только по будням.	\N	1800.00	1530.00	25.00	3355.00	2026-06-02 14:34:31.201	2026-06-02 14:34:31.201
cmpwqnwde00dod5zkn9vehi0t	cmpu2165a0003d5ugp81cvo3c	BR-202605-0025	COMPLETED	2026-05-05 00:00:00	2026-05-10 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Техника возвращена и проверена складской командой.	816.00	680.00	0.00	1496.00	2026-06-02 14:34:31.203	2026-06-02 14:34:31.203
cmpwqnwdf00dsd5zkvmvprsqj	cmpu2166y0005d5ugb4frzf2f	BR-202605-0026	REJECTED	2026-06-03 00:00:00	2026-06-04 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Отклонено из-за пересечения с техническим обслуживанием оборудования.	440.00	1160.00	25.00	1625.00	2026-06-02 14:34:31.204	2026-06-02 14:34:31.204
cmpwqnwdg00dxd5zky361coe1	cmpu2168h0007d5ugnf2jgise	BR-202605-0027	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1056.00	640.00	0.00	1696.00	2026-06-02 14:34:31.205	2026-06-02 14:34:31.205
cmpwqnwdi00e3d5zk9m5qajcn	cmpu2169y0009d5ugfhga2ez2	BR-202605-0028	APPROVED	2026-06-04 00:00:00	2026-06-08 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Заявка подтверждена после проверки остатков и контактных данных.	475.00	500.00	25.00	1000.00	2026-06-02 14:34:31.206	2026-06-02 14:34:31.206
cmpwqnwdj00e7d5zkkbgi2edr	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0029	PENDING	2026-06-13 00:00:00	2026-06-18 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	1224.00	1020.00	0.00	2244.00	2026-06-02 14:34:31.208	2026-06-02 14:34:31.208
cmpwqnwdl00ecd5zkwsrialwt	cmpu216cy000dd5uglc96kk2d	BR-202605-0030	COMPLETED	2026-05-10 00:00:00	2026-05-15 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	Техника возвращена и проверена складской командой.	1392.00	1110.00	25.00	2527.00	2026-06-02 14:34:31.209	2026-06-02 14:34:31.209
cmpwqnwdm00eid5zky93i5rtr	cmpu216ee000fd5ug53k7bbtd	BR-202605-0031	CANCELLED	2026-06-10 00:00:00	2026-06-11 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Заявка отменена по просьбе клиента после изменения графика работ.	180.00	410.00	0.00	590.00	2026-06-02 14:34:31.21	2026-06-02 14:34:31.21
cmpwqnwdn00emd5zk6fdwextj	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0032	APPROVED	2026-06-02 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Заявка подтверждена после проверки остатков и контактных данных.	428.00	520.00	25.00	973.00	2026-06-02 14:34:31.212	2026-06-02 14:34:31.212
cmpwqnwdp00erd5zkih4xlzff	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0033	ACTIVE	2026-05-26 00:00:00	2026-06-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	784.00	490.00	0.00	1274.00	2026-06-02 14:34:31.213	2026-06-02 14:34:31.213
cmpwqnwdq00exd5zk1ygrl02t	cmpu216iv000ld5ug1eear6f0	BR-202605-0034	COMPLETED	2026-05-14 00:00:00	2026-05-18 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Техника возвращена и проверена складской командой.	120.00	120.00	25.00	265.00	2026-06-02 14:34:31.215	2026-06-02 14:34:31.215
cmpwqnwds00f1d5zkdcn1zus5	cmpu216kd000nd5ugzsuleofa	BR-202605-0035	PENDING	2026-06-09 00:00:00	2026-06-15 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	1050.00	740.00	0.00	1790.00	2026-06-02 14:34:31.216	2026-06-02 14:34:31.216
cmpwqnwby00acd5zki7pe2cor	cmpu2165a0003d5ugp81cvo3c	BR-202605-0001	PENDING	2026-06-05 00:00:00	2026-06-07 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Ожидаем финальное подтверждение по времени получения.	270.00	440.00	0.00	710.00	2026-06-02 14:34:31.151	2026-06-02 14:34:31.151
cmpwqnwch00agd5zkyvw3qd5q	cmpu2166y0005d5ugb4frzf2f	BR-202605-0002	APPROVED	2026-06-02 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Заявка подтверждена после проверки остатков и контактных данных.	344.00	430.00	25.00	799.00	2026-06-02 14:34:31.169	2026-06-02 14:34:31.169
cmpwqnwcj00ald5zkh4qctg4j	cmpu2168h0007d5ugnf2jgise	BR-202605-0003	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1176.00	740.00	0.00	1916.00	2026-06-02 14:34:31.171	2026-06-02 14:34:31.171
cmpwqnwcl00ard5zkbzu0zb6p	cmpu2169y0009d5ugfhga2ez2	BR-202605-0004	COMPLETED	2026-04-14 00:00:00	2026-04-18 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Техника возвращена и проверена складской командой.	320.00	320.00	25.00	665.00	2026-06-02 14:34:31.173	2026-06-02 14:34:31.173
cmpwqnwcm00avd5zkasxo0ic1	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0005	CANCELLED	2026-05-15 00:00:00	2026-05-20 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка отменена по просьбе клиента после изменения графика работ.	1452.00	1180.00	0.00	2632.00	2026-06-02 14:34:31.175	2026-06-02 14:34:31.175
cmpwqnwco00b0d5zkvizm8nll	cmpu216cy000dd5uglc96kk2d	BR-202605-0006	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	\N	1338.00	2270.00	25.00	3633.00	2026-06-02 14:34:31.176	2026-06-02 14:34:31.176
cmpwqnwcp00b6d5zk7s0kb6h7	cmpu216ee000fd5ug53k7bbtd	BR-202605-0007	APPROVED	2026-06-01 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Заявка подтверждена после проверки остатков и контактных данных.	280.00	360.00	0.00	640.00	2026-06-02 14:34:31.178	2026-06-02 14:34:31.178
cmpwqnwcq00bad5zkf5d7hpo5	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0008	COMPLETED	2026-04-18 00:00:00	2026-04-21 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Техника возвращена и проверена складской командой.	752.00	930.00	25.00	1707.00	2026-06-02 14:34:31.179	2026-06-02 14:34:31.179
cmpwqnwcs00bfd5zk657ls684	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0009	ACTIVE	2026-05-26 00:00:00	2026-06-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1240.00	785.00	0.00	2025.00	2026-06-02 14:34:31.18	2026-06-02 14:34:31.18
cmpwqnwct00bld5zk9ndd01kd	cmpu216iv000ld5ug1eear6f0	BR-202605-0010	REJECTED	2026-06-03 00:00:00	2026-06-08 23:59:59.999	DELIVERY	Минск, улица Аэродромная, 13, зона башенного крана	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Отклонено из-за пересечения с техническим обслуживанием оборудования.	360.00	300.00	25.00	685.00	2026-06-02 14:34:31.182	2026-06-02 14:34:31.182
cmpwqnwcu00bpd5zk66iubjql	cmpu216kd000nd5ugzsuleofa	BR-202605-0011	PENDING	2026-06-05 00:00:00	2026-06-07 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	\N	762.00	1300.00	0.00	2062.00	2026-06-02 14:34:31.183	2026-06-02 14:34:31.183
cmpwqnwcw00bud5zkub8gms3o	cmpu216lu000pd5ugwgq7vwpc	BR-202605-0012	APPROVED	2026-06-06 00:00:00	2026-06-09 23:59:59.999	DELIVERY	Минск, улица Купревича, 1, сервисный проезд технопарка	Бригада работает только по будням.	Заявка подтверждена после проверки остатков и контактных данных.	632.00	800.00	25.00	1457.00	2026-06-02 14:34:31.184	2026-06-02 14:34:31.184
cmpwqnwcx00c0d5zkz4v8i85r	cmpu2165a0003d5ugp81cvo3c	BR-202605-0013	COMPLETED	2026-04-23 00:00:00	2026-04-26 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Техника возвращена и проверена складской командой.	272.00	330.00	0.00	602.00	2026-06-02 14:34:31.186	2026-06-02 14:34:31.186
cmpwqnwcz00c4d5zkbwyns79d	cmpu2166y0005d5ugb4frzf2f	BR-202605-0014	CANCELLED	2026-05-24 00:00:00	2026-05-28 23:59:59.999	DELIVERY	Минск, улица Притыцкого, 48, складской двор	Техника нужна под плотный график отделочных работ.	Заявка отменена по просьбе клиента после изменения графика работ.	930.00	930.00	25.00	1885.00	2026-06-02 14:34:31.187	2026-06-02 14:34:31.187
cmpwqnwd000c9d5zk9taaipv3	cmpu2168h0007d5ugnf2jgise	BR-202605-0015	ACTIVE	2026-05-26 00:00:00	2026-06-04 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Аренда в процессе, оборудование зарезервировано за клиентом.	1736.00	1180.00	0.00	2916.00	2026-06-02 14:34:31.188	2026-06-02 14:34:31.188
cmpwqnwd100cfd5zkq12m2erb	cmpu2169y0009d5ugfhga2ez2	BR-202605-0016	PENDING	2026-06-10 00:00:00	2026-06-12 23:59:59.999	DELIVERY	Брест, улица Московская, 212, площадка 4	Подскажите, пожалуйста, нужен ли удлинитель для подключения.	Ожидаем финальное подтверждение по времени получения.	144.00	240.00	25.00	409.00	2026-06-02 14:34:31.19	2026-06-02 14:34:31.19
cmpwqnwd300cjd5zkfgymxfg3	cmpu216bg000bd5ugd2qb3qvf	BR-202605-0017	APPROVED	2026-06-05 00:00:00	2026-06-08 23:59:59.999	PICKUP	\N	Позвоните за час до доставки.	Заявка подтверждена после проверки остатков и контактных данных.	248.00	290.00	0.00	538.00	2026-06-02 14:34:31.192	2026-06-02 14:34:31.192
cmpwqnwd500cod5zkb2rpvc4a	cmpu216cy000dd5uglc96kk2d	BR-202605-0018	COMPLETED	2026-04-28 00:00:00	2026-05-01 23:59:59.999	DELIVERY	Гомель, улица Советская, 118, задний подъезд для разгрузки	Бригада работает только по будням.	Техника возвращена и проверена складской командой.	968.00	1170.00	25.00	2163.00	2026-06-02 14:34:31.193	2026-06-02 14:34:31.193
cmpwqnwd600cud5zkpi9naduq	cmpu216ee000fd5ug53k7bbtd	BR-202605-0019	PENDING	2026-06-13 00:00:00	2026-06-18 23:59:59.999	PICKUP	\N	Подтвердите, пожалуйста, выдачу в первой половине дня.	Ожидаем финальное подтверждение по времени получения.	576.00	480.00	0.00	1056.00	2026-06-02 14:34:31.194	2026-06-02 14:34:31.194
cmpwqnwd700cyd5zka6xoxh1n	cmpu216fw000hd5ug1jlu1bgl	BR-202605-0020	ACTIVE	2026-05-27 00:00:00	2026-06-05 23:59:59.999	DELIVERY	Витебск, улица Ленина, 26, муниципальная ремонтная база	Техника нужна под плотный график отделочных работ.	Аренда в процессе, оборудование зарезервировано за клиентом.	553.00	400.00	25.00	978.00	2026-06-02 14:34:31.196	2026-06-02 14:34:31.196
cmpwqnwd900d3d5zkjs6uo94f	cmpu216hd000jd5ugc1fzmsz3	BR-202605-0021	COMPLETED	2026-05-01 00:00:00	2026-05-02 23:59:59.999	PICKUP	\N	Доступ на объект открыт после 09:00.	Техника возвращена и проверена складской командой.	472.00	1140.00	0.00	1612.00	2026-06-02 14:34:31.197	2026-06-02 14:34:31.197
\.


--
-- Data for Name: RentalOrderItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RentalOrderItem" (id, "rentalOrderId", "equipmentId", quantity, "dailyPrice", "daysCount", "lineTotal", "createdAt") FROM stdin;
cmpwqnwby00aed5zko4c0t3vs	cmpwqnwby00acd5zki7pe2cor	cmpu216mb0010d5ugzabpsrkm	2	45.00	3	710.00	2026-06-02 14:34:31.151
cmpwqnwch00aid5zkqn4z3ido	cmpwqnwch00agd5zkyvw3qd5q	cmpu216mp0014d5ugu0lz927j	1	48.00	4	432.00	2026-06-02 14:34:31.169
cmpwqnwch00ajd5zkf853ds4w	cmpwqnwch00agd5zkyvw3qd5q	cmpu216mw001id5ughgbdbbke	1	38.00	4	342.00	2026-06-02 14:34:31.169
cmpwqnwcj00and5zk2c1pexws	cmpwqnwcj00ald5zkh4qctg4j	cmpu216ms001ad5ugemfo87rh	1	35.00	8	460.00	2026-06-02 14:34:31.171
cmpwqnwcj00aod5zkg9yapo47	cmpwqnwcj00ald5zkh4qctg4j	cmpu216my001md5ugh8znvup9	1	44.00	8	572.00	2026-06-02 14:34:31.171
cmpwqnwcj00apd5zkdmyar4ze	cmpwqnwcj00ald5zkh4qctg4j	cmpu216n6001yd5ugu0fr6hvo	1	68.00	8	884.00	2026-06-02 14:34:31.171
cmpwqnwcl00atd5zktf5vxrvg	cmpwqnwcl00ard5zkbzu0zb6p	cmpu216mu001ed5ug5aodaewy	2	32.00	5	640.00	2026-06-02 14:34:31.173
cmpwqnwcm00axd5zkcycnvgje	cmpwqnwcm00avd5zkasxo0ic1	cmpu216mx001kd5ug4h49hfpn	2	55.00	6	1180.00	2026-06-02 14:34:31.175
cmpwqnwcm00ayd5zk4y6ncoak	cmpwqnwcm00avd5zkasxo0ic1	cmpu216n5001wd5ugfjewtyji	2	66.00	6	1452.00	2026-06-02 14:34:31.175
cmpwqnwco00b2d5zk4idd7lvf	cmpwqnwco00b0d5zkvizm8nll	cmpu216mz001od5ug0u5b0jol	2	46.00	3	706.00	2026-06-02 14:34:31.176
cmpwqnwco00b3d5zk93dgf0j4	cmpwqnwco00b0d5zkvizm8nll	cmpu216n80022d5ug8rmjz67e	2	82.00	3	1332.00	2026-06-02 14:34:31.176
cmpwqnwco00b4d5zkzmiq4maf	cmpwqnwco00b0d5zkvizm8nll	cmpu216ne002ed5ug1748imv1	2	95.00	3	1570.00	2026-06-02 14:34:31.176
cmpwqnwcp00b8d5zkl5dhe5i8	cmpwqnwcp00b6d5zk7s0kb6h7	cmpu216n4001ud5ugmt8r8aee	1	70.00	4	640.00	2026-06-02 14:34:31.178
cmpwqnwcq00bcd5zkfqmwiyxj	cmpwqnwcq00bad5zkf5d7hpo5	cmpu216n6001yd5ugu0fr6hvo	2	68.00	4	1224.00	2026-06-02 14:34:31.179
cmpwqnwcq00bdd5zkbdjumrih	cmpwqnwcq00bad5zkf5d7hpo5	cmpu216nd002cd5ug21i5wbkv	2	26.00	4	458.00	2026-06-02 14:34:31.179
cmpwqnwcs00bhd5zktuziaeb1	cmpwqnwcs00bfd5zk657ls684	cmpu216n90024d5ugqss61ynu	1	28.00	8	364.00	2026-06-02 14:34:31.18
cmpwqnwcs00bid5zk3b3uvklb	cmpwqnwcs00bfd5zk657ls684	cmpu216nf002gd5ugzceozmj9	1	82.00	8	1096.00	2026-06-02 14:34:31.18
cmpwqnwcs00bjd5zk2c8tmau7	cmpwqnwcs00bfd5zk657ls684	cmpu216nn002wd5ugx53nijsp	1	45.00	8	565.00	2026-06-02 14:34:31.18
cmpwqnwct00bnd5zkl6agxt60	cmpwqnwct00bld5zk9ndd01kd	cmpu216nb0028d5ugquezq4xy	2	30.00	6	660.00	2026-06-02 14:34:31.182
cmpwqnwcu00brd5zktwv32jgb	cmpwqnwcu00bpd5zk66iubjql	cmpu216ne002ed5ug1748imv1	2	95.00	3	1570.00	2026-06-02 14:34:31.183
cmpwqnwcu00bsd5zkne75ja93	cmpwqnwcu00bpd5zk66iubjql	cmpu216nl002sd5uga8ohegg9	2	32.00	3	492.00	2026-06-02 14:34:31.183
cmpwqnwcw00bwd5zko7w985zq	cmpwqnwcw00bud5zkub8gms3o	cmpu216ng002id5ug3p3xiw19	1	88.00	4	812.00	2026-06-02 14:34:31.184
cmpwqnwcw00bxd5zkw7ysttqd	cmpwqnwcw00bud5zkub8gms3o	cmpu216no002yd5ugw5q3lswn	1	58.00	4	512.00	2026-06-02 14:34:31.184
cmpwqnwcw00byd5zk7dd70uib	cmpwqnwcw00bud5zkub8gms3o	cmpu216nu003cd5ugz8tfmbiy	1	12.00	4	108.00	2026-06-02 14:34:31.184
cmpwqnwcx00c2d5zkcd3nzckt	cmpwqnwcx00c0d5zkz4v8i85r	cmpu216nj002qd5ug3rjdm07r	2	34.00	4	602.00	2026-06-02 14:34:31.186
cmpwqnwcz00c6d5zk46n45e4p	cmpwqnwcz00c4d5zkbwyns79d	cmpu216nn002wd5ugx53nijsp	2	45.00	5	860.00	2026-06-02 14:34:31.187
cmpwqnwcz00c7d5zk5y5f6dmg	cmpwqnwcz00c4d5zkbwyns79d	cmpu216nt003ad5ugcgyrtsjo	2	48.00	5	1000.00	2026-06-02 14:34:31.187
cmpwqnwd000cbd5zkqsajhzed	cmpwqnwd000c9d5zk9taaipv3	cmpu216np0030d5ugfq63q4af	1	62.00	8	796.00	2026-06-02 14:34:31.188
cmpwqnwd000ccd5zkg37ujuuy	cmpwqnwd000c9d5zk9taaipv3	cmpu216nx003gd5ug6jpvmysq	1	120.00	8	1660.00	2026-06-02 14:34:31.188
cmpwqnwd000cdd5zk9ttskn48	cmpwqnwd000c9d5zk9taaipv3	cmpu216ms001ad5ugemfo87rh	1	35.00	8	460.00	2026-06-02 14:34:31.188
cmpwqnwd100chd5zkloffi0a4	cmpwqnwd100cfd5zkq12m2erb	cmpu216ns0038d5ugivrykrme	2	24.00	3	384.00	2026-06-02 14:34:31.19
cmpwqnwd300cld5zk0lg2gsv0	cmpwqnwd300cjd5zkfgymxfg3	cmpu216nu003cd5ugz8tfmbiy	1	12.00	4	108.00	2026-06-02 14:34:31.192
cmpwqnwd300cmd5zkfqnlqnuw	cmpwqnwd300cjd5zkfgymxfg3	cmpu216mr0018d5ugf6vg3q9u	1	50.00	4	430.00	2026-06-02 14:34:31.192
cmpwqnwd500cqd5zk8lik896i	cmpwqnwd500cod5zkb2rpvc4a	cmpu216mb0010d5ugzabpsrkm	2	45.00	4	800.00	2026-06-02 14:34:31.193
cmpwqnwd500crd5zkwifnn7t6	cmpwqnwd500cod5zkb2rpvc4a	cmpu216mt001cd5ug9xa7nqhf	2	30.00	4	540.00	2026-06-02 14:34:31.193
cmpwqnwd500csd5zk5zwnbx14	cmpwqnwd500cod5zkb2rpvc4a	cmpu216mz001od5ug0u5b0jol	2	46.00	4	798.00	2026-06-02 14:34:31.193
cmpwqnwd600cwd5zk0tb66bdc	cmpwqnwd600cud5zkpi9naduq	cmpu216mp0014d5ugu0lz927j	2	48.00	6	1056.00	2026-06-02 14:34:31.194
cmpwqnwd700d0d5zks6gwuud2	cmpwqnwd700cyd5zka6xoxh1n	cmpu216ms001ad5ugemfo87rh	1	35.00	7	425.00	2026-06-02 14:34:31.196
cmpwqnwd700d1d5zk0lb94dx9	cmpwqnwd700cyd5zka6xoxh1n	cmpu216my001md5ugh8znvup9	1	44.00	7	528.00	2026-06-02 14:34:31.196
cmpwqnwd900d5d5zkejykgd0p	cmpwqnwd900d3d5zkjs6uo94f	cmpu216mu001ed5ug5aodaewy	2	32.00	2	448.00	2026-06-02 14:34:31.197
cmpwqnwd900d6d5zkx97bdvaq	cmpwqnwd900d3d5zkjs6uo94f	cmpu216n2001sd5ugmcaje11z	2	58.00	2	772.00	2026-06-02 14:34:31.197
cmpwqnwd900d7d5zkt7fc7lp1	cmpwqnwd900d3d5zkjs6uo94f	cmpu216n90024d5ugqss61ynu	2	28.00	2	392.00	2026-06-02 14:34:31.197
cmpwqnwda00dbd5zku64ecyso	cmpwqnwda00d9d5zku9uf0f07	cmpu216mx001kd5ug4h49hfpn	2	55.00	3	850.00	2026-06-02 14:34:31.199
cmpwqnwdb00dfd5zks40nllus	cmpwqnwdb00ddd5zkaie4mrer	cmpu216mz001od5ug0u5b0jol	1	46.00	5	445.00	2026-06-02 14:34:31.2
cmpwqnwdb00dgd5zk2bksx8g6	cmpwqnwdb00ddd5zkaie4mrer	cmpu216n80022d5ug8rmjz67e	1	82.00	5	830.00	2026-06-02 14:34:31.2
cmpwqnwdd00dkd5zk78dsdbl6	cmpwqnwdd00did5zk4co2qt05	cmpu216n4001ud5ugmt8r8aee	2	70.00	6	1560.00	2026-06-02 14:34:31.201
cmpwqnwdd00dld5zkh6l6hqi7	cmpwqnwdd00did5zk4co2qt05	cmpu216na0026d5uggtjk00n5	2	36.00	6	782.00	2026-06-02 14:34:31.201
cmpwqnwdd00dmd5zk9egjnwuu	cmpwqnwdd00did5zk4co2qt05	cmpu216ng002id5ug3p3xiw19	1	88.00	6	988.00	2026-06-02 14:34:31.201
cmpwqnwde00dqd5zkqq111o0o	cmpwqnwde00dod5zkn9vehi0t	cmpu216n6001yd5ugu0fr6hvo	2	68.00	6	1496.00	2026-06-02 14:34:31.203
cmpwqnwdf00dud5zk0g9hxx6g	cmpwqnwdf00dsd5zkvmvprsqj	cmpu216n90024d5ugqss61ynu	2	28.00	2	392.00	2026-06-02 14:34:31.204
cmpwqnwdf00dvd5zkeo3p7u6i	cmpwqnwdf00dsd5zkvmvprsqj	cmpu216nf002gd5ugzceozmj9	2	82.00	2	1208.00	2026-06-02 14:34:31.204
cmpwqnwdg00dzd5zkcl8hxpa5	cmpwqnwdg00dxd5zky361coe1	cmpu216nb0028d5ugquezq4xy	1	30.00	8	390.00	2026-06-02 14:34:31.205
cmpwqnwdh00e0d5zknxo5h254	cmpwqnwdg00dxd5zky361coe1	cmpu216ni002od5ugcfr8ytc8	1	40.00	8	510.00	2026-06-02 14:34:31.205
cmpwqnwdh00e1d5zknopqzyfj	cmpwqnwdg00dxd5zky361coe1	cmpu216np0030d5ugfq63q4af	1	62.00	8	796.00	2026-06-02 14:34:31.205
cmpwqnwdi00e5d5zkiq3psr6v	cmpwqnwdi00e3d5zk9m5qajcn	cmpu216ne002ed5ug1748imv1	1	95.00	5	975.00	2026-06-02 14:34:31.206
cmpwqnwdj00e9d5zk3k06oi3f	cmpwqnwdj00e7d5zkkbgi2edr	cmpu216ng002id5ug3p3xiw19	1	88.00	6	988.00	2026-06-02 14:34:31.208
cmpwqnwdj00ead5zkltgl1kby	cmpwqnwdj00e7d5zkkbgi2edr	cmpu216no002yd5ugw5q3lswn	2	58.00	6	1256.00	2026-06-02 14:34:31.208
cmpwqnwdl00eed5zk9m8ya47h	cmpwqnwdl00ecd5zkwsrialwt	cmpu216nj002qd5ug3rjdm07r	2	34.00	6	738.00	2026-06-02 14:34:31.209
cmpwqnwdl00efd5zkaaidzppi	cmpwqnwdl00ecd5zkwsrialwt	cmpu216nq0032d5ugzw6k0y5s	2	37.00	6	784.00	2026-06-02 14:34:31.209
cmpwqnwdl00egd5zkbapvilng	cmpwqnwdl00ecd5zkwsrialwt	cmpu216mb0010d5ugzabpsrkm	2	45.00	6	980.00	2026-06-02 14:34:31.209
cmpwqnwdm00ekd5zki49nn3q6	cmpwqnwdm00eid5zky93i5rtr	cmpu216nn002wd5ugx53nijsp	2	45.00	2	590.00	2026-06-02 14:34:31.21
cmpwqnwdn00eod5zkdzq4j0uu	cmpwqnwdn00emd5zk6fdwextj	cmpu216np0030d5ugfq63q4af	1	62.00	4	548.00	2026-06-02 14:34:31.212
cmpwqnwdn00epd5zk0694uw1p	cmpwqnwdn00emd5zk6fdwextj	cmpu216mb0010d5ugzabpsrkm	1	45.00	4	400.00	2026-06-02 14:34:31.212
cmpwqnwdp00etd5zkjg6dg5ii	cmpwqnwdp00erd5zkih4xlzff	cmpu216ns0038d5ugivrykrme	1	24.00	8	312.00	2026-06-02 14:34:31.213
cmpwqnwdp00eud5zk7cpr55qe	cmpwqnwdp00erd5zkih4xlzff	cmpu216mo0012d5ugujtqybh2	1	42.00	8	546.00	2026-06-02 14:34:31.213
cmpwqnwdp00evd5zkwozpbody	cmpwqnwdp00erd5zkih4xlzff	cmpu216mu001ed5ug5aodaewy	1	32.00	8	416.00	2026-06-02 14:34:31.213
cmpwqnwdq00ezd5zkcws0v9tl	cmpwqnwdq00exd5zk1ygrl02t	cmpu216nu003cd5ugz8tfmbiy	2	12.00	5	240.00	2026-06-02 14:34:31.215
cmpwqnwds00f3d5zkm1c9naje	cmpwqnwds00f1d5zkdcn1zus5	cmpu216mb0010d5ugzabpsrkm	2	45.00	7	1070.00	2026-06-02 14:34:31.216
cmpwqnwds00f4d5zk4iryrfnu	cmpwqnwds00f1d5zkdcn1zus5	cmpu216mt001cd5ug9xa7nqhf	2	30.00	7	720.00	2026-06-02 14:34:31.216
\.


--
-- Data for Name: Report; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Report" (id, "userId", "rentalOrderId", type, format, title, "fileUrl", "createdAt") FROM stdin;
cmpwqnwf800hnd5zkqfxd260v	cmpu2165a0003d5ugp81cvo3c	cmpwqnwby00acd5zki7pe2cor	ORDER_DOCUMENT	PDF	Документ по заявке BR-202605-0001	\N	2026-06-02 14:34:31.268
cmpwqnwf800hod5zk8j3puiki	cmpu2166y0005d5ugb4frzf2f	cmpwqnwch00agd5zkyvw3qd5q	ORDER_DOCUMENT	DOCX	Документ по заявке BR-202605-0002	\N	2026-06-02 14:34:31.268
cmpwqnwf800hpd5zkw6fe5q8l	cmpu2168h0007d5ugnf2jgise	cmpwqnwcj00ald5zkh4qctg4j	ORDER_DOCUMENT	PDF	Документ по заявке BR-202605-0003	\N	2026-06-02 14:34:31.268
cmpwqnwf800hqd5zk8jikak1l	cmpu2169y0009d5ugfhga2ez2	cmpwqnwcl00ard5zkbzu0zb6p	ORDER_DOCUMENT	DOCX	Документ по заявке BR-202605-0004	\N	2026-06-02 14:34:31.268
cmpwqnwf800hrd5zk0l467i3d	cmpu2165a0003d5ugp81cvo3c	\N	RENTAL_HISTORY	PDF	История аренды: Иван Петров	\N	2026-06-02 14:34:31.268
cmpwqnwf800hsd5zkvnh1tngv	cmpu2166y0005d5ugb4frzf2f	\N	RENTAL_HISTORY	DOCX	История аренды: Павел Сидоров	\N	2026-06-02 14:34:31.268
cmpwqnwf800htd5zktgmizrlp	cmpu2168h0007d5ugnf2jgise	\N	RENTAL_HISTORY	PDF	История аренды: Андрей Козлов	\N	2026-06-02 14:34:31.268
cmpwqnwf800hud5zkrghr7op6	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	PDF	Статистика аренды за квартал	\N	2026-06-02 14:34:31.268
cmpwqnwf800hvd5zkt7s5wzr5	cmptsbj0u0003d500lnh8bwp8	\N	ADMIN_RENTAL_STATISTICS	DOCX	Статистика аренды: подробная выгрузка	\N	2026-06-02 14:34:31.268
cmpwqnwf800hwd5zkcbdenutq	cmptsbj0u0003d500lnh8bwp8	\N	EQUIPMENT_UTILIZATION	PDF	Сводка по использованию оборудования	\N	2026-06-02 14:34:31.268
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Review" (id, "userId", "equipmentId", rating, text, "isPublished", "createdAt", "updatedAt") FROM stdin;
cmpwqnweb00fzd5zknov1j7tc	cmpu2165a0003d5ugp81cvo3c	cmpu216mb0010d5ugzabpsrkm	3	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	f	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g0d5zk4x6cz270	cmpu2166y0005d5ugb4frzf2f	cmpu216mr0018d5ugf6vg3q9u	4	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g1d5zk7ixfwtd8	cmpu2168h0007d5ugnf2jgise	cmpu216mv001gd5ugfa8f7hth	5	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g2d5zkpe45rhs8	cmpu2169y0009d5ugfhga2ez2	cmpu216n0001qd5ugicavws33	3	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g3d5zk4elhaud0	cmpu216bg000bd5ugd2qb3qvf	cmpu216n6001yd5ugu0fr6hvo	4	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g4d5zk6k95sl8t	cmpu216cy000dd5uglc96kk2d	cmpu216na0026d5uggtjk00n5	5	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	f	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g5d5zkvrgo2gy0	cmpu216ee000fd5ug53k7bbtd	cmpu216nf002gd5ugzceozmj9	3	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g6d5zkk89sxuuh	cmpu216fw000hd5ug1jlu1bgl	cmpu216nj002qd5ug3rjdm07r	4	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g7d5zkau45ayt1	cmpu216hd000jd5ugc1fzmsz3	cmpu216no002yd5ugw5q3lswn	5	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g8d5zk66aud2v4	cmpu216iv000ld5ug1eear6f0	cmpu216nt003ad5ugcgyrtsjo	3	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00g9d5zk20un1z91	cmpu216kd000nd5ugzsuleofa	cmpu216mb0010d5ugzabpsrkm	4	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	f	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gad5zk88j5yawj	cmpu216lu000pd5ugwgq7vwpc	cmpu216mr0018d5ugf6vg3q9u	5	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gbd5zkfxii8z19	cmpu2165a0003d5ugp81cvo3c	cmpu216mw001id5ughgbdbbke	3	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gcd5zkocckr0mj	cmpu2166y0005d5ugb4frzf2f	cmpu216n0001qd5ugicavws33	4	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gdd5zknj3xd1w9	cmpu2168h0007d5ugnf2jgise	cmpu216n6001yd5ugu0fr6hvo	5	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00ged5zk1pn3rsg3	cmpu2169y0009d5ugfhga2ez2	cmpu216nb0028d5ugquezq4xy	3	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	f	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gfd5zkjhpykhr7	cmpu216bg000bd5ugd2qb3qvf	cmpu216nf002gd5ugzceozmj9	4	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00ggd5zkhw2x9wcc	cmpu216cy000dd5uglc96kk2d	cmpu216nj002qd5ug3rjdm07r	5	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00ghd5zkzy7bht91	cmpu216ee000fd5ug53k7bbtd	cmpu216np0030d5ugfq63q4af	3	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gid5zkd6xqoaw3	cmpu216fw000hd5ug1jlu1bgl	cmpu216nt003ad5ugcgyrtsjo	4	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gjd5zkd4hfkf31	cmpu216hd000jd5ugc1fzmsz3	cmpu216mb0010d5ugzabpsrkm	5	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	f	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gkd5zk8uwvww6a	cmpu216iv000ld5ug1eear6f0	cmpu216ms001ad5ugemfo87rh	3	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gld5zkadnd574y	cmpu216kd000nd5ugzsuleofa	cmpu216mw001id5ughgbdbbke	4	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gmd5zk72694a95	cmpu216lu000pd5ugwgq7vwpc	cmpu216n0001qd5ugicavws33	5	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gnd5zkcy74gpur	cmpu2165a0003d5ugp81cvo3c	cmpu216n70020d5ugl2fz23t1	3	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00god5zkqjbop0h5	cmpu2166y0005d5ugb4frzf2f	cmpu216nb0028d5ugquezq4xy	4	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	f	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gpd5zkx0ndbvxl	cmpu2168h0007d5ugnf2jgise	cmpu216nf002gd5ugzceozmj9	5	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gqd5zkib173l1x	cmpu2169y0009d5ugfhga2ez2	cmpu216nl002sd5uga8ohegg9	3	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00grd5zk5zdhjhbg	cmpu216bg000bd5ugd2qb3qvf	cmpu216np0030d5ugfq63q4af	4	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gsd5zkt13iglfp	cmpu216cy000dd5uglc96kk2d	cmpu216nt003ad5ugcgyrtsjo	5	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gtd5zkk3n28529	cmpu216ee000fd5ug53k7bbtd	cmpu216mo0012d5ugujtqybh2	3	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	f	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gud5zk0cw1bq7h	cmpu216fw000hd5ug1jlu1bgl	cmpu216ms001ad5ugemfo87rh	4	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gvd5zkwhexye0b	cmpu216hd000jd5ugc1fzmsz3	cmpu216mw001id5ughgbdbbke	5	Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gwd5zkdu362321	cmpu216iv000ld5ug1eear6f0	cmpu216n2001sd5ugmcaje11z	3	Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gxd5zk106iwwvt	cmpu216kd000nd5ugzsuleofa	cmpu216n70020d5ugl2fz23t1	4	Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gyd5zk958hffff	cmpu216lu000pd5ugwgq7vwpc	cmpu216nb0028d5ugquezq4xy	5	Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.	f	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00gzd5zk0piajoeg	cmpu2165a0003d5ugp81cvo3c	cmpu216ng002id5ug3p3xiw19	3	Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00h0d5zk7n0cb1s4	cmpu2166y0005d5ugb4frzf2f	cmpu216nl002sd5uga8ohegg9	4	Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00h1d5zkennv3dmx	cmpu2168h0007d5ugnf2jgise	cmpu216np0030d5ugfq63q4af	5	Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
cmpwqnweb00h2d5zkg4j6x21r	cmpu2169y0009d5ugfhga2ez2	cmpu216nu003cd5ugz8tfmbiy	3	Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.	t	2026-06-02 14:34:31.235	2026-06-02 14:34:31.235
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Role" (id, name, description, "createdAt", "updatedAt") FROM stdin;
cmptsbiyi0000d50016vfokjh	ADMIN	Administrator with full platform access	2026-05-31 12:57:34.651	2026-06-02 14:35:56.858
cmptsbiyx0001d500il354zhy	CLIENT	Client who can browse catalog and place rental orders	2026-05-31 12:57:34.666	2026-06-02 14:35:56.865
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, "fullName", email, phone, "passwordHash", "avatarUrl", "roleId", "isBlocked", "createdAt", "updatedAt") FROM stdin;
cmpu2168h0007d5ugnf2jgise	Андрей Козлов	andrei.kozlov@buildrent.local	+375291110103	$2b$10$c69GW2sfPI4ZTNU1ZY/2FeFowmL8f38ZD03/0WH7IleXUwlM.TTHa	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.762	2026-06-02 14:34:30.484
cmpu2169y0009d5ugfhga2ez2	Максим Морозов	maksim.morozov@buildrent.local	+375291110104	$2b$10$HNBFVC77uxiGrrgE6jArT.SAeUlU69NBL9padw6O.FX/QDvxK6BYO	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.815	2026-06-02 14:34:30.539
cmpu216bg000bd5ugd2qb3qvf	Сергей Волков	sergei.volkov@buildrent.local	+375291110105	$2b$10$8Qn.Y2Xq1mtkESM4JLvpxuAmo96XXP4ZW0U5zwS59wRrKo.6TbGau	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.869	2026-06-02 14:34:30.596
cmpu216cy000dd5uglc96kk2d	Никита Федоров	nikita.fedorov@buildrent.local	+375291110106	$2b$10$qIHEI2oSrboC4p1JBmBD9e/t7htSmYBFZUWreApUcwZaAZqXi0cIy	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.922	2026-06-02 14:34:30.649
cmpu216ee000fd5ug53k7bbtd	Кирилл Смирнов	kirill.smirnov@buildrent.local	+375291110107	$2b$10$1GOsl2O2HXeNp4q5PudLfeO/fFXkga76yX1EcLTn9RPFP2lAuyH/6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.974	2026-06-02 14:34:30.7
cmpu216fw000hd5ug1jlu1bgl	Артём Васильев	artem.vasilev@buildrent.local	+375291110108	$2b$10$sjfw8TevYeZY/x2otUc5iugUmeutkYFKaSrQUjqat/mqrmWI6CaaK	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.028	2026-06-02 14:34:30.753
cmpu216hd000jd5ugc1fzmsz3	Роман Егоров	roman.egorov@buildrent.local	+375291110109	$2b$10$R3X6zMI7sq9Ncx.8lEjYO.YHzJoTW/iB02buxGLaIEkhwoxzTAp9a	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.081	2026-06-02 14:34:30.805
cmpu216iv000ld5ug1eear6f0	Денис Зайцев	denis.zaitsev@buildrent.local	+375291110110	$2b$10$kxFKnDufD9oiaaUibvDTmeRBK6ZpLS4fX3Fog6malbmlOlXrqSRSq	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.135	2026-06-02 14:34:30.858
cmpu216kd000nd5ugzsuleofa	Алексей Орлов	alexey.orlov@buildrent.local	+375291110111	$2b$10$lf/TveqLbG8AbnysIloV8ekF47Z5M1UtThjIyBSNr1roiRPeBzQlS	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.189	2026-06-02 14:34:30.91
cmpu216lu000pd5ugwgq7vwpc	Михаил Никитин	mikhail.nikitin@buildrent.local	+375291110112	$2b$10$4fC2sBOdFinIYnUo3dPBFOHz9A/3.egoZV6PrGgHjFI4quTfe2Oz6	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:28.242	2026-06-02 14:34:30.963
cmptsbj0u0003d500lnh8bwp8	Администратор BuildRent	admin@buildrent.local	\N	$2b$10$6wKByAGLRGaF8.GjBjZK5e8VcLYPLHG303nb4d0N3fj0cdc9ANVqK	\N	cmptsbiyi0000d50016vfokjh	f	2026-05-31 12:57:34.734	2026-06-02 14:35:56.93
cmpu2165a0003d5ugp81cvo3c	Иван Петров	ivan.petrov@buildrent.local	+375291110101	$2b$10$7meyZDDAYB5Aqtb1Lrh/gOVVHBlsL5Wp1bHAjYdtY2eg5IA.2sNQa	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.647	2026-06-02 14:35:56.992
cmpu2166y0005d5ugb4frzf2f	Павел Сидоров	pavel.sidorov@buildrent.local	+375291110102	$2b$10$xRZwOYjOLPBoyEqTC1XXPuHdAsWIfak49DXOZz.xOFpYaYn6V79LG	\N	cmptsbiyx0001d500il354zhy	f	2026-05-31 17:29:27.706	2026-06-02 14:34:30.43
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

\unrestrict maGloEhL2bSbyOuffrc69KlYFP7GkVnXAAgrZKCrpPZ3cRcWs1zzPM93aqM4QJV

