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
      qq: "QQ 群", mail: "邮箱", copied: "QQ 群号已复制",
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
      qq: "QQ group", mail: "Email", copied: "QQ group number copied",
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
      qq: "QQ グループ", mail: "メール", copied: "QQ グループ番号をコピーしました",
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
      qq: "QQ 그룹", mail: "이메일", copied: "QQ 그룹 번호를 복사했습니다",
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
    each("[data-i18n-aria]", function (el) { el.setAttribute("aria-label", t[el.getAttribute("data-i18n-aria")]); });
    each("[data-set-lang]", function (el) { el.setAttribute("aria-pressed", String(el.getAttribute("data-set-lang") === lang)); });
  }

  each("[data-set-lang]", function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-set-lang");
      try { localStorage.setItem("law-lang", l); } catch (e) {}
      apply(l);
    });
  });

  // QQ group: copy the number.
  var toast = document.querySelector(".toast"), timer;
  each("[data-copy]", function (b) {
    b.addEventListener("click", function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(b.getAttribute("data-copy")).then(function () {
        toast.textContent = T[current].copied;
        clearTimeout(timer);
        timer = setTimeout(function () { toast.textContent = ""; }, 2000);
      }, function () {});
    });
  });

  apply(current);
})();
