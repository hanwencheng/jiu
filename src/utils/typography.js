import Typography from 'typography'
import FairyGates from 'typography-theme-ocean-beach'
import * as colors from './colors'

FairyGates.headerFontFamily = ['Source Sans Pro']
FairyGates.bodyFontFamily = ['Source Sans Pro']

FairyGates.overrideThemeStyles = () => {
  return {
    a: {
      color: colors.secondary,
      background: 'none',
      textShadow: 'none',
    },
    blockquote: {
      borderLeftColor: colors.secondary,
    },
    input: {
      boxSizing: 'border-box',
      width: '100%',
    },
  }
}

const typography = new Typography(FairyGates)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
