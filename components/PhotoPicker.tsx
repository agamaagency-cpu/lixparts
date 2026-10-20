"use client";

import { useEffect, useRef, useState } from "react";
import { compressImage, MAX_PHOTOS } from "@/lib/lead";
import { CameraIcon, CloseIcon } from "./Icons";

/**
 * Выбор фото для заявки: камера или галерея на телефоне, перетаскивание на компьютере.
 * Фото сразу сжимаются, показываются превью, лишние можно убрать.
 */
export default function PhotoPicker({
  photos,
  onChange,
  hint = "Фото детали, шильдика или машины — так подберём быстрее",
  dark = false,
}: {
  photos: File[];
  onChange: (files: File[]) => void;
  hint?: string;
  dark?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = photos.map((p) => URL.createObjectURL(p));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [photos]);

  const add = async (list: FileList | null) => {
    if (!list?.length) return;
    setBusy(true);
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(list).filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name)).slice(0, room);
    const compressed = await Promise.all(picked.map(compressImage));
    onChange([...photos, ...compressed]);
    setBusy(false);
    if (input.current) input.current.value = "";
  };

  const full = photos.length >= MAX_PHOTOS;
  const tone = dark
    ? "border-white/20 bg-white/5 text-graphite-200 hover:bg-white/10"
    : "border-graphite-300 bg-graphite-50/60 text-graphite-600 hover:border-graphite-400 hover:bg-graphite-50";

  return (
    <div>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => add(e.target.files)}
      />
      {photos.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {previews.map((src, i) => (
            <div key={src} className="relative h-16 w-16 overflow-hidden rounded-lg ring-1 ring-graphite-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Фото ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="Убрать фото"
                onClick={() => onChange(photos.filter((_, j) => j !== i))}
                className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <CloseIcon width={12} height={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      {!full && (
        <button
          type="button"
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            add(e.dataTransfer.files);
          }}
          className={`flex w-full items-center gap-3 rounded-xl border border-dashed px-4 py-3 text-left text-sm transition-colors ${tone} ${
            drag ? "border-emerald-500 bg-emerald-50" : ""
          }`}
        >
          <CameraIcon width={20} height={20} className="shrink-0" />
          <span>
            <span className="block font-medium">
              {busy ? "Обрабатываем фото…" : photos.length ? "Добавить ещё фото" : "Прикрепить фото"}
            </span>
            <span className={`block text-xs ${dark ? "text-graphite-400" : "text-graphite-400"}`}>
              {photos.length ? `${photos.length} из ${MAX_PHOTOS}` : hint}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
