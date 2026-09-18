# FOLD 코드 학습 가이드

이 문서는 `fold-funding` 프로젝트를 신입 웹퍼블리셔가 직접 설명할 수 있는 수준으로 정리한 자료입니다.

## 1. 전체 구조

```text
fold-funding/
├─ index.html          화면의 내용과 순서, SVG 제품 그림
├─ css/
│  ├─ base.css         색상 변수, 글꼴, 공통 초기 스타일
│  ├─ layout.css       고정 헤더와 하단 후원 바
│  └─ sections.css     히어로, 펀딩, 제품 상세, 색상, 스토리
└─ js/
   ├─ scroll.js        GSAP 플러그인 등록, 상단 스크롤 진행 바
   ├─ theme.js         라이트/다크 테마 버튼
   ├─ hero.js          히어로 텀블러 접힘 클래스 전환
   ├─ funding.js       펀딩 숫자와 24칸 게이지 애니메이션
   └─ detail.js        상세 3단계 장면과 제품 색상 버튼
```

별도의 빌드 도구나 프레임워크가 없는 정적 단일 페이지입니다. 브라우저가 `index.html`을 읽고 CSS를 적용한 뒤, 문서 아래쪽의 `<script>` 순서대로 JavaScript를 실행합니다.

## 2. 화면이 동작하는 순서

1. `base.css`의 CSS 변수로 전체 색상과 글꼴이 정해집니다.
2. 외부 CDN에서 GSAP과 ScrollTrigger를 불러옵니다.
3. `scroll.js`가 ScrollTrigger를 등록하고 페이지 진행 바를 연결합니다.
4. `theme.js`가 테마 버튼을 연결합니다.
5. `hero.js`가 스크롤 위치에 따라 텀블러에 `is-folded` 클래스를 붙입니다.
6. `funding.js`가 숫자를 0부터 목표값까지 올리고 게이지 칸을 켭니다.
7. `detail.js`가 상세 구간의 진행률을 `data-step="1"`, `2`, `3`으로 바꿉니다.
8. JavaScript가 만든 클래스와 `data-*` 값에 맞는 CSS가 실제 모양과 움직임을 보여 줍니다.

핵심은 **JavaScript가 모든 그림을 직접 그리는 것이 아니라 상태만 바꾸고, CSS가 그 상태의 모양을 담당한다**는 점입니다.

## 3. 신입 기준 난이도

### 먼저 이해해야 하는 기본·중급 코드

- `querySelector`, `getElementById`: HTML 요소 찾기
- `addEventListener`: 클릭·로드 같은 사건에 함수 연결하기
- `textContent`: 화면의 글자 바꾸기
- `classList.toggle`: 조건에 따라 클래스 붙이기/떼기
- `dataset`: `data-theme`, `data-step`, `data-color` 읽고 쓰기
- `for`, `forEach`: 같은 작업 반복하기
- CSS 변수 `var(--이름)`과 `style.setProperty`: 한 값을 바꿔 여러 스타일에 적용하기

이 정도는 신입 웹퍼블리셔 포트폴리오에서 설명할 수 있으면 좋은 범위입니다.

### 설명 준비가 필요한 고급 부분

- **GSAP + ScrollTrigger**: 브라우저 기본 기능이 아닌 외부 애니메이션 라이브러리입니다.
- **일반 객체 숫자 트윈**: `fundingData.rate` 같은 숫자를 GSAP으로 0에서 143까지 변화시키고 `onUpdate`에서 화면에 반영합니다.
- **스크롤 진행률의 단계 환산**: `Math.floor(self.progress * 3) + 1`로 0~1을 1~3단계로 바꿉니다.
- **sticky scrollytelling**: `340vh`의 긴 영역에서 한 무대를 고정하고 내용만 3번 교체합니다.
- **인라인 SVG 그룹 애니메이션**: `<g id="d-pleats">` 같은 내부 파츠를 CSS의 `transform`으로 움직입니다.
- **접근성 상태와 CSS를 함께 쓰는 방식**: `aria-pressed="true"`가 보조 기술에 선택 상태를 알리는 동시에 CSS 선택자로도 쓰입니다.

이 기능들을 사용했다는 사실 자체는 문제가 아닙니다. 다만 면접에서 “왜 GSAP을 썼는지”, “JS가 무엇을 바꾸고 CSS가 무엇을 하는지”를 설명하지 못하면 AI가 만든 코드를 그대로 쓴 인상을 줄 수 있습니다. 각 JS 파일의 한국어 주석을 따라 직접 한 줄씩 설명해 보는 것이 좋습니다.

## 4. SVG와 rect를 하나씩 쓴 이유

`<svg viewBox="0 0 140 300">`는 가로 140, 세로 300의 좌표판입니다. 그 안의 `<rect>`는 사각형 하나이며 주요 속성은 다음과 같습니다.

- `x`, `y`: 좌표판 안에서 시작하는 위치
- `width`, `height`: 너비와 높이
- `rx`: 모서리 둥글기
- `class`: CSS 색상과 테두리를 연결하는 이름

현재 그림은 뚜껑, 주름 8개, 하단을 서로 다른 도형으로 만들었습니다. 이렇게 하면 다음 장점이 있습니다.

