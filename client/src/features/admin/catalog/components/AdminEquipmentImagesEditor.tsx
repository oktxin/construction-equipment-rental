import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { Button } from "../../../../shared/ui";
import type { EquipmentImage } from "../../../catalog/catalogTypes";
import type { AdminEquipmentImageInput } from "../adminCatalogTypes";

const fieldClassName =
  "h-11 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const imageSchema = z.array(
  z.object({
    url: z.string().trim().url("Укажите корректный URL изображения"),
    alt: z.string().trim().max(255, "Alt не должен превышать 255 символов").nullable(),
    sortOrder: z.coerce.number().int().min(0, "Порядок не может быть отрицательным"),
  }),
);

type DraftImageRow = {
  draftId: string;
  url: string;
  alt: string;
  sortOrder: number;
};

function createDraftId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function mapRows(images: EquipmentImage[]): DraftImageRow[] {
  return images.map((image) => ({
    draftId: image.id || createDraftId(),
    url: image.url,
    alt: image.alt ?? "",
    sortOrder: image.sortOrder,
  }));
}

export type AdminEquipmentImagesEditorProps = {
  equipmentName: string;
  initialImages: EquipmentImage[];
  isSubmitting?: boolean;
  error?: string | null;
  onSubmit: (images: AdminEquipmentImageInput[]) => void;
  onCancel: () => void;
};

export function AdminEquipmentImagesEditor({
  equipmentName,
  initialImages,
  isSubmitting = false,
  error,
  onSubmit,
  onCancel,
}: AdminEquipmentImagesEditorProps) {
  const [rows, setRows] = useState<DraftImageRow[]>(() =>
    initialImages.length ? mapRows(initialImages) : [{ draftId: createDraftId(), url: "", alt: "", sortOrder: 0 }],
  );
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setRows(
      initialImages.length
        ? mapRows(initialImages)
        : [{ draftId: createDraftId(), url: "", alt: "", sortOrder: 0 }],
    );
    setLocalError(null);
  }, [initialImages]);

  const previewRows = useMemo(() => rows.filter((row) => row.url.trim()), [rows]);

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-4 text-sm leading-6 text-white/64">
        Редактор полностью заменяет набор изображений для позиции <span className="text-white">{equipmentName}</span>.
      </div>

      <div className="space-y-4">
        {rows.map((row, index) => (
          <div key={row.draftId} className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_140px]">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/78">URL изображения</label>
                <input
                  type="text"
                  value={row.url}
                  className={fieldClassName}
                  placeholder="https://..."
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((item) =>
                        item.draftId === row.draftId ? { ...item, url: event.target.value } : item,
                      ),
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/78">Alt</label>
                <input
                  type="text"
                  value={row.alt}
                  className={fieldClassName}
                  placeholder="Описание изображения"
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((item) =>
                        item.draftId === row.draftId ? { ...item, alt: event.target.value } : item,
                      ),
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/78">Порядок</label>
                <input
                  type="number"
                  min={0}
                  value={row.sortOrder}
                  className={fieldClassName}
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((item) =>
                        item.draftId === row.draftId
                          ? { ...item, sortOrder: Number(event.target.value) || 0 }
                          : item,
                      ),
                    )
                  }
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="rounded-[22px] border border-white/8 bg-adminSurface p-3">
                {row.url.trim() ? (
                  <img
                    src={row.url}
                    alt={row.alt || `Изображение ${index + 1}`}
                    className="h-28 w-full rounded-2xl object-cover lg:w-40"
                  />
                ) : (
                  <div className="flex h-28 w-full items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 text-sm text-white/35 lg:w-40">
                    Предпросмотр появится после вставки URL
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                className="border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong"
                onClick={() =>
                  setRows((current) =>
                    current.length === 1
                      ? [{ draftId: createDraftId(), url: "", alt: "", sortOrder: 0 }]
                      : current.filter((item) => item.draftId !== row.draftId),
                  )
                }
              >
                Удалить строку
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="ghost"
          className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
          onClick={() =>
            setRows((current) => [
              ...current,
              {
                draftId: createDraftId(),
                url: "",
                alt: "",
                sortOrder: current.length,
              },
            ])
          }
        >
          Добавить строку
        </Button>
        <p className="text-sm text-white/48">Подготовлено изображений: {previewRows.length}</p>
      </div>

      {localError ? <p className="rounded-2xl bg-danger/12 px-4 py-3 text-sm text-rose-300">{localError}</p> : null}
      {error ? <p className="rounded-2xl bg-danger/12 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

      <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button
          className="bg-primary text-foreground hover:bg-primary-strong"
          disabled={isSubmitting}
          onClick={() => {
            const parsed = imageSchema.safeParse(
              rows.map((row) => ({
                url: row.url.trim(),
                alt: row.alt.trim() ? row.alt.trim() : null,
                sortOrder: row.sortOrder,
              })),
            );

            if (!parsed.success) {
              setLocalError(parsed.error.issues[0]?.message ?? "Проверьте данные изображений");
              return;
            }

            setLocalError(null);
            onSubmit(parsed.data);
          }}
        >
          {isSubmitting ? "Сохраняем..." : "Сохранить изображения"}
        </Button>
      </div>
    </div>
  );
}
