import { existsSync } from "node:fs";
import path from "node:path";

import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import PDFDocument from "pdfkit";
import { ReportFormat, ReportType } from "@prisma/client";

import type {
  AdminRentalStatisticsReportPayload,
  GeneratedReportFile,
  OrderReportPayload,
  RentalHistoryReportPayload,
} from "./reports.types";

type SupportedReportType =
  | "ORDER_DOCUMENT"
  | "RENTAL_HISTORY"
  | "ADMIN_RENTAL_STATISTICS";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
  }).format(value);
}

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatMoney(value: number) {
  return `${value.toFixed(2)} BYN`;
}

function resolvePdfFontPath() {
  const candidates = [
    "C:\\Windows\\Fonts\\arial.ttf",
    "C:\\Windows\\Fonts\\calibri.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
  ];

  return candidates.find((candidate) => existsSync(candidate));
}

async function buildPdfBuffer(
  render: (doc: PDFKit.PDFDocument) => void,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 48,
    });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    doc.on("error", reject);

    const fontPath = resolvePdfFontPath();
    if (fontPath) {
      doc.font(fontPath);
    }

    render(doc);
    doc.end();
  });
}

function addPdfTitle(doc: PDFKit.PDFDocument, title: string, generatedAt: Date) {
  doc.fontSize(20).text("BuildRent", { align: "left" });
  doc.moveDown(0.3);
  doc.fontSize(16).text(title, { align: "left" });
  doc.moveDown(0.3);
  doc.fontSize(10).text(`Дата формирования: ${formatDateTime(generatedAt)}`);
  doc.moveDown();
}

function addPdfSectionTitle(doc: PDFKit.PDFDocument, title: string) {
  doc.moveDown(0.5);
  doc.fontSize(13).text(title);
  doc.moveDown(0.3);
}

function addPdfKeyValue(doc: PDFKit.PDFDocument, label: string, value: string) {
  doc.fontSize(11).text(`${label}: ${value}`);
}

function addPdfSimpleTable(
  doc: PDFKit.PDFDocument,
  headers: string[],
  rows: string[][],
) {
  doc.fontSize(10).text(headers.join(" | "));
  doc.moveDown(0.2);
  doc.text("-".repeat(110));
  rows.forEach((row) => {
    doc.text(row.join(" | "));
  });
}

async function generateOrderDocumentPdf(
  payload: OrderReportPayload,
): Promise<GeneratedReportFile> {
  const buffer = await buildPdfBuffer((doc) => {
    addPdfTitle(doc, payload.title, payload.generatedAt);

    addPdfSectionTitle(doc, "Данные заявки");
    addPdfKeyValue(doc, "Номер заявки", payload.order.orderNumber);
    addPdfKeyValue(doc, "Статус", payload.order.status);
    addPdfKeyValue(
      doc,
      "Период аренды",
      `${formatDate(payload.order.startDate)} - ${formatDate(payload.order.endDate)}`,
    );
    addPdfKeyValue(doc, "Тип доставки", payload.order.deliveryType);
    if (payload.order.deliveryAddress) {
      addPdfKeyValue(doc, "Адрес доставки", payload.order.deliveryAddress);
    }

    addPdfSectionTitle(doc, "Клиент");
    addPdfKeyValue(doc, "ФИО", payload.order.customer.fullName);
    addPdfKeyValue(doc, "Email", payload.order.customer.email);
    addPdfKeyValue(doc, "Телефон", payload.order.customer.phone ?? "-");

    addPdfSectionTitle(doc, "Оборудование");
    addPdfSimpleTable(
      doc,
      ["Наименование", "Кол-во", "Цена/день", "Дней", "Сумма"],
      payload.order.items.map((item) => [
        item.equipmentName,
        item.quantity.toString(),
        formatMoney(item.dailyPrice),
        item.daysCount.toString(),
        formatMoney(item.lineTotal),
      ]),
    );

    addPdfSectionTitle(doc, "Итоги");
    addPdfKeyValue(doc, "Subtotal", formatMoney(payload.order.subtotal));
    addPdfKeyValue(doc, "Deposit total", formatMoney(payload.order.depositTotal));
    addPdfKeyValue(doc, "Delivery price", formatMoney(payload.order.deliveryPrice));
    addPdfKeyValue(doc, "Total price", formatMoney(payload.order.totalPrice));

    if (payload.order.customerComment) {
      addPdfSectionTitle(doc, "Комментарий клиента");
      doc.fontSize(11).text(payload.order.customerComment);
    }

    if (payload.order.managerComment) {
      addPdfSectionTitle(doc, "Комментарий менеджера");
      doc.fontSize(11).text(payload.order.managerComment);
    }
  });

  return {
    buffer,
    extension: "pdf",
    format: ReportFormat.PDF,
  };
}

