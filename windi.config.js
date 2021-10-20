const colors = require('windicss/colors')

module.exports = {
  purge: ['./src/**/*.html'],
  darkMode: 'media',
  theme: {
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
        surface: '#E5F9FF',
        lightest: '#B7E1ED',
        lighter: '#95CDDE',
        light: '#71A2B0',
        DEFAULT: '#497A87',
        dark: '#255461',
        darker: '#003543',
        darkest: '#012A35',
        black: '#001E26'
      }
    }
  },
  shortcuts: {
    'display-4': 'text-sky-darker text-3xl leading-8 font-bold dark:text-white',
    'body-base': 'text-sky-dark dark:text-cloud-light',
    'body-xl-darker': 'font-semibold text-xl text-sky-darker font-medium',
    'body-xl-default': 'font-semibold text-xl text-sky dark:text-cloud-light font-medium',
    card: 'bg-cloud-surface shadow p-6 relative text-cloud-lightest sm:rounded-lg dark:bg-sky-darker'
  }
}
