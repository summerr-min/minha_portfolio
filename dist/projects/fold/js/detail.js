/* ── js/detail.js : 제품 상세 스크롤 단계 + 색상 선택 ── */

// 상세 영역 안에서 SVG와 설명 패널을 함께 감싸는 요소입니다.
const stage = document.querySelector(".detail-stage");

// 데스크톱에서는 #detail이 긴 스크롤 영역(340vh)이고,
// 그 안의 .detail-sticky는 화면에 고정되어 있습니다.
// 사용자가 이 영역을 얼마나 지나왔는지에 따라 3개의 장면을 교체합니다.
ScrollTrigger.create({
  trigger: "#detail",

  // 상세 섹션의 위쪽이 화면 위쪽에 닿으면 시작합니다.
  start: "top top",

  // 상세 섹션의 아래쪽이 화면 아래쪽에 닿으면 끝납니다.
  end: "bottom bottom",

  // onUpdate는 상세 영역 안에서 스크롤 위치가 바뀔 때마다 실행됩니다.
  // self.progress에는 시작 0부터 끝 1까지의 진행률이 들어 있습니다.
  onUpdate(self) {
    // 0~1을 세 구간으로 나누어 1, 2, 3단계 번호를 만듭니다.
    // 예: 진행률 0.5 × 3 = 1.5 → 내림하면 1 → 1을 더하면 2단계
    const step = Math.min(3, Math.floor(self.progress * 3) + 1);

    // dataset.step에 2를 넣으면 HTML은 data-step="2" 상태가 됩니다.
    // sections.css의 [data-step="2"] 선택자가 해당 SVG와 패널을 보여 줍니다.
    stage.dataset.step = step;
  },
});

/* ── 제품 색상 버튼 ── */

// querySelectorAll()은 .swatch와 일치하는 모든 버튼을 목록으로 가져옵니다.
// forEach()로 각 버튼에 같은 클릭 기능을 연결합니다.
document.querySelectorAll(".swatch").forEach((swatchButton) => {
  swatchButton.addEventListener("click", () => {
    // 각 버튼의 data-color 값은 swatchButton.dataset.color로 읽습니다.
    // setProperty()로 CSS 변수 --product를 바꾸면 이 변수를 쓰는 SVG 색도 바뀝니다.
    document.documentElement.style.setProperty(
      "--product",
      swatchButton.dataset.color,
    );

    // 먼저 모든 버튼을 '선택 안 됨(false)' 상태로 초기화합니다.
    // aria-pressed는 보조 기술에도 현재 선택 상태를 알려 주고,
    // CSS의 .swatch[aria-pressed="true"] 선택자에도 사용됩니다.
    document
      .querySelectorAll(".swatch")
      .forEach((button) => button.setAttribute("aria-pressed", "false"));

    // 방금 클릭한 버튼만 '선택됨(true)' 상태로 바꿉니다.
    swatchButton.setAttribute("aria-pressed", "true");
  });
});
