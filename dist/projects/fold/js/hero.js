/* ── js/hero.js : 히어로 텀블러 접힘 효과 ── */

// ScrollTrigger.create()는 스크롤 위치를 감시하는 기능을 만듭니다.
ScrollTrigger.create({
  // trigger는 감시 기준이 되는 HTML 요소입니다.
  trigger: "#hero",

  // #hero의 위쪽이 화면 위쪽에 닿을 때 감시 구간이 시작됩니다.
  start: "top top",

  // #hero의 아래쪽이 화면 중앙에 닿을 때 감시 구간이 끝납니다.
  end: "bottom center",

  // 감시 구간을 벗어나면 .tumbler에 is-folded 클래스를 붙이고,
  // 다시 구간 안으로 돌아오면 클래스를 뗍니다.
  // 실제 접히는 모양은 sections.css의 .tumbler.is-folded 규칙이 담당합니다.
  toggleClass: { targets: ".tumbler", className: "is-folded" },
});
