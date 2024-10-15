import { createTheme } from '@mui/material/styles'
import button from './app.button'
import { checkbox } from './app.checkbox'
import { menuItem } from './app.menu-item'
import { menuList } from './app.menu-list'
import palette from './app.pallete'
import { select } from './app.select'
import { svgIcon } from './app.svgicon'
import table from './app.table.js'
import { textField } from './app.textfield.js'
import tooltip from './app.tooltip'
import appTypography from './app.typography'

export const theme = createTheme({
  palette,
  typography: appTypography,
  components: {
    MuiSvgIcon: svgIcon,
    MuiButton: button,
    MuiCheckbox: checkbox,
    MuiTextField: textField,
    MuiSelect: select,
    MuiTooltip: tooltip,
    MuiMenuItem: menuItem,
    MuiMenu: menuList,
    MuiTableRow: table
  }
})
