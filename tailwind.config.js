/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 매거진 톤: 따뜻한 베이지 + 잉크 + 포인트 코랄/올리브
        paper: {
          50: '#fbf8f3',   // 가장 밝은 종이색 (배경)
          100: '#f6f1e8',  // 카드 배경
          200: '#ece4d4',  // 구분선
          300: '#d9cdb5',
        },
        ink: {
          900: '#1a1612',  // 본문 진한 잉크
          800: '#2a241d',
          700: '#3d342a',  // 부제목
          500: '#6e6358',  // 캡션
          400: '#9c9085',  // 메타 정보
          300: '#c4baad',
          200: '#e6ddd0',
          100: '#f1ece2',
          50: '#f8f5ee',
        },
        // 포인트 컬러: 흙빛 코랄
        accent: {
          50: '#fcf3ee',
          100: '#f7e1d4',
          200: '#eebda4',
          300: '#e29473',
          400: '#d57049',
          500: '#c25a35', // primary
          600: '#a8482a',
          700: '#873823',
          800: '#65291a',
          900: '#421a11',
        },
        // 보조: 차분한 올리브
        sage: {
          100: '#e8ebe1',
          300: '#a8b095',
          500: '#6b745a',
          700: '#4a523c',
        },
        // 호환성용 (기존 brand-500 코드가 안 깨지게)
        brand: {
          50: '#fcf3ee',
          100: '#f7e1d4',
          200: '#eebda4',
          300: '#e29473',
          400: '#d57049',
          500: '#c25a35',
          600: '#a8482a',
          700: '#873823',
          800: '#65291a',
          900: '#421a11',
        },
        sky2: {
          50: '#f0f7ff',
          100: '#e0efff',
          500: '#3da5ff',
          600: '#2a8be8',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // 매거진 본문/제목용 세리프
        serif: ['"Nanum Myeongjo"', '"Noto Serif KR"', 'ui-serif', 'Georgia', 'serif'],
        // 손글씨 느낌 (인용구용)
        script: ['"Gowun Batang"', '"Nanum Myeongjo"', 'ui-serif', 'serif'],
        display: ['"Nanum Myeongjo"', '"Noto Serif KR"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(40, 30, 20, 0.04), 0 8px 24px rgba(40, 30, 20, 0.06)',
        soft: '0 2px 12px rgba(194, 90, 53, 0.08)',
        float: '0 10px 30px rgba(40, 30, 20, 0.12)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      letterSpacing: {
        'magazine': '0.18em',
      },
    },
  },
  plugins: [],
};
