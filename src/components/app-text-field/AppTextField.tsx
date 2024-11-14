import { FC } from 'react'

import TextField, { TextFieldProps } from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styles } from '~/components/app-text-field/AppTextField.styles'
import { TypographyVariantEnum } from '~/types'

interface AppTextFieldProps
  extends Omit<TextFieldProps, 'error' | 'helperText'> {
  errorMsg?: string
  withHelperText?: boolean
}

const AppTextField: FC<AppTextFieldProps> = ({
  errorMsg,
  multiline,
  title,
  withHelperText = true,
  ...props
}) => {
  const helperText = errorMsg ? (
    <Tooltip title={errorMsg}>
      <Typography variant={TypographyVariantEnum.Caption}>
        {errorMsg}
      </Typography>
    </Tooltip>
  ) : (
    ' '
  )

  const titleEl = title && <Typography sx={styles.title}>{title}</Typography>

  return (
    <>
      {titleEl}
      <TextField
        FormHelperTextProps={{ sx: styles.helperText(multiline) }}
        error={Boolean(errorMsg)}
        helperText={withHelperText && helperText}
        multiline={multiline}
        {...props}
      />
    </>
  )
}

export default AppTextField
