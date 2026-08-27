"""Importa e redimensiona o arquivo fotográfico da Garden para o site."""

from pathlib import Path
from PIL import Image

SRC = Path(r"c:\Users\garde\Desktop\garden\GARDEN 2024")
DEST = Path(r"c:\Users\garde\Desktop\projects\garden-docker\garden\public")
MAX_SIDE = 1800
JPEG_QUALITY = 82

SETS = [
    {
        "folder": SRC / "FOTOS" / "Festival - Hyakuya",
        "dest": "live/festival",
        "prefix": "hyakuya",
        "event": "Festival Troque o Disco",
        "credit": "Hyakuya",
        "count": 8,
        "force": [
            "Copy of _DSC0315.jpg",
            "Copy of _DSC0398.jpg",
            "Copy of _DSC0435.jpg",
        ],
    },
    {
        "folder": SRC / "FOTOS" / "Festival - Maurinho",
        "dest": "live/festival",
        "prefix": "maurinho",
        "event": "Festival Troque o Disco",
        "credit": "Maurinho",
        "count": 5,
        "force": ["_MGS2666-219.jpg"],
    },
    {
        "folder": SRC / "FOTOS" / "Festival - Min",
        "dest": "live/festival",
        "prefix": "min",
        "event": "Festival Troque o Disco",
        "credit": "Min",
        "count": 4,
        "force": ["Copy of DSCN4786 (1).jpg"],
    },
    {
        "folder": SRC / "FOTOS" / "Weird Party 1 - Hyakuya",
        "dest": "live/weird-party-1",
        "prefix": "hyakuya",
        "event": "Weird Party 1",
        "credit": "Hyakuya",
        "count": 5,
        "force": ["Copy of _DSC0101.jpg"],
    },
    {
        "folder": SRC / "FOTOS" / "Weird Party 2 - Hyakuya",
        "dest": "live/weird-party-2",
        "prefix": "hyakuya",
        "event": "Weird Party 2",
        "credit": "Hyakuya",
        "count": 6,
        "force": ["Copy of _DSC0756.jpg"],
    },
    {
        "folder": SRC / "FOTOS" / "Weird Party 3 - Hyakuya",
        "dest": "live/weird-party-3",
        "prefix": "hyakuya",
        "event": "Weird Party 3",
        "credit": "Hyakuya",
        "count": 5,
        "force": ["_DSC0343.jpg"],
    },
    {
        "folder": SRC / "FOTOS" / "Weird Party 3 - Yasmin Louback",
        "dest": "live/weird-party-3",
        "prefix": "yasmin",
        "event": "Weird Party 3",
        "credit": "Yasmin Louback",
        "count": 3,
        "force": [],
    },
    {
        "folder": SRC / "FOTOS" / "Weird Party 4 - Hyakuya",
        "dest": "live/weird-party-4",
        "prefix": "hyakuya",
        "event": "Weird Party 4",
        "credit": "Hyakuya",
        "count": 6,
        "force": ["DSC_1585.jpg"],
    },
    {
        "folder": SRC / "FOTOS" / "Weird Party 4 - Waguin",
        "dest": "live/weird-party-4",
        "prefix": "waguin",
        "event": "Weird Party 4",
        "credit": "Waguin",
        "count": 5,
        "force": ["IMG_9508.jpg"],
    },
]


def list_images(folder: Path):
    return sorted(
        p
        for p in folder.iterdir()
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )


def pick_even(files, count, force_names):
    by_name = {p.name: p for p in files}
    chosen = []
    for name in force_names:
        if name in by_name:
            chosen.append(by_name[name])
    remaining = [p for p in files if p not in chosen]
    need = max(0, count - len(chosen))
    if need and remaining:
        n = len(remaining)
        if n <= need:
            extra = remaining
        else:
            extra = [remaining[round(i * (n - 1) / (need - 1))] for i in range(need)] if need > 1 else [remaining[0]]
        chosen.extend(extra)
    seen = set()
    unique = []
    for item in chosen:
        if item not in seen:
            seen.add(item)
            unique.append(item)
    return unique[:count]


def save_jpeg(src: Path, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as image:
        image = image.convert("RGB")
        image.thumbnail((MAX_SIDE, MAX_SIDE), Image.Resampling.LANCZOS)
        image.save(dest, "JPEG", quality=JPEG_QUALITY, optimize=True)
        return image.size


def main():
    catalog = []
    for item in SETS:
        files = list_images(item["folder"])
        picked = pick_even(files, item["count"], item["force"])
        for index, src in enumerate(picked, start=1):
            name = f"{item['prefix']}-{index:02d}.jpg"
            dest = DEST / item["dest"] / name
            width, height = save_jpeg(src, dest)
            rel = "/" + dest.relative_to(DEST).as_posix()
            catalog.append(
                {
                    "src": rel,
                    "event": item["event"],
                    "credit": item["credit"],
                    "wide": width >= height * 1.15,
                    "source": src.name,
                }
            )
            print(f"{rel}  {width}x{height}  <- {src.name}")

    poster_src = next(
        (SRC / "BANNERS EVENTOS" / "Weird Party 4 (Xmas)" / "Feed").glob("feed weird party xmas*.png")
    )
    poster_dest = DEST / "posters" / "weird-party-4.jpg"
    save_jpeg(poster_src, poster_dest)
    print(f"/posters/weird-party-4.jpg <- {poster_src.name}")

    covers = DEST / "covers"
    covers.mkdir(exist_ok=True)
    dbawot = DEST / "images" / "dbawot.jpg"
    if dbawot.exists():
        target = covers / "dbawot.jpg"
        if not target.exists():
            dbawot.replace(target)
        print("moved dbawot to /covers/dbawot.jpg")

    old_images = DEST / "images"
    if old_images.exists():
        for path in old_images.glob("*.jpg"):
            if path.name != "dbawot.jpg":
                path.unlink()
                print(f"removed {path.name}")
        leftover = list(old_images.iterdir())
        if not leftover:
            old_images.rmdir()

    out = DEST.parent / "src" / "data" / "gallery.json"
    out.write_text(
        __import__("json").dumps(catalog, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"\n{len(catalog)} photos written to {out}")


if __name__ == "__main__":
    main()