async function generateRentalHistoryPdf(
  payload: RentalHistoryReportPayload,
): Promise<GeneratedReportFile> {
  const buffer = await buildPdfBuffer((doc) => {
    addPdfTitle(doc, payload.title, payload.generatedAt);

    addPdfSectionTitle(doc, "Пользователь");
    addPdfKeyValue(doc, "ФИО", payload.user.fullName);
    addPdfKeyValue(doc, "Email", payload.user.email);
    addPdfKeyValue(doc, "Телефон", payload.user.phone ?? "-");
    addPdfKeyValue(
      doc,
      "Период",
      `${payload.period.dateFrom ?? "начало"} - ${payload.period.dateTo ?? "текущая дата"}`,
    );

    addPdfSectionTitle(doc, "Список заявок");
    addPdfSimpleTable(
      doc,
      ["Номер", "Статус", "Даты", "Позиций", "Итого"],
      payload.orders.map((order) => [
        order.orderNumber,
        order.status,
        `${formatDate(order.startDate)} - ${formatDate(order.endDate)}`,
        order.itemsCount.toString(),
        formatMoney(order.totalPrice),
      ]),
    );

    addPdfSectionTitle(doc, "Сводка");
    addPdfKeyValue(doc, "Количество заявок", payload.totals.ordersCount.toString());
    addPdfKeyValue(doc, "Общая сумма", formatMoney(payload.totals.grandTotal));
  });

  return {
    buffer,
    extension: "pdf",
    format: ReportFormat.PDF,
  };
}

async function generateAdminStatisticsPdf(
  payload: AdminRentalStatisticsReportPayload,
): Promise<GeneratedReportFile> {
  const buffer = await buildPdfBuffer((doc) => {
    addPdfTitle(doc, payload.title, payload.generatedAt);

    addPdfSectionTitle(doc, "Период");
    addPdfKeyValue(
      doc,
      "Диапазон",
      `${payload.period.dateFrom ?? "начало"} - ${payload.period.dateTo ?? "текущая дата"}`,
    );

    addPdfSectionTitle(doc, "Сводка");
    addPdfKeyValue(doc, "Количество заявок", payload.summary.ordersCount.toString());
    addPdfKeyValue(doc, "Общая сумма аренд", formatMoney(payload.summary.totalRentalSum));
    addPdfKeyValue(doc, "Общая сумма залогов", formatMoney(payload.summary.totalDepositSum));
    addPdfKeyValue(doc, "Завершенные", payload.summary.completedCount.toString());
    addPdfKeyValue(doc, "Отмененные", payload.summary.cancelledCount.toString());
    addPdfKeyValue(doc, "Активные", payload.summary.activeCount.toString());

    addPdfSectionTitle(doc, "Статусы");
    addPdfSimpleTable(
      doc,
      ["Статус", "Количество"],
      payload.byStatus.map((item) => [item.status, item.count.toString()]),
    );

    addPdfSectionTitle(doc, "Топ оборудования");
    addPdfSimpleTable(
      doc,
      ["Оборудование", "Заявок", "Единиц"],
      payload.topEquipment.map((item) => [
        item.equipmentName,
        item.rentalsCount.toString(),
        item.quantityTotal.toString(),
      ]),
    );

    addPdfSectionTitle(doc, "Топ клиентов");
    addPdfSimpleTable(
      doc,
      ["Клиент", "Email", "Заявок"],
      payload.topClients.map((item) => [
        item.clientName,
        item.clientEmail,
        item.ordersCount.toString(),
      ]),
    );
  });

  return {
    buffer,
    extension: "pdf",
    format: ReportFormat.PDF,
  };
}

