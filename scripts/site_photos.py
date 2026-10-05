#!/usr/bin/env python3
"""
Фото с маркировкой RS AutoParts -> public/parts/<model>/ для сайта.

Источник: «Фото RS AutoParts — маркировка» (делает rs_photos.py).
Ужимает до 1280 px по длинной стороне, JPEG q78, без EXIF.
Имена файлов уже уникальные (li-auto-l7-kapot-rs-autoparts-01.jpg) —
на них же ссылается колонка «Фото» в «Витрине» склада: /parts/l7/<имя>.jpg

Запуск из корня проекта:  python3 scripts/site_photos.py
Повторный запуск обновляет только изменившиеся фото.
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "Фото RS AutoParts — маркировка"
DST = ROOT / "public" / "parts"
MAX_SIDE = 1280
QUALITY = 78

if not SRC.exists():
    sys.exit(f"Нет папки {SRC.name} — сначала запусти rs_photos.py")

only = sys.argv[1:]  # можно ограничить моделями: python3 scripts/site_photos.py L6
done = skipped = 0
for src in sorted(SRC.rglob("*.jpg")):
    model = src.relative_to(SRC).parts[0]
    if only and model not in only:
        continue
    out = DST / model.lower() / src.name
    if out.exists() and out.stat().st_mtime >= src.stat().st_mtime:
        skipped += 1
        continue
    out.parent.mkdir(parents=True, exist_ok=True)
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    im.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    done += 1

print(f"готово: {done}, без изменений: {skipped}")
