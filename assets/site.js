(function () {
  "use strict";

  var T = {
    zh: {
      htmlLang: "zh-CN", docTitle: "愿此身如风 · Light as Wind", name: "中文",
      skip: "跳到正文", title: "愿此身如风", subtitle: "～去往天空深蓝的彼方",
      lead: "手工打造的像素风海洋横版游戏，一切由程序生成。",
      soon: "敬请期待", itchSoon: "即将登陆 itch.io", next: "下一页",
      qq: "QQ 群", mail: "邮箱", copied: "QQ 群号已复制",
      posterAlt: "海报：蓝天下白发少女的侧脸，白鸽飞过"
    },
    en: {
      htmlLang: "en", docTitle: "Light as Wind · 愿此身如风", name: "English",
      skip: "Skip to content", title: "Light as Wind", subtitle: "~ To the Far Side of Deep Blue Sky",
      lead: "A hand-made pixel-art ocean side-scroller, generated entirely by code.",
      soon: "Coming soon", itchSoon: "Coming to itch.io", next: "Next page",
      qq: "QQ group", mail: "Email", copied: "QQ group number copied",
      posterAlt: "Poster: a white-haired girl in profile against a blue sky, white doves flying past"
    },
    ja: {
      htmlLang: "ja", docTitle: "この身、風のごとく · Light as Wind", name: "日本語",
      skip: "本文へスキップ", title: "この身、風のごとく", subtitle: "〜深く青い空の彼方へ",
      lead: "手づくりのピクセルアート海洋横スクロール。すべてプログラムで生成。",
      soon: "近日公開", itchSoon: "itch.io にて近日公開", next: "次のページ",
      qq: "QQ グループ", mail: "メール", copied: "QQ グループ番号をコピーしました",
      posterAlt: "ポスター：青空を背に白い髪の少女の横顔、白い鳩が飛んでいく"
    },
    ko: {
      htmlLang: "ko", docTitle: "이 몸 바람처럼 · Light as Wind", name: "한국어",
      skip: "본문으로 건너뛰기", title: "이 몸 바람처럼", subtitle: "~ 깊고 푸른 하늘 저편으로",
      lead: "손으로 빚은 픽셀 아트 바다 횡스크롤 게임. 모든 것이 프로그램으로 생성됩니다.",
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
