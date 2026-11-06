"""Regenerate the site's images, icons and clip from the source art.

Run from the repo root:  python tools/build_assets.py
Needs Pillow and ffmpeg on PATH. Source folders are read-only; nothing there is changed.
"""
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent  # F:\Unity\ProceduralAnimation
POSTERS = SRC / "海报"
ICONS = SRC / "啾咪游戏图标-放大透明版"
REC = SRC / "Main" / "Recordings"

IMG = ROOT / "assets" / "img"
MEDIA = ROOT / "assets" / "media"
ICO = ROOT / "assets" / "icons"
for d in (IMG, MEDIA, ICO):
    d.mkdir(parents=True, exist_ok=True)

SKY = (67, 129, 239)  # sampled from the poster sky


def ff(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def save_webp(im, path, q=82):
    im.save(path, "WEBP", quality=q, method=6)


# ---- Posters (painted art: smooth scaling) --------------------------------
for lang, name in (("zh", "海报 中文.png"), ("en", "海报英文.png")):
    im = Image.open(POSTERS / name).convert("RGB")
    for w in (1920, 1280, 800):
        save_webp(im.resize((w, w * 1080 // 1920), Image.LANCZOS), IMG / f"poster-{lang}-{w}.webp")

# Portrait crop for phones: the girl's profile, no baked-in title text.
en = Image.open(POSTERS / "海报英文.png").convert("RGB")
crop = en.crop((860, 0, 1640, 670))  # 780x670, stops above the baked-in title
for w in (780, 520):
    save_webp(crop.resize((w, w * 670 // 780), Image.LANCZOS), IMG / f"poster-portrait-{w}.webp")

# Social card (1200x630, cropped from the poster's centre).
for lang, name in (("zh", "海报 中文.png"), ("en", "海报英文.png")):
    im = Image.open(POSTERS / name).convert("RGB").resize((1200, 675), Image.LANCZOS)
    im.crop((0, 22, 1200, 652)).save(ROOT / f"og-{lang}.jpg", "JPEG", quality=85, optimize=True, progressive=True)

# White line-art titles and mascot (transparent PNG, kept as PNG + WebP).
for out, name in (("title-zh", "中文主标题.png"), ("subtitle-zh", "中文副标题.png"),
                  ("title-en", "英文主标题.png"), ("subtitle-en", "英文副标题.png"),
                  ("mascot", "啾咪.png")):
    im = Image.open(POSTERS / name).convert("RGBA")
    save_webp(im, IMG / f"{out}.webp", q=90)

# ---- Icons -----------------------------------------------------------------
# The mascot icon is white line art on transparent; put it on a sky-blue
# rounded tile so it stays visible on light browser tabs.
src_icon = Image.open(ICONS / "啾咪-透明-1024.png").convert("RGBA")


def tile(size, radius_frac=0.22, pad_frac=0.08):
    from PIL import ImageDraw
    big = size * 4
    bg = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    ImageDraw.Draw(bg).rounded_rectangle((0, 0, big - 1, big - 1), radius=int(big * radius_frac), fill=SKY + (255,))
    pad = int(big * pad_frac)
    ic = src_icon.resize((big - 2 * pad, big - 2 * pad), Image.LANCZOS)
    bg.alpha_composite(ic, (pad, pad))
    return bg.resize((size, size), Image.LANCZOS)


tile(32).save(ICO / "favicon-32.png")
tile(256).save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
for s in (192, 512):
    tile(s, radius_frac=0).save(ICO / f"icon-{s}.png")
tile(180, radius_frac=0, pad_frac=0.1).save(ICO / "apple-touch-icon.png")
# Transparent original for the page itself.
src_icon.resize((256, 256), Image.LANCZOS).save(ICO / "mascot-256.png")

# ---- Gameplay stills (pixel art: keep native resolution, no resampling) ----
STILLS = [
    ("jellyfish", "promo/jelly-swarm/jelly_swarm_rise.mp4", 6.25),
    ("harp", "promo/harp-show/harp_show_v8_get_on.mp4", 32.0),
    ("coral", "clips/corals/giant_corals_shallow.mp4", 22.0),
    ("deep", "clips/anglerfish/level03_arrive_light.mp4", 21.1),
]
tmp = ROOT / "tools" / "_frame.png"
for name, rel, t in STILLS:
    ff("-ss", str(t), "-i", str(REC / rel), "-frames:v", "1", str(tmp))
    im = Image.open(tmp).convert("RGB")  # 1792x1008
    save_webp(im, IMG / f"still-{name}-1792.webp", q=80)
    # Half size with NEAREST keeps the pixel grid (game renders ~4px pixels).
    save_webp(im.resize((896, 504), Image.NEAREST), IMG / f"still-{name}-896.webp", q=82)
tmp.unlink()

# ---- Short muted loop ------------------------------------------------------
clip = str(REC / "promo/jelly-swarm/jelly_swarm_rise.mp4")
vf = "scale=1280:-2:flags=neighbor,fps=30"
ff("-ss", "0", "-t", "10", "-i", clip, "-an", "-vf", vf, "-c:v", "libx264", "-crf", "27",
   "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(MEDIA / "loop.mp4"))
ff("-ss", "0", "-i", clip, "-frames:v", "1", "-vf", "scale=1280:-2:flags=neighbor", str(tmp))
save_webp(Image.open(tmp).convert("RGB"), MEDIA / "loop-poster.webp", q=80)
tmp.unlink()
print("done")
