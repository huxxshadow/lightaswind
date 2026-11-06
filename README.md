# lightaswind.com

Official website for **Light as Wind (愿此身如风)**. A single static page: plain HTML, CSS and a little JS. No build step.

```
index.html          the page (zh / en / ja / ko, auto-detected, switchable)
404.html            not-found page (GitHub Pages serves it automatically)
assets/site.css     styles
assets/site.js      language menu, copy QQ group
assets/img|icons   generated images and icons
og-en.jpg, og-zh.jpg     social share cards
CNAME               custom domain for GitHub Pages
tools/build_assets.py    regenerates everything in assets/ from the source art
```

## Preview locally

```bash
python -m http.server 8080
```

Then open http://localhost:8080/.

## Regenerating assets

The source art lives outside this repo (`../海报`, `../啾咪游戏图标-放大透明版`) and is only read, never changed.

```bash
python tools/build_assets.py
```

This needs Pillow.

## Deploy: GitHub Pages + Cloudflare

1. **Create the repo.** Make a new GitHub repository (for example `lightaswind.com` or `website`) and push `main`:
   ```bash
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. **Enable Pages.** Go to repo → Settings → Pages → Build and deployment → Source: *Deploy from a branch*, Branch: `main` / `(root)`.
3. **Custom domain.** In the same page, set Custom domain to `lightaswind.com`. The `CNAME` file in this repo already contains it. Turn on **Enforce HTTPS** once GitHub has issued the certificate, which can take a few minutes up to an hour.
4. **Cloudflare DNS** (zone `lightaswind.com`):

   | Type  | Name | Content               |
   |-------|------|-----------------------|
   | A     | @    | 185.199.108.153       |
   | A     | @    | 185.199.109.153       |
   | A     | @    | 185.199.110.153       |
   | A     | @    | 185.199.111.153       |
   | AAAA  | @    | 2606:50c0:8000::153   |
   | AAAA  | @    | 2606:50c0:8001::153   |
   | AAAA  | @    | 2606:50c0:8002::153   |
   | AAAA  | @    | 2606:50c0:8003::153   |
   | CNAME | www  | `<user>.github.io`    |

   Tip: leave the records **DNS only (grey cloud)** until GitHub shows the domain as verified and the HTTPS certificate is issued. Then switch them to **Proxied (orange cloud)** to use the Cloudflare CDN.
   Optional: verify the domain under GitHub → Settings (account) → Pages → *Add a domain*, which adds a TXT record and protects against domain takeover.
5. **Cloudflare SSL/TLS.**
   - SSL/TLS → Overview → encryption mode **Full** (or *Full (strict)* once GitHub's certificate is live). Do **not** use *Flexible*: it causes redirect loops with GitHub Pages.
   - SSL/TLS → Edge Certificates → **Always Use HTTPS**: on.
6. **Check.** https://lightaswind.com/ and https://www.lightaswind.com/ should both load (GitHub redirects `www` to the apex).

## Placeholders

Release date, platforms and store links are not announced yet. Page 2 has a "Coming to itch.io" slot. Search `ITCH EMBED` in `index.html` and paste the itch.io widget iframe (itch.io → Edit game → Distribute → Embed game) in place of the placeholder.
