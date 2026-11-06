"""Split the poster into parallax layers for the hero: sky (with the doves), the girl, and - already separate in
../海报 - the line-art title, subtitle and mascot.

1. The title, subtitle and mascot doodle are found on the poster (they sit at 1:1, at the positions below) and
   painted out (OpenCV inpaint), with the poster's paper grain put back.
2. The girl (everything not sky-blue that touches the right edge, holes filled, a soft edge) becomes her own
   RGBA layer; the sky under her is filled with the surrounding blue.

Writes assets/img/hero-sky-*.webp, hero-girl-*.webp and the phone crops hero-sky-p-*.webp, hero-girl-p-*.webp.
Source art in ../海报 is only read.  Needs: pip install opencv-python-headless numpy pillow

    python tools/poster_layers.py
"""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
P = str(ROOT.parent / "海报") + "/"
IMG = ROOT / "assets" / "img"

# ---- 1. paint the text out ----
im=np.array(Image.open(P+"海报 中文.png").convert('RGB'))
H,W=im.shape[:2]
mask=np.zeros((H,W),np.uint8)
for part,(x,y) in [("中文主标题.png",(49,620)),("中文副标题.png",(50,788)),("啾咪.png",(950,820))]:
    a=np.array(Image.open(P+part).convert('RGBA'))[:,:,3]
    h,w=a.shape; mask[y:y+h,x:x+w]=np.maximum(mask[y:y+h,x:x+w],(a>8).astype(np.uint8)*255)
# also anything near-white & thin inside the text boxes the template missed (antialias, slight offsets)
box=np.zeros_like(mask); box[600:1000,30:1040]=1
wh=((im.max(2)>215)&((im.max(2).astype(int)-im.min(2))<45)).astype(np.uint8)*255
mask=np.maximum(mask, cv2.bitwise_and(wh,wh,mask=box) )
mask=cv2.dilate(mask,np.ones((9,9),np.uint8))
mask[:, 1164:] = 0  # never touch the girl's hair
bgr=cv2.cvtColor(im,cv2.COLOR_RGB2BGR)
out=cv2.inpaint(bgr,mask,21,cv2.INPAINT_TELEA)
# soften the filled area a touch so it matches the blurry sky
blur=cv2.GaussianBlur(out,(0,0),6)
m=cv2.GaussianBlur(mask,(0,0),4).astype(np.float32)[...,None]/255
out=(out*(1-m)+blur*m)
# put the poster's paper grain back over the filled area
hp=bgr.astype(np.float32)-cv2.GaussianBlur(bgr.astype(np.float32),(0,0),2)
sky=(mask==0)[...,None]&(np.arange(W)[None,:,None]<900)
sd=float(hp[np.broadcast_to(sky,hp.shape)].std())
rng=np.random.default_rng(7); noise=rng.normal(0,sd,(H,W,1))
out=np.clip(out+noise*m,0,255).astype(np.uint8)

clean=cv2.cvtColor(out,cv2.COLOR_BGR2RGB)

# ---- 2. lift the girl off the sky ----
im=clean.astype(np.float32)
H,W=im.shape[:2]
r,g,b=im[...,0],im[...,1],im[...,2]
blue=np.clip((b-r-70)/60,0,1)            # 1 = clearly sky blue
notsky=(blue<0.5).astype(np.uint8)
n,lab,stats,_=cv2.connectedComponentsWithStats(notsky,8)
keep=np.zeros((H,W),np.uint8)
for k in range(1,n):
    x,y,w,h,a=stats[k]
    if x+w>=W-2 and a>5000: keep[lab==k]=1   # touches the right edge: the girl (and the near, blurry dove)
keep=cv2.morphologyEx(keep,cv2.MORPH_CLOSE,np.ones((15,15),np.uint8))
# fill holes (eyes, shadows that look bluish)
ff=keep.copy(); m2=np.zeros((H+2,W+2),np.uint8); cv2.floodFill(ff,m2,(0,0),1); keep=keep|(1-ff)
# soft edge: inside a thin band use the colour's own 'not-blue' as alpha
band=cv2.dilate(keep,np.ones((5,5),np.uint8))
alpha=np.where(keep>0,1.0,0.0)
edge=(band>0)&(keep==0)
alpha[edge]=(1-blue[edge])
alpha=cv2.GaussianBlur(alpha.astype(np.float32),(0,0),0.8)
rgba=np.dstack([im,alpha*255]).astype(np.uint8)

# background without the girl: inpaint at 1/4 size, upscale, use only under the girl
small=cv2.resize(im.astype(np.uint8),(W//4,H//4),interpolation=cv2.INTER_AREA)
msk=cv2.resize(cv2.dilate(keep,np.ones((41,41),np.uint8))*255,(W//4,H//4),interpolation=cv2.INTER_NEAREST)
fill=cv2.inpaint(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),msk,15,cv2.INPAINT_TELEA)
fill=cv2.cvtColor(cv2.GaussianBlur(fill,(0,0),3),cv2.COLOR_BGR2RGB)
fill=cv2.resize(fill,(W,H),interpolation=cv2.INTER_CUBIC).astype(np.float32)
a3=cv2.GaussianBlur(cv2.dilate(keep,np.ones((31,31),np.uint8)).astype(np.float32),(0,0),6)[...,None]
sky=im*(1-a3)+fill*a3

sky = np.clip(sky, 0, 255).astype(np.uint8)


def save(arr, name, widths, crop=None, mode="RGB"):
    im = Image.fromarray(arr, mode)
    if crop:
        im = im.crop(crop)
    for w in widths:
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(IMG / f"{name}-{w}.webp", "WEBP", quality=84, method=6)


save(sky, "hero-sky", (1920, 1280))
save(rgba, "hero-girl", (1920, 1280), mode="RGBA")
PHONE = (860, 0, 1640, 670)  # the phone crop: the girl's profile, above where the title sat
save(sky, "hero-sky-p", (780, 520), PHONE)
save(rgba, "hero-girl-p", (780, 520), PHONE, mode="RGBA")
print("layers done")
