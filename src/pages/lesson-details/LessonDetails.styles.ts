import { TypographyVariantEnum } from '~/types'
import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    p: { sm: '40px 36px', md: '40px 72px' }
  },
  editButton: {
    width: '97px',
    height: '44px',
    display: 'flex',
    justifyContent: 'flex-center',
    gap: '8px',
    typography: TypographyVariantEnum.Button1,
    marginLeft: 'auto'
  },
  editIcon: {
    height: '16px',
    width: '16px'
  },
  title: {
    shrink: false,
    typography: TypographyVariantEnum.H4,
    top: -23
  },
  description: {
    shrink: false,
    typography: TypographyVariantEnum.Body1,
    top: -21
  },
  attachmentList: {
    container: {
      background: palette.basic.grey,
      borderRadius: '5px',
      p: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  accordionSx: {
    withIcon: {
      root: {},
      accordion: {
        '&::before': { display: 'none' }
      },
      titleActive: {
        typography: TypographyVariantEnum.Subtitle2,
        color: '#455A64'
      },
      titleInactive: {
        typography: TypographyVariantEnum.Subtitle2,
        color: '#455A64'
      },
      summary: {
        background: palette.backgroundColor,
        borderBottom: `1px solid ${palette.basic.gray}`
      },
      details: {
        background: palette.backgroundColor,
        border: 'none',
        typography: TypographyVariantEnum.Body2,
        color: '#263238'
      }
    }
  }
}
