/* ── js/theme.js : 밝은 테마와 어두운 테마 전환 ── */

// document.documentElement는 문서의 최상위 요소인 <html>을 뜻합니다.
// CSS의 [data-theme="dark"]가 이 요소의 data-theme 값을 보고 색을 바꿉니다.
const html = document.documentElement;

// querySelector()는 CSS 선택자와 일치하는 첫 번째 요소를 가져옵니다.
// 여기서는 index.html의 <button class="theme-toggle">을 찾습니다.
const themeButton = document.querySelector(".theme-toggle");

// 페이지를 처음 열었을 때는 밝은 테마로 시작합니다.
// dataset.theme에 값을 넣으면 HTML에는 data-theme="light"가 만들어집니다.
html.dataset.theme = "light";

// addEventListener("click", 함수)는 버튼을 클릭할 때마다 함수를 실행합니다.
themeButton.addEventListener("click", () => {
  // 삼항 연산자: 현재 값이 dark이면 light를, 아니면 dark를 선택합니다.
  const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";

  // 바뀐 값이 <html data-theme="...">에 적용되고 CSS 색상 변수도 함께 바뀝니다.
  html.dataset.theme = nextTheme;
});
