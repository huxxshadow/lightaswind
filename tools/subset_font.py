"""Subset Xiaolai (小赖字体, SIL OFL 1.1) to the glyphs this site uses.

    python tools/subset_font.py path/to/Xiaolai-Regular.ttf

Font source: https://github.com/lxgw/kose-font/releases (Xiaolai-Regular.ttf).
Re-run whenever page text changes (index.html, 404.html, assets/site.js).
Needs: pip install fonttools brotli
"""
import string
import sys
from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ["index.html", "404.html", "assets/site.js"]

chars = set(string.printable)
for rel in SOURCES:
    chars |= set((ROOT / rel).read_text(encoding="utf-8"))
chars |= set("～〜·©、。，！？「」…—“”")
text = "".join(sorted(c for c in chars if c.isprintable()))

out = ROOT / "assets" / "fonts" / "xiaolai-subset.woff2"
out.parent.mkdir(parents=True, exist_ok=True)
opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["*"]
opts.name_IDs = ["*"]  # keep copyright / licence names (OFL)
opts.notdef_outline = True
font = subset.load_font(sys.argv[1], opts)
s = subset.Subsetter(opts)
s.populate(text=text)
s.subset(font)
subset.save_font(font, str(out), opts)
print(f"{len(text)} chars -> {out} ({out.stat().st_size // 1024} KB)")
