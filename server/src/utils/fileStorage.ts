import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import { env } from "../config/env";

const uploadsRoot = path.resolve(process.cwd(), "uploads");
const reportsRoot = path.resolve(process.cwd(), env.REPORT_STORAGE_PATH);

function sanitizeFileNamePart(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function getUploadsRootPath() {
  return uploadsRoot;
}

export function getReportsStoragePath() {
  return reportsRoot;
}

export async function ensureReportsStorageDir() {
  await fs.mkdir(reportsRoot, { recursive: true });
}

export function buildStoredReportFileName(
  prefix: string,
  extension: "pdf" | "docx",
) {
  const safePrefix = sanitizeFileNamePart(prefix) || "report";
  const uniqueSuffix = randomUUID().slice(0, 8);
  return `${safePrefix}-${uniqueSuffix}.${extension}`;
}

export function buildReportFileUrl(fileName: string) {
  return `/uploads/reports/${fileName}`;
}

export function resolveStoredFilePath(fileUrl: string) {
  const normalizedRelativePath = fileUrl.replace(/^\/+/, "");
  const absolutePath = path.resolve(process.cwd(), normalizedRelativePath);
  const safeRootWithSeparator = `${uploadsRoot}${path.sep}`;

  if (
    absolutePath !== uploadsRoot &&
    !absolutePath.startsWith(safeRootWithSeparator)
  ) {
    throw new Error("Unsafe report file path");
  }

  return absolutePath;
}

export async function saveReportBuffer(fileName: string, content: Buffer) {
  await ensureReportsStorageDir();
  const absolutePath = path.join(reportsRoot, fileName);
  await fs.writeFile(absolutePath, content);

  return {
    absolutePath,
    fileUrl: buildReportFileUrl(fileName),
  };
}

export async function reportFileExists(fileUrl: string) {
  try {
    const absolutePath = resolveStoredFilePath(fileUrl);
    await fs.access(absolutePath);
    return true;
  } catch {
    return false;
  }
}

export async function deleteStoredReportFile(fileUrl: string | null) {
  if (!fileUrl) {
    return {
      deleted: false,
    };
  }

  try {
    const absolutePath = resolveStoredFilePath(fileUrl);
    await fs.unlink(absolutePath);
    return {
      deleted: true,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {
        deleted: false,
      };
    }

    throw error;
  }
}