function createDocxTitle(title: string, generatedAt: Date) {
  return [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun("BuildRent")],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun(title)],
    }),
    new Paragraph({
      children: [new TextRun(`Дата формирования: ${formatDateTime(generatedAt)}`)],
    }),
  ];
}

function createDocxTable(headers: string[], rows: string[][]) {
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: headers.map(
          (header) =>
            new TableCell({
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
                left: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
                right: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
              },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: header, bold: true })],
                }),
              ],
            }),
        ),
      }),
      ...rows.map(
        (row) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [new Paragraph(cell)],
                }),
            ),
          }),
      ),
    ],
  });
}

async function generateOrderDocumentDocx(
  payload: OrderReportPayload,
): Promise<GeneratedReportFile> {
  const doc = new Document({
    sections: [
      {
        children: [
          ...createDocxTitle(payload.title, payload.generatedAt),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Данные заявки" }),
          new Paragraph(`Номер заявки: ${payload.order.orderNumber}`),
          new Paragraph(`Статус: ${payload.order.status}`),
          new Paragraph(
            `Период аренды: ${formatDate(payload.order.startDate)} - ${formatDate(payload.order.endDate)}`,
          ),
          new Paragraph(`Тип доставки: ${payload.order.deliveryType}`),
          new Paragraph(`Адрес доставки: ${payload.order.deliveryAddress ?? "-"}`),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Клиент" }),
          new Paragraph(`ФИО: ${payload.order.customer.fullName}`),
          new Paragraph(`Email: ${payload.order.customer.email}`),
          new Paragraph(`Телефон: ${payload.order.customer.phone ?? "-"}`),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Оборудование" }),
          createDocxTable(
            ["Наименование", "Кол-во", "Цена/день", "Дней", "Сумма"],
            payload.order.items.map((item) => [
              item.equipmentName,
              item.quantity.toString(),
              formatMoney(item.dailyPrice),
              item.daysCount.toString(),
              formatMoney(item.lineTotal),
            ]),
          ),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Итоги" }),
          new Paragraph(`Subtotal: ${formatMoney(payload.order.subtotal)}`),
          new Paragraph(`Deposit total: ${formatMoney(payload.order.depositTotal)}`),
          new Paragraph(`Delivery price: ${formatMoney(payload.order.deliveryPrice)}`),
          new Paragraph(`Total price: ${formatMoney(payload.order.totalPrice)}`),
          new Paragraph(`Комментарий клиента: ${payload.order.customerComment ?? "-"}`),
          new Paragraph(`Комментарий менеджера: ${payload.order.managerComment ?? "-"}`),
        ],
      },
    ],
  });

  return {
    buffer: await Packer.toBuffer(doc),
    extension: "docx",
    format: ReportFormat.DOCX,
  };
}

