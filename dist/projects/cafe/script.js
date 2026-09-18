document.addEventListener("DOMContentLoaded", () => {
  // 1. 모바일 햄버거 메뉴 토글 기능
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    // nav-menu에 active 클래스를 토글하여 메뉴를 열고 닫음
    navMenu.classList.toggle("active");

    // 접근성(웹 표준): 메뉴가 열렸는지 스크린 리더에게 알려줌
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
  });

  // 2. 메뉴 탭(Tab) 필터링 기능
  const tabBtns = document.querySelectorAll(".tab-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 모든 탭의 active 클래스 제거 후, 클릭된 버튼에만 추가
      tabBtns.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      // 선택된 카테고리에 맞춰 메뉴 항목 보여주기/숨기기
      menuItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block"; // 조건에 맞으면 표시
        } else {
          item.style.display = "none"; // 조건에 안 맞으면 숨김
        }
      });
    });
  });
});
