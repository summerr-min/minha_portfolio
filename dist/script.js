// 모바일 메뉴에 필요한 요소 가져옴
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-nav");
const menuLinks = document.querySelectorAll(".site-nav a");

function openMenu() {
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "메뉴 닫기");
  menu.classList.add("is-open");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
  menu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  const isOpen = menu.classList.contains("is-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function closeMenuWithEscape(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
}
function closeMenuOnDesktop() {
  if (window.innerWidth > 860) {
    closeMenu();
  }
}

// 버튼, 키보드, 화면 크기 변경에 필요한 동작 연결
menuButton.addEventListener("click", toggleMenu);
document.addEventListener("keydown", closeMenuWithEscape);
window.addEventListener("resize", closeMenuOnDesktop);

for (let i = 0; i < menuLinks.length; i += 1) {
  menuLinks[i].addEventListener("click", closeMenu);
}