- `<g id="lid">`, `<g id="pleats">`, `<g id="base">`로 파츠를 묶어 따로 움직일 수 있습니다.
- CSS 변수로 특정 파츠의 색만 바꿀 수 있습니다.
- 이미지 파일보다 확대했을 때 선이 깨지지 않습니다.

하지만 **반드시 주름 8개를 모두 `<rect>`로 직접 적어야 하는 것은 아닙니다.** 현재 애니메이션은 주름 각각이 아니라 `#pleats` 그룹 전체를 한 번에 눌러 접습니다. 8개의 사각형은 주름 사이의 간격을 눈에 보이게 만들기 위한 선택입니다.

### 더 쉬운 선택 방법

1. 움직임이 없는 그림이라면 Figma에서 SVG나 PNG로 내보내고 `<img>` 한 줄로 넣는 방법이 가장 쉽습니다. 대신 SVG 내부 파츠를 따로 움직이거나 색을 바꾸기 어렵습니다.
2. 지금처럼 단순한 사각형 제품은 `div` 세 개(뚜껑·본체·하단)와 CSS로 만들 수도 있습니다. 본체 주름은 `repeating-linear-gradient()`로 표현할 수 있습니다. HTML은 짧아지지만 실제 제품처럼 복잡한 모양에는 한계가 있습니다.
3. SVG의 `<defs>`와 `<use>`로 같은 주름을 재사용할 수 있습니다. 줄 수는 조금 줄지만 초보자가 읽기는 오히려 더 어려울 수 있습니다.
4. JavaScript 반복문으로 `<rect>`를 생성할 수도 있지만, 그림 구조를 이해하려고 JS까지 따라가야 하므로 이 프로젝트에는 권하지 않습니다.

따라서 이 프로젝트에서는 **현재 SVG를 유지하되 `lid / pleats / base` 세 그룹의 역할을 이해하는 방법**이 가장 안전합니다. 면접에서는 “스크롤로 세 파츠를 따로 제어하고 색상도 바꾸기 위해 인라인 SVG를 사용했다”고 설명하면 됩니다.

## 5. 파일별 JavaScript 역할

### `scroll.js`

GSAP에 ScrollTrigger를 등록합니다. `.progress-bar`의 가로 비율을 0에서 1로 바꾸고 `scrub: true`로 페이지 스크롤 양과 연결합니다. 이미지와 폰트가 로드된 뒤 `ScrollTrigger.refresh()`로 위치도 다시 계산합니다.

### `theme.js`

테마 버튼 클릭 시 `<html>`의 `data-theme`을 `light`와 `dark` 사이에서 바꿉니다. `base.css`의 `[data-theme="dark"]`가 이 값을 보고 색상 변수를 바꿉니다.

### `hero.js`

히어로 섹션의 스크롤 구간을 감시해 SVG에 `is-folded` 클래스를 붙이거나 뗍니다. 실제 접힘은 JavaScript가 아니라 `sections.css`의 `scaleY()`와 `translateY()`가 만듭니다.

### `funding.js`

24개의 게이지 막대를 반복문으로 만들고 GSAP으로 달성률과 후원자 수를 증가시킵니다. 매 프레임 `onUpdate()`가 퍼센트, 모인 금액, 후원자 수, 평균 후원액을 다시 계산합니다. 100%를 넘으면 `is-over` 클래스로 색을 바꿉니다.

### `detail.js`

상세 섹션의 스크롤 진행률을 3등분해 `.detail-stage`의 `data-step`을 바꿉니다. CSS는 이 값에 맞는 설명 패널과 SVG 상태를 보여 줍니다. 색상 버튼을 누르면 버튼의 `data-color`를 CSS 변수 `--product`에 넣고, `aria-pressed`로 현재 선택 버튼을 표시합니다.

## 6. 이번 정리에서 제거하거나 수정한 혼란 요소

- `hero.js`와 `scroll.js`에 중복되어 있던 히어로 ScrollTrigger를 하나로 정리했습니다.
- HTML 안에 있던 게이지 JavaScript를 관련 파일인 `funding.js`로 옮겼습니다.
- 아무 내용이 없던 `gsap.matchMedia()` 블록을 제거했습니다.
- 동작 코드가 없던 `data-speed` 속성과 패럴랙스라는 잘못된 설명을 제거했습니다.
- 존재하지 않던 `#reward` 링크를 실제 `#colors` 섹션 링크로 바꿨습니다.
- 상세 제품의 첫 색상이 보이도록 `--product` 초기값을 추가했습니다.
- 사용되지 않던 `.stub`, `.site-header.is-scrolled` CSS를 제거했습니다.

## 7. 아직 개선할 수 있는 부분

- 테마 선택은 새로고침하면 다시 라이트로 돌아옵니다. 저장이 필요하면 나중에 `localStorage`를 추가할 수 있습니다.
- “후원하기” 버튼은 현재 화면만 있고 클릭 동작은 없습니다. 실제 포트폴리오라면 모달, 외부 링크, 또는 비활성 데모 표시 중 하나를 정해야 합니다.
- `sections.css`가 700줄 이상이므로 프로젝트가 더 커진다면 `hero.css`, `funding.css`, `detail.css`, `story.css`로 나누는 편이 찾기 쉽습니다.
- 모션 감소 설정(`prefers-reduced-motion`)에서는 CSS 스크롤만 줄고 GSAP 애니메이션은 계속됩니다. 접근성을 완성하려면 JS에서도 모션을 끄는 처리가 필요합니다.