async function generateRentalHistoryDocx(
  payload: RentalHistoryReportPayload,
): Promise<GeneratedReportFile> {
  const doc = new Document({
    sections: [
      {
        children: [
          ...createDocxTitle(payload.title, payload.generatedAt),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Пользователь" }),
          new Paragraph(`ФИО: ${payload.user.fullName}`),
          new Paragraph(`Email: ${payload.user.email}`),
          new Paragraph(`Телефон: ${payload.user.phone ?? "-"}`),
          new Paragraph(
            `Период: ${payload.period.dateFrom ?? "начало"} - ${payload.period.dateTo ?? "текущая дата"}`,
          ),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "История аренд" }),
          createDocxTable(
            ["Номер", "Статус", "Даты", "Позиций", "Итого"],
            payload.orders.map((order) => [
              order.orderNumber,
              order.status,
              `${formatDate(order.startDate)} - ${formatDate(order.endDate)}`,
              order.itemsCount.toString(),
              formatMoney(order.totalPrice),
            ]),
          ),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Сводка" }),
          new Paragraph(`Количество заявок: ${payload.totals.ordersCount}`),
          new Paragraph(`Общая сумма: ${formatMoney(payload.totals.grandTotal)}`),
        ],
      },
    ],
  });

  return {
    buffer: await Packer.toBuffer(doc),
    extension: "docx",
    format: ReportFormat.DOCX,
  };
}

async function generateAdminStatisticsDocx(
  payload: AdminRentalStatisticsReportPayload,
): Promise<GeneratedReportFile> {
  const doc = new Document({
    sections: [
      {
        children: [
          ...createDocxTitle(payload.title, payload.generatedAt),
          new Paragraph(
            `Период: ${payload.period.dateFrom ?? "начало"} - ${payload.period.dateTo ?? "текущая дата"}`,
          ),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Сводка" }),
          new Paragraph(`Количество заявок: ${payload.summary.ordersCount}`),
          new Paragraph(`Общая сумма аренд: ${formatMoney(payload.summary.totalRentalSum)}`),
          new Paragraph(`Общая сумма залогов: ${formatMoney(payload.summary.totalDepositSum)}`),
          new Paragraph(`Завершенные: ${payload.summary.completedCount}`),
          new Paragraph(`Отмененные: ${payload.summary.cancelledCount}`),
          new Paragraph(`Активные: ${payload.summary.activeCount}`),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Статусы" }),
          createDocxTable(
            ["Статус", "Количество"],
            payload.byStatus.map((item) => [item.status, item.count.toString()]),
          ),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Топ оборудования" }),
          createDocxTable(
            ["Оборудование", "Заявок", "Единиц"],
            payload.topEquipment.map((item) => [
              item.equipmentName,
              item.rentalsCount.toString(),
              item.quantityTotal.toString(),
            ]),
          ),
          new Paragraph({ heading: HeadingLevel.HEADING_2, text: "Топ клиентов" }),
          createDocxTable(
            ["Клиент", "Email", "Заявок"],
            payload.topClients.map((item) => [
              item.clientName,
              item.clientEmail,
              item.ordersCount.toString(),
            ]),
          ),
        ],
      },
    ],
  });

  return {
    buffer: await Packer.toBuffer(doc),
    extension: "docx",
    format: ReportFormat.DOCX,
  };
}

export async function generateReportFile(
  type: SupportedReportType,
  format: ReportFormat,
  payload:
    | OrderReportPayload
    | RentalHistoryReportPayload
    | AdminRentalStatisticsReportPayload,
): Promise<GeneratedReportFile> {
  if (type === ReportType.ORDER_DOCUMENT) {
    return format === ReportFormat.PDF
      ? generateOrderDocumentPdf(payload as OrderReportPayload)
      : generateOrderDocumentDocx(payload as OrderReportPayload);
  }

  if (type === ReportType.RENTAL_HISTORY) {
    return format === ReportFormat.PDF
      ? generateRentalHistoryPdf(payload as RentalHistoryReportPayload)
      : generateRentalHistoryDocx(payload as RentalHistoryReportPayload);
  }

  return format === ReportFormat.PDF
    ? generateAdminStatisticsPdf(payload as AdminRentalStatisticsReportPayload)
    : generateAdminStatisticsDocx(payload as AdminRentalStatisticsReportPayload);
}
