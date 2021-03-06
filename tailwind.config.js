const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Proxima Nova',
          ...defaultTheme.fontFamily.sans
        ]
      },
      maxHeight: {
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        500: '500px'
      },
      borderRadius: {
        xl: '1.125rem'
      },
      borderWidth: {
        3: '3px'
      },
      inset: {
        '30%': '30%'
      },
      colors: {
        black: {
          100: '#151515',
          500: '#000000'
        },
        blue: {
          100: '#EBF5FB',
          200: '#CEE5F4',
          300: '#B1D5ED',
          400: '#76B6E0',
          500: '#3B97D2',
          600: '#3588BD',
          700: '#235B7E',
          800: '#1B445F',
          900: '#122D3F'
        },
        gray: {
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121'
        },
        green: {
          100: '#F3F9EE',
          200: '#E2F1D3',
          300: '#D1E8B9',
          400: '#AED785',
          500: '#8BC650',
          600: '#7DB248',
          700: '#537730',
          800: '#3F5924',
          900: '#2A3B18'
        },
        indigo: {
          100: '#F5EEF8',
          200: '#E6D6ED',
          300: '#D7BDE2',
          400: '#B98BCC',
          500: '#9B59B6',
          600: '#8C50A4',
          700: '#5D356D',
          800: '#462852',
          900: '#2F1B37'
        },
        orange: {
          100: '#FCF2E9',
          200: '#F9DFC9',
          300: '#F5CBA8',
          400: '#EDA566',
          500: '#E57E25',
          600: '#CE7121',
          700: '#894C16',
          800: '#673911',
          900: '#45260B'
        },
        red: {
          100: '#FCEDEA',
          200: '#F9D1CA',
          300: '#F5B5A9',
          400: '#ED7E69',
          500: '#E54729',
          600: '#CE4025',
          700: '#892B19',
          800: '#672012',
          900: '#45150C'
        },
        turquoise: {
          100: '#E9F8F5',
          200: '#C9EDE6',
          300: '#A9E3D6',
          400: '#68CDB8',
          500: '#27B899',
          600: '#23A68A',
          700: '#176E5C',
          800: '#125345',
          900: '#0C372E'
        },
        yellow: {
          100: '#FDF9E8',
          200: '#FBF0C6',
          300: '#F9E7A3',
          400: '#F4D55E',
          500: '#EFC319',
          600: '#D7B017',
          700: '#8F750F',
          800: '#6C580B',
          900: '#483B08'
        }
      },
      width: {
        'fit-content': 'fit-content'
      }
    }
  },
  // future: {
  //   purgeLayersByDefault: true
  // },
  // Need to refactor areas where we concatenate strings to generate classes. ie: text-${color}-500
  // purge: {
  //   // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
  //   enabled: process.env.NODE_ENV === 'production',
  //   content: [
  //     './src/components/**/*.vue',
  //     './src/layouts/**/*.vue',
  //     './src/plugins/**/*.js',
  //     './src/views/**/*.vue'
  //   ]
  // },
  variants: {},
  plugins: []
}
