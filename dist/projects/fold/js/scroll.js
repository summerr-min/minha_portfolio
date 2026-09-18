/* ── js/scroll.js : 페이지 전체 스크롤 진척도 바 ── */

// GSAP의 추가 기능인 ScrollTrigger를 사용하겠다고 먼저 등록합니다.
// index.html에서 scroll.js를 다른 기능 파일보다 먼저 불러오는 이유입니다.
gsap.registerPlugin(ScrollTrigger);

// gsap.to(대상, 옵션)는 대상의 현재 상태를 옵션에 적은 목표 상태까지 바꿉니다.
// .progress-bar는 CSS에서 scaleX(0)이므로 처음에는 가로 길이가 0입니다.
gsap.to(".progress-bar", {
  // scaleX가 1이 되면 원래 너비(100%)가 모두 보입니다.
  scaleX: 1,

  // ease: "none"은 가속이나 감속 없이 스크롤 위치와 일정하게 맞춥니다.
  ease: "none",

  // start: 0부터 end: "max"(문서의 마지막 스크롤 지점)까지 연결합니다.
  // scrub: true는 시간으로 재생하지 않고 스크롤 양에 맞춰 애니메이션을 움직입니다.
  scrollTrigger: { start: 0, end: "max", scrub: true },
});

// 이미지와 웹폰트 로딩이 끝나면 각 섹션의 실제 위치를 다시 계산합니다.
// 로딩 전후로 높이가 달라져 스크롤 시작점이 어긋나는 일을 막아 줍니다.
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
