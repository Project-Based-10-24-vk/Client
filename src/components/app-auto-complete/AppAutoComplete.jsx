import { Fragment } from 'react'

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Loader from '~/components/loader/Loader'

const defaultFilterOptions = (options, state) => {
  const filterOptions = createFilterOptions()
  return filterOptions(options, state)
}

const AppAutoComplete = ({
  filterOptions = defaultFilterOptions,
  ListboxProps = { style: { maxHeight: 150 } },
  options = [],
  hideClearIcon = false,
  textFieldProps = {},
  title,
  ...props
}) => {
  const titleStyle = {
    typography: 'body2',
    color: 'primary.500',
    mr: '8px',
    mb: '16px'
  }
  const titleEl = title && <Typography sx={titleStyle}>{title}</Typography>

  return (
    <>
      {titleEl}
      <Autocomplete
        ListboxProps={ListboxProps}
        filterOptions={filterOptions}
        isOptionEqualToValue={(option, value) => option === value}
        options={options || []}
        {...props}
        renderInput={(params) => (
          <TextField
            {...params}
            {...textFieldProps}
            InputProps={{
              ...params.InputProps,
              ...textFieldProps.InputProps,
              endAdornment: (
                <Fragment>
                  {props.loading ? (
                    <Loader size={20} sx={{ color: 'primary.600' }} />
                  ) : null}
                  {!hideClearIcon && params.InputProps.endAdornment}
                </Fragment>
              )
            }}
          />
        )}
      />
    </>
  )
}

export default AppAutoComplete
