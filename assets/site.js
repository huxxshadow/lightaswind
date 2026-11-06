(function () {
  "use strict";

  var T = {
    zh: {
      htmlLang: "zh-CN", docTitle: "愿此身如风 · Light as Wind", name: "中文",
      skip: "跳到正文", title: "愿此身如风", subtitle: "～去往天空深蓝的彼方",
      aboutH: "游戏简介",
      lead: "在这款像素风横版冒险游戏中，你将踏上一段梦幻而有趣的旅程，\n穿过海洋，追寻远方的天空。",
      motto: "愿此身如风，去往天空深蓝的彼方。",
      poem1: "听说，海的尽头，\n是一片深蓝色的天空。",
      poem2: "梦总有醒来的时候。\n但现在，旅途还没有结束。",
      poem3: "所以啊，在醒来之前，\n再往前走一点吧。",
      soon: "敬请期待", itchSoon: "即将登陆 itch.io", next: "下一页",
      qq: "QQ 群", mail: "邮箱", copied: "已复制 QQ 群号 153707643",
      clipAlt: "一群水母从海底缓缓上升", pause: "暂停", play: "播放",
      altA: "幽暗的海底剧场里，一束光照着弹竖琴的玩偶海星，水母在四周漂浮",
      altC: "漆黑的深海里，一只发光的水母漂过珊瑚丛",
      altD: "海底沉船的残骸旁，珊瑚和海草静静生长",
      altB: "浅海的巨大珊瑚旁，一只红色螃蟹在沙地上爬行",
      storyAlt: "水母群从海底向上漂去，玩偶海星站在海草之间",
      posterAlt: "海报：蓝天下白发少女的侧脸，白鸽飞过"
    },
    en: {
      htmlLang: "en", docTitle: "Light as Wind · 愿此身如风", name: "English",
      skip: "Skip to content", title: "Light as Wind", subtitle: "~ To the Far Side of Deep Blue Sky",
      aboutH: "About the game",
      lead: "In this pixel-art side-scrolling adventure, you set out on a dreamy, playful journey across the ocean, chasing a faraway sky.",
      motto: "Light as wind, to the far side of deep blue sky.",
      poem1: "They say that where the sea ends, there is a sky of deep blue.",
      poem2: "Every dream ends in waking. But not yet: the journey isn't over.",
      poem3: "So, before you wake, go a little further.",
      soon: "Coming soon", itchSoon: "Coming to itch.io", next: "Next page",
      qq: "QQ group", mail: "Email", copied: "Copied QQ group number 153707643",
      clipAlt: "A swarm of jellyfish slowly rising from the seabed", pause: "Pause", play: "Play",
      altA: "In a dark undersea theatre, a beam of light falls on a plush starfish playing a harp while jellyfish drift around",
      altC: "A glowing jellyfish drifting over coral in the pitch-dark deep",
      altD: "The wreck of a ship on the seabed, with coral and seagrass growing around it",
      altB: "A red crab crawling across the sand beside giant shallow-water corals",
      storyAlt: "Jellyfish drifting up from the seabed past a plush starfish standing in the seagrass",
      posterAlt: "Poster: a white-haired girl in profile against a blue sky, white doves flying past"
    },
    ja: {
      htmlLang: "ja", docTitle: "この身、風のごとく · Light as Wind", name: "日本語",
      skip: "本文へスキップ", title: "この身、風のごとく", subtitle: "〜深く青い空の彼方へ",
      aboutH: "ゲーム紹介",
      lead: "このピクセルアートの横スクロールアドベンチャーで、あなたは海を越え、遠い空を追いかける、夢のように不思議で楽しい旅に出ます。",
      motto: "この身、風のごとく。深く青い空の彼方へ。",
      poem1: "海の果てには、\n深い青色の空があるらしい。",
      poem2: "夢はいつか覚めるもの。\nでも今は、旅はまだ終わっていない。",
      poem3: "だから、目が覚める前に、\nもう少しだけ先へ進もう。",
      soon: "近日公開", itchSoon: "itch.io にて近日公開", next: "次のページ",
      qq: "QQ グループ", mail: "メール", copied: "QQ グループ番号 153707643 をコピーしました",
      clipAlt: "海底からゆっくり昇っていくクラゲの群れ", pause: "一時停止", play: "再生",
      altA: "暗い海底の劇場で、ハープを弾くぬいぐるみのヒトデに光が差し、まわりをクラゲが漂う",
      altC: "真っ暗な深海で、光るクラゲがサンゴの上を漂う",
      altD: "海底に沈んだ船の残骸のまわりに、サンゴと海草が育っている",
      altB: "浅瀬の巨大なサンゴのそばを、赤いカニが砂の上を歩いていく",
      storyAlt: "海草の間に立つぬいぐるみのヒトデの上を、クラゲの群れが昇っていく",
      posterAlt: "ポスター：青空を背に白い髪の少女の横顔、白い鳩が飛んでいく"
    },
    ko: {
      htmlLang: "ko", docTitle: "이 몸 바람처럼 · Light as Wind", name: "한국어",
      skip: "본문으로 건너뛰기", title: "이 몸 바람처럼", subtitle: "~ 깊고 푸른 하늘 저편으로",
      aboutH: "게임 소개",
      lead: "이 픽셀 아트 횡스크롤 어드벤처에서, 당신은 바다를 건너 먼 하늘을 좇는 꿈같고 즐거운 여정을 떠납니다.",
      motto: "이 몸 바람처럼, 깊고 푸른 하늘 저편으로.",
      poem1: "바다의 끝에는 깊고 푸른 하늘이 있다고 해요.",
      poem2: "꿈은 언젠가 깨기 마련이죠. 하지만 지금은, 여행이 아직 끝나지 않았어요.",
      poem3: "그러니까, 깨어나기 전에 조금만 더 앞으로 가 봐요.",
      soon: "곧 공개", itchSoon: "곧 itch.io에서 만나요", next: "다음 페이지",
      qq: "QQ 그룹", mail: "이메일", copied: "QQ 그룹 번호 153707643 를 복사했습니다",
      clipAlt: "해저에서 천천히 떠오르는 해파리 떼", pause: "일시정지", play: "재생",
      altA: "어두운 해저 극장에서 하프를 켜는 인형 불가사리에게 빛이 내리고, 주위로 해파리가 떠다닌다",
      altC: "칠흑 같은 심해에서 빛나는 해파리가 산호 위를 떠다닌다",
      altD: "해저에 가라앉은 난파선 주위로 산호와 해초가 자란다",
      altB: "얕은 바다의 거대한 산호 옆 모래 위를 빨간 게가 기어간다",
      storyAlt: "해초 사이에 선 인형 불가사리 위로 해파리 떼가 떠오른다",
      posterAlt: "포스터: 푸른 하늘을 배경으로 한 흰 머리 소녀의 옆얼굴, 흰 비둘기가 날아간다"
    }
  };

  var root = document.documentElement;
  var current = root.getAttribute("data-lang") || "zh";

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  function apply(lang) {
    var t = T[lang] || T.en;
    current = lang;
    root.setAttribute("data-lang", lang);
    root.lang = t.htmlLang;
    document.title = t.docTitle;
    each("[data-i18n]", function (el) { var v = t[el.getAttribute("data-i18n")]; if (v != null) el.textContent = v; });
    each("[data-i18n-alt]", function (el) { el.alt = t[el.getAttribute("data-i18n-alt")]; });
    each("[data-i18n-aria]", function (el) { el.setAttribute("aria-label", t[el.getAttribute("data-i18n-aria")]); });
    each("[data-set-lang]", function (el) { el.setAttribute("aria-pressed", String(el.getAttribute("data-set-lang") === lang)); });
    var cur = document.querySelector(".lang-cur");
    if (cur) cur.textContent = t.name;
  }

  // Language dropdown
  var langBtn = document.querySelector(".lang-btn");
  var langMenu = document.getElementById("lang-menu");
  function setOpen(open, focusItem) {
    langMenu.hidden = !open;
    langBtn.setAttribute("aria-expanded", String(open));
    if (open && focusItem) (langMenu.querySelector('[aria-pressed="true"]') || langMenu.querySelector("button")).focus();
  }
  langBtn.addEventListener("click", function (e) { setOpen(langMenu.hidden, e.detail === 0); });
  document.addEventListener("click", function (e) { if (!langMenu.hidden && !e.target.closest(".lang")) setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (langMenu.hidden) return;
    if (e.key === "Escape") { setOpen(false); langBtn.focus(); return; }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      var items = Array.prototype.slice.call(langMenu.querySelectorAll("button"));
      var k = items.indexOf(document.activeElement);
      k = e.key === "ArrowDown" ? (k + 1) % items.length : (k - 1 + items.length) % items.length;
      items[k].focus(); e.preventDefault();
    }
  });
  each("[data-set-lang]", function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-set-lang");
      try { localStorage.setItem("law-lang", l); } catch (e) {}
      apply(l);
      setOpen(false);
      langBtn.focus();
    });
  });

  // QQ group: copy the number.
  var toast = document.querySelector(".toast"), timer;
  each("[data-copy]", function (b) {
    b.addEventListener("click", function () {
      var num = b.getAttribute("data-copy");
      var show = function (msg) {
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(timer);
        timer = setTimeout(function () { toast.classList.remove("show"); }, 2600);
      };
      // If the clipboard is unavailable, still show the number so it can be typed.
      var fallback = function () { show(T[current].qq + " " + num); };
      if (navigator.clipboard) navigator.clipboard.writeText(num).then(function () { show(T[current].copied); }, fallback);
      else fallback();
    });
  });

  // Story clip: plays only while on screen, never with reduced motion.
  var video = document.getElementById("story-video");
  var toggle = document.querySelector(".playpause");
  var userPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function syncPlay() {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(userPaused));
    toggle.setAttribute("aria-label", T[current][userPaused ? "play" : "pause"]);
  }
  if (video && toggle) {
    var visible = false;
    var run = function () {
      if (visible && !userPaused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
      else video.pause();
    };
    toggle.addEventListener("click", function () { userPaused = !userPaused; syncPlay(); run(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; run(); }, { threshold: 0.3 }).observe(video);
    }
  }

  // Header: transparent over the poster, paper-coloured once past it.
  var head = document.querySelector(".site-head");
  var hero = document.getElementById("top");
  if (head && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      head.classList.toggle("solid", !e[0].isIntersecting);
    }, { rootMargin: "-72px 0px 0px 0px", threshold: 0.12 }).observe(hero);
  }

  apply(current);
  syncPlay();
})();
