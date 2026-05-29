import { useEffect, useState } from "react";

import { Card } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";
import type { EquipmentImage } from "../catalogTypes";

const fallbackBackground =
  "linear-gradient(145deg, rgba(22,24,27,0.94), rgba(46,50,56,0.78)), radial-gradient(circle at top right, rgba(242,165,49,0.22), transparent 28%)";

type EquipmentGalleryProps = {
  name: string;
  images: EquipmentImage[];
  className?: string;
};

function getImageAlt(name: string, index: number) {
  return `${name}: изображение ${index + 1}`;
}

export function EquipmentGallery({
  name,
  images,
  className,
}: EquipmentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [name, images.length]);

  const activeImage = images[activeIndex] ?? null;

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="overflow-hidden p-0">
        <div className="relative aspect-[16/11] min-h-[280px] bg-secondary/10">
          {activeImage ? (
            <img
              src={activeImage.url}
              alt={getImageAlt(name, activeIndex)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-end p-6 text-background sm:p-8"
              style={{ background: fallbackBackground }}
            >
              <div className="max-w-[26rem] space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  BuildRent
                </p>
                <h2 className="font-heading text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {name}
                </h2>
                <p className="max-w-[28rem] text-sm leading-6 text-white/76 sm:text-base">
                  Фотографии для этой позиции еще загружаются. Все ключевые характеристики и условия аренды уже доступны ниже.
                </p>
              </div>
            </div>
          )}

          {images.length > 1 ? (
            <div className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-secondary/78 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white backdrop-blur">
              {activeIndex + 1} / {images.length}
            </div>
          ) : null}
        </div>
      </Card>

      {images.length > 1 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Показать изображение ${index + 1}`}
                className={cn(
                  "overflow-hidden rounded-card border bg-card text-left shadow-industrial transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary shadow-industrial-lg"
                    : "border-border/60 hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-industrial-lg",
                )}
              >
                <div className="aspect-[4/3]">
                  <img
                    src={image.url}
                    alt={getImageAlt(name, index)}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
