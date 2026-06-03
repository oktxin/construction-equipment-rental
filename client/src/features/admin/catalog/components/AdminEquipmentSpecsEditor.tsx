import { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "../../../../shared/ui";
import {
  adminCompactFieldClassName,
  adminErrorTextClassName,
  adminGhostButtonClassName,
  adminHintTextClassName,
  adminInsetPanelClassName,
  adminLabelClassName,
  adminMutedTextClassName,
} from "../../components/adminUiStyles";
import type { EquipmentSpec } from "../../../catalog/catalogTypes";
import type { AdminEquipmentSpecInput } from "../adminCatalogTypes";

const specSchema = z.array(
  z.object({
    name: z.string().trim().min(1, "Укажите название характеристики").max(120, "Максимум 120 символов"),
    value: z.string().trim().min(1, "Укажите значение").max(255, "Максимум 255 символов"),
    unit: z.string().trim().max(50, "Максимум 50 символов").nullable(),
    sortOrder: z.coerce.number().int().min(0, "Порядок не может быть отрицательным"),
  }),
);

type DraftSpecRow = {
  draftId: string;
  name: string;
  value: string;
  unit: string;
  sortOrder: number;
};

function createDraftId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function mapRows(specs: EquipmentSpec[]): DraftSpecRow[] {
  return specs.map((spec) => ({
    draftId: spec.id || createDraftId(),
    name: spec.name,
    value: spec.value,
    unit: spec.unit ?? "",
    sortOrder: spec.sortOrder,
  }));
}

export type AdminEquipmentSpecsEditorProps = {
  equipmentName: string;
  initialSpecs: EquipmentSpec[];
  isSubmitting?: boolean;
  error?: string | null;
  onSubmit: (specs: AdminEquipmentSpecInput[]) => void;
  onCancel: () => void;
};

export function AdminEquipmentSpecsEditor({
  equipmentName,
  initialSpecs,
  isSubmitting = false,
  error,
  onSubmit,
  onCancel,
}: AdminEquipmentSpecsEditorProps) {
  const [rows, setRows] = useState<DraftSpecRow[]>(() =>
    initialSpecs.length
      ? mapRows(initialSpecs)
      : [{ draftId: createDraftId(), name: "", value: "", unit: "", sortOrder: 0 }],
  );
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setRows(
      initialSpecs.length
        ? mapRows(initialSpecs)
        : [{ draftId: createDraftId(), name: "", value: "", unit: "", sortOrder: 0 }],
    );
    setLocalError(null);
  }, [initialSpecs]);

  return (
    <div className="space-y-5">
      <div className={`${adminInsetPanelClassName} p-4 ${adminHintTextClassName}`}>
        Здесь можно полностью заменить технические характеристики для позиции <span className="text-white">{equipmentName}</span>.
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.draftId} className={`${adminInsetPanelClassName} p-4`}>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_160px_140px]">
              <div className="space-y-2">
                <label className={adminLabelClassName}>Название</label>
                <input
                  type="text"
                  value={row.name}
                  className={adminCompactFieldClassName}
                  placeholder="Мощность"
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((item) =>
                        item.draftId === row.draftId ? { ...item, name: event.target.value } : item,
                      ),
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <label className={adminLabelClassName}>Значение</label>
                <input
                  type="text"
                  value={row.value}
                  className={adminCompactFieldClassName}
                  placeholder="2200"
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((item) =>
                        item.draftId === row.draftId ? { ...item, value: event.target.value } : item,
                      ),
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <label className={adminLabelClassName}>Единица</label>
                <input
                  type="text"
                  value={row.unit}
                  className={adminCompactFieldClassName}
                  placeholder="Вт"
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((item) =>
                        item.draftId === row.draftId ? { ...item, unit: event.target.value } : item,
                      ),
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <label className={adminLabelClassName}>Порядок</label>
                <input
                  type="number"
                  min={0}
                  value={row.sortOrder}
                  className={adminCompactFieldClassName}
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

            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                className={adminGhostButtonClassName}
                onClick={() =>
                  setRows((current) =>
                    current.length === 1
                      ? [{ draftId: createDraftId(), name: "", value: "", unit: "", sortOrder: 0 }]
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
          className={adminGhostButtonClassName}
          onClick={() =>
            setRows((current) => [
              ...current,
              {
                draftId: createDraftId(),
                name: "",
                value: "",
                unit: "",
                sortOrder: current.length,
              },
            ])
          }
        >
          Добавить строку
        </Button>
        <p className={adminMutedTextClassName}>Подготовлено характеристик: {rows.length}</p>
      </div>

      {localError ? <p className={`rounded-2xl bg-danger/12 px-4 py-3 ${adminErrorTextClassName}`}>{localError}</p> : null}
      {error ? <p className={`rounded-2xl bg-danger/12 px-4 py-3 ${adminErrorTextClassName}`}>{error}</p> : null}

      <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          className={adminGhostButtonClassName}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button
          className="bg-primary text-foreground hover:bg-primary-strong"
          disabled={isSubmitting}
          onClick={() => {
            const parsed = specSchema.safeParse(
              rows.map((row) => ({
                name: row.name.trim(),
                value: row.value.trim(),
                unit: row.unit.trim() ? row.unit.trim() : null,
                sortOrder: row.sortOrder,
              })),
            );

            if (!parsed.success) {
              setLocalError(parsed.error.issues[0]?.message ?? "Проверьте характеристики");
              return;
            }

            setLocalError(null);
            onSubmit(parsed.data);
          }}
        >
          {isSubmitting ? "Сохраняем..." : "Сохранить характеристики"}
        </Button>
      </div>
    </div>
  );
}
