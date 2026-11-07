"""The second poster (teal, the girl with the starfish) for the hero, as two layers like the first one.

    python tools/poster2_layers.py SECOND_CLEAN.png

SECOND_CLEAN.png is the second poster without its words (its PSD with the title layers hidden), 2560x1440.
The words are cut out of the finished posters by where they differ from it, so they stay exactly in place.
Writes assets/img/hero2-*.webp and bleed2.webp; prints the words' position (percent of the poster) for site.css.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
POSTERS = ROOT.parent / "海报" / "海报" / "海报"
IMG = ROOT / "assets" / "img"
PAPER = (251, 250, 246)


def webp(im, path, q=86):
    im.save(path, "WEBP", quality=q, method=6)
    print(path.name, im.size, path.stat().st_size // 1024, "KB")


clean = Image.open(sys.argv[1]).convert("RGB")
W, H = clean.size
c = np.asarray(clean).astype(np.float32)

# the poster without words: the back layer
for w in (1280, 1920):
    webp(clean.resize((w, round(H * w / W)), Image.LANCZOS), IMG / f"hero2-bg-{w}.webp")
# portrait screens: the girl's face, cropped from the right like the first poster's portrait crop (780x670)
crop = clean.crop((1200, 0, 2560, round(1360 * 670 / 780)))
for w in (520, 780):
    webp(crop.resize((w, round(w * 670 / 780)), Image.LANCZOS), IMG / f"hero2-bg-p-{w}.webp")

# the words, per language: where the finished poster differs from the clean one, in its lower-left part
for lang, name in (("en", "第二海报 英文.png"), ("zh", "第二海报 中文.png")):
    a = np.asarray(Image.open(POSTERS / name).convert("RGB")).astype(np.float32)
    m = np.clip((np.abs(a - c).max(axis=2) - 6) / 40, 0, 1)
    m[: int(H * 0.45)] = 0
    m[:, int(W * 0.62):] = 0
    layer = Image.fromarray(np.dstack([a, m * 255]).astype(np.uint8), "RGBA")
    bb = layer.getbbox()
    words = layer.crop(bb)
    words = words.resize((round(words.width * 0.75), round(words.height * 0.75)), Image.LANCZOS)
    webp(words, IMG / f"hero2-words-{lang}.webp", q=90)
    print(f"  {lang}: left {bb[0] / W * 100:.3f}%  top {bb[1] / H * 100:.3f}%  width {(bb[2] - bb[0]) / W * 100:.3f}%")

# bleed: the colours of the poster's bottom edge, fading into the paper (as bleed.webp for the first poster)
edge = clean.crop((0, H - 40, W, H)).resize((96, 1), Image.BOX).filter(ImageFilter.GaussianBlur(4))
BW, BH = 96, 160
bleed = Image.new("RGB", (BW, BH))
px = bleed.load()
for y in range(BH):
    t = min(1.0, max(0.0, (y / (BH - 1) - 0.18) / 0.82))
    k = 1 - (1 - t) ** 1.8
    k = k * k * (3 - 2 * k)
    for x in range(BW):
        e = edge.getpixel((x, 0))
        px[x, y] = tuple(round(e[i] + (PAPER[i] - e[i]) * k) for i in range(3))
webp(bleed.filter(ImageFilter.GaussianBlur(1.5)), IMG / "bleed2.webp", q=90)
print("portrait sky colour (bottom of the portrait crop):", crop.resize((1, 1), Image.BOX).getpixel((0, 0)),
      crop.crop((0, crop.height - 20, crop.width, crop.height)).resize((1, 1), Image.BOX).getpixel((0, 0)))
