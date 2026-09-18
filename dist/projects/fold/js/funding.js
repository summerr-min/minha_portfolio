/* ── js/funding.js : 펀딩 숫자 카운트업 + 게이지 ── */

// 바뀌지 않는 프로젝트 값은 const 상수로 모아 둡니다.
// 5_000_000처럼 숫자 사이의 밑줄은 읽기 편하게 하는 표시일 뿐,
// JavaScript에서는 5000000과 같은 숫자로 처리됩니다.
const SEGMENT_COUNT = 24;
const GOAL_AMOUNT = 5_000_000;
const ACHIEVEMENT_RATE = 143;

// 게이지 막대가 들어갈 빈 <div id="gauge">를 찾습니다.
const gauge = document.getElementById("gauge");

// HTML에 같은 <span>을 24번 직접 적는 대신 반복문으로 만들어 넣습니다.
// createElement("span")은 새 요소를 만들고 appendChild()는 자식으로 추가합니다.
for (let index = 0; index < SEGMENT_COUNT; index += 1) {
  const segment = document.createElement("span");
  gauge.appendChild(segment);
}

// gauge.children은 방금 만든 24개 span의 목록입니다.
// 펼침 연산자([...])를 사용해 forEach를 쓸 수 있는 배열로 바꿉니다.
const segments = [...gauge.children];

// 카운트업 중 숫자를 표시할 HTML 요소들을 각각 찾습니다.
const percentEl = document.getElementById("percent");
const amountEl = document.getElementById("amount");
const backersEl = document.getElementById("backers");
const avgEl = document.getElementById("avg");

// 애니메이션 도중 생기는 소수는 반올림하고 한국식 천 단위 쉼표를 붙입니다.
// 예: formatNumber(7150000) → "7,150,000"
function formatNumber(number) {
  return Math.round(number).toLocaleString("ko-KR");
}

// 화면 요소가 아니라 일반 객체의 숫자도 GSAP으로 변화시킬 수 있습니다.
// 처음에는 달성률과 후원자 수가 모두 0이고 아래 gsap.to()가 목표값까지 올립니다.
const fundingData = { rate: 0, backers: 0 };

gsap.to(fundingData, {
  // fundingData.rate는 0 → 143, backers는 0 → 231로 변합니다.
  rate: ACHIEVEMENT_RATE,
  backers: 231,

  // 2초 동안 빠르게 시작해서 천천히 끝나는 움직임입니다.
  duration: 2,
  ease: "power2.out",

  // #funding의 위쪽이 화면 높이의 72% 지점에 오면 한 번 실행됩니다.
  scrollTrigger: { trigger: "#funding", start: "top 72%" },

  // onUpdate는 2초 동안 숫자가 조금씩 바뀔 때마다 반복 실행됩니다.
  onUpdate() {
    // textContent를 바꾸면 HTML 화면의 글자도 즉시 바뀝니다.
    percentEl.textContent = Math.round(fundingData.rate) + "%";

    // 모인 금액 = 목표 금액 × 현재 달성률 ÷ 100
    const currentAmount = (GOAL_AMOUNT * fundingData.rate) / 100;
    amountEl.textContent = formatNumber(currentAmount);
    backersEl.textContent = formatNumber(fundingData.backers);

    // 0명일 때 나눗셈을 하면 올바른 평균이 나오지 않으므로 조건을 확인합니다.
    // 삼항 연산자: 후원자가 있으면 평균을 계산하고, 없으면 "0"을 표시합니다.
    avgEl.textContent =
      fundingData.backers > 1
        ? formatNumber(currentAmount / fundingData.backers)
        : "0";

    // 달성률은 최대 100으로 제한한 뒤 24칸 중 켤 칸의 수로 바꿉니다.
    // 50%라면 0.5 × 24 = 12칸이 켜집니다.
    const limitedRate = Math.min(fundingData.rate, 100);
    const activeCount = Math.round(
      (limitedRate / 100) * SEGMENT_COUNT,
    );

    // classList.toggle(클래스, 조건)는 조건이 true면 클래스를 붙이고,
    // false면 뗍니다. index가 activeCount보다 작은 막대만 on이 됩니다.
    segments.forEach((segment, index) => {
      segment.classList.toggle("on", index < activeCount);
    });

    // 100%를 넘으면 is-over 클래스를 붙여 게이지와 숫자를 라임색으로 바꿉니다.
    const isOverGoal = fundingData.rate > 100;
    gauge.classList.toggle("is-over", isOverGoal);
    percentEl.classList.toggle("is-over", isOverGoal);
  },
});

// 게이지 24칸이 아래에서 위로 차례대로 펼쳐지는 별도의 애니메이션입니다.
gsap.to(".gauge span", {
  // CSS에서 각 막대는 scaleY(0.45) 상태이고, 여기서 원래 높이인 1로 만듭니다.
  scaleY: 1,
  duration: 0.5,
  ease: "power2.out",

  // 첫 막대부터 0.02초 간격으로 순서대로 시작합니다.
  stagger: { each: 0.02, from: "start" },
  scrollTrigger: { trigger: "#funding", start: "top 72%" },
});
