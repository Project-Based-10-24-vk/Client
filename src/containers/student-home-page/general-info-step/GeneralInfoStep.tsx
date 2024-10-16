import { ReactNode, useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material'
import { styles } from './GeneralInfoStep.styles'

interface GeneralInfoStepProps {
  btnsBox: ReactNode
}

interface FormData {
  firstName: string
  lastName: string
  country: string
  city: string
  professionalStatus: string
  isOver18: boolean
}

const validateForm = (data: FormData) => {
  const errors: Record<string, string> = {}

  if (!data.firstName || data.firstName.trim().length === 0) {
    errors.firstName = 'First Name is required'
  } else if (data.firstName.length < 2) {
    errors.firstName = 'First Name should be at least 2 characters long'
  }

  if (!data.lastName || data.lastName.trim().length === 0) {
    errors.lastName = 'Last Name is required'
  } else if (data.lastName.length < 2) {
    errors.lastName = 'Last Name should be at least 2 characters long'
  }

  if (!data.country) {
    errors.country = 'Please select a country'
  }

  if (!data.city) {
    errors.city = 'Please select a city'
  }

  if (data.professionalStatus.length > 200) {
    errors.professionalStatus =
      'Professional status should not exceed 200 characters'
  }

  if (!data.isOver18) {
    errors.isOver18 = 'You must confirm that you are over 18 years old'
  }

  return errors
}

const GeneralInfoStep = ({ btnsBox }: GeneralInfoStepProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    professionalStatus: '',
    isOver18: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = () => {
    const errors = validateForm(formData)
    if (Object.keys(errors).length === 0) {
      console.log('Form is valid')
    } else {
      console.log('Form has errors', errors)
    }
  }
  return (
    <Box sx={styles.container}>
      <TextField
        label='First Name'
        name='firstName'
        onChange={handleChange}
        value={formData.firstName}
      />
      <TextField
        label='Last Name'
        name='lastName'
        onChange={handleChange}
        value={formData.lastName}
      />
      <TextField
        label='Country'
        name='country'
        onChange={handleChange}
        value={formData.country}
      />
      <TextField
        label='City'
        name='city'
        onChange={handleChange}
        value={formData.city}
      />
      <TextField
        label='Professional Status'
        maxRows={4}
        multiline
        name='professionalStatus'
        onChange={handleChange}
        value={formData.professionalStatus}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.isOver18}
            name='isOver18'
            onChange={handleChange}
          />
        }
        label='I confirm that I am over 18 years old'
      />
      <Button onClick={handleSubmit} variant='contained'>
        Submit
      </Button>
      {btnsBox}
    </Box>
  )
}

export default GeneralInfoStep
