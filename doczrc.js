import * as colors from './src/utils/colors'

export default {
  title: 'Brew Keller',
  base: '/docs/',
  src: './docs/',
  ignore: [`**/blog/**`, 'readme.md'],
  menu: ['Wow', 'Components'],
  repository: false,
  themeConfig: {
    colors: {
      primary: colors.secondary,
    },
  },
}
