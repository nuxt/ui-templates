const colors = require('windicss/colors')

module.exports = {
  purge: ['./src/**/*.html'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: 'DM Sans, sans-serif'
      }
    },
    colors: {
      white: 'white',
      black: 'black',
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        50: '#F2FDF9',
        100: '#E6FCF3',
        200: '#BFF6E0',
        300: '#99F1CD',
        400: '#4DE7A8',
        DEFAULT: '#00DC82',
        600: '#00C675',
        700: '#00844E',
        800: '#00633B',
        900: '#004227'
      },
      'purple-surface': '#E8E6F0',
      'purple-dark': '#D1D1E2',
      'stone-surface': '#F6F6F6',
      'stone-lightest': '#D4D4D4',
      'secondary-surface': '#E5F9FF',
      'secondary-lightest': '#B7E1ED',
      'secondary-lighter': '#95CDDE',
      'secondary-light': '#71A2B0',
      secondary: '#497A87',
      'secondary-dark': '#255461',
      'secondary-darker': '#003543',
      'secondary-darkest': '#012A35',
      'secondary-black': '#001E26',
      tertiary: '#B2CCCC', // cloud
      'cloud-surface': '#E6F0F0',
      'cloud-lightest': '#D1E2E2',
      'cloud-lighter': '#B2CCCC',
      'cloud-light': '#92ADAD',
      cloud: '#688282',
      'cloud-dark': '#566B6B',
      'cloud-darker': '#334040',
      'cloud-darkest': '#273131',
      'cloud-black': '#1A2121',
      blue: colors.sky,
      green: {
        // 50: "#eefdf2",
        50: '#d0fcde',
        100: '#b0fccb',
        200: '#8cfab7',
        300: '#64f4a3',
        400: '#37e990',
        500: '#00d77d',
        600: '#00bb6a',
        700: '#009956',
        800: '#047342',
        900: '#134d2e'
        // 950: "#132a1c",
      },
      red: colors.red,
      rose: colors.rose,
      yellow: colors.amber,
      orange: colors.orange,
      gray: colors.gray,
      purple: colors.purple,
      sky: {
        github: '#0B2126',
        surface: '#E5F9FF',
        lightest: '#B7E1ED',
        lighter: '#95CDDE',
        light: '#71A2B0',
        DEFAULT: '#497A87',
        dark: '#255461',
        darker: '#003543',
        darkest: '#012A35',
        black: '#001E26'
      },
      github: {
        'hover-text': '#497A87',
        'hover-svg': '#D4D4D4',
        'hover-bg': '#F6F6F6',
        'dark-hover-bg': '#0B2126',
        'dark-hover-text': '#BCBCBC',
        'dark-hover-svg': '#FEFFFF'
      },
      twitter: {
        'hover-text': '#497A87',
        'hover-svg': '#B7E1ED',
        'hover-bg': '#E5F9FF',
        'dark-hover-bg': '#175B6C',
        'dark-hover-text': '#71A2B0'
      },
      discord: {
        'hover-text': '#497A87',
        'hover-svg': '#D1D1E2',
        'hover-bg': '#E8E6F0',
        'dark-hover-bg': '#58677D',
        'dark-hover-text': '#9BA4B1',
        'dark-hover-svg': '#A3B7D6'
      }
    }
  },
  shortcuts: {
    'display-4': 'text-3xl font-bold text-sky-darker dark:text-white',
    'body-xl-darker': 'font-semibold text-xl font-medium text-sky-darker dark:text-white',
    'body-xl-default': 'text-xl font-medium',
    card: 'p-6 relative sm:rounded-lg bg-cloud-surface text-sky svg:text-cloud-lightest dark:svg:text-sky-dark dark:text-sky-light dark:bg-sky-darker'
  }
}
