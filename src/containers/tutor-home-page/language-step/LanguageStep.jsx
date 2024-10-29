import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import AppSelect from '~/components/app-select/AppSelect'
import { useStepContext } from '~/context/step-context'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { languagesMock } from '../subjects-step/constants'

const LanguageStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  const languageFields = languagesMock.map((language) => ({
    title: language.name,
    value: language.name
  }))

  const handleInputChange = (event) => {
    handleStepData(stepLabel, event.target.value, {})
  }
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles.contentBox}>
          <Box sx={styles.textBox}>{t('becomeTutor.languages.title')}</Box>

          <AppSelect
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }}
            fields={languageFields}
            label={t('becomeTutor.languages.autocompleteLabel')}
            onChange={handleInputChange}
            value={stepData[stepLabel]}
          />
        </Box>

        <Box sx={styles.buttonsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default LanguageStep
