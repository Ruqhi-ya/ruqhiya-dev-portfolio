/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // VS Code Dark+ palette
        vsc: {
          bg:         '#1e1e1e',
          bg2:        '#252526',
          bg3:        '#2d2d2d',
          sidebar:    '#252526',
          titlebar:   '#323233',
          statusbar:  '#007acc',
          tab:        '#2d2d2d',
          tabActive:  '#1e1e1e',
          border:     '#3e3e42',
          border2:    '#454545',
          text:       '#cccccc',
          textMuted:  '#858585',
          textDim:    '#6a6a6a',
          blue:       '#569cd6',
          green:      '#4ec9b0',
          green2:     '#6a9955',
          yellow:     '#dcdcaa',
          orange:     '#ce9178',
          orange2:    '#d7ba7d',
          purple:     '#c586c0',
          red:        '#f44747',
          cyan:       '#4fc1ff',
          white:      '#d4d4d4',
          // Light theme overrides (applied via CSS vars)
          light: {
            bg:       '#fffffe',
            bg2:      '#f3f3f3',
            bg3:      '#ffffff',
            sidebar:  '#f3f3f3',
            titlebar: '#dddddd',
            border:   '#e7e7e7',
            text:     '#383838',
            textMuted:'#717171',
          }
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
        'xs':  '0.75rem',
        'sm':  '0.8125rem',
      },
      animation: {
        'blink':     'blink 1.2s step-end infinite',
        'fade-in':   'fadeIn 0.2s ease-out',
        'slide-in':  'slideIn 0.2s ease-out',
        'type':      'typing 2s steps(20, end) forwards',
      },
      keyframes: {
        blink:   { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideIn: { from: { transform: 'translateY(-4px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
