import * as colors from './src/utils/colors'

export default {
  title: 'Brew Keller',
  base: '/docs',
  ignore: ['**/blog/**', 'readme.md'],
  menu: ['Wow', 'Components'],
  repository: false,
  themeConfig: {
    colors: {
      primary: colors.primary,
    },
  },
}
