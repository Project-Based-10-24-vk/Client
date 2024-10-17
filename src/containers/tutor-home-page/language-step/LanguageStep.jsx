import { useState } from 'react'

import Box from '@mui/material/Box'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import AppSelect from '~/components/app-select/AppSelect'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { languagesMock } from '../subjects-step/constants'

const LanguageStep = ({ btnsBox }) => {
  const [language, setLanguage] = useState('')

  // Подготовка полей для AppSelect
  const languageFields = languagesMock.map((language) => ({
    title: language.name,
    value: language.name
  }))

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles.contentBox}>
          <Box sx={styles.textBox}>
            Please select the language in which you would like to study and
            cooperate.
          </Box>

          <AppSelect
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }}
            fields={languageFields}
            label='Your native language'
            setValue={setLanguage}
            value={language}
          />
        </Box>

        <Box sx={styles.buttonsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default LanguageStep
