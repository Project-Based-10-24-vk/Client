import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { translationKey } from '~/containers/find-offer/constants'
import { styles } from '~/containers/find-offer/offer-request-block/OfferRequestBlock.styles'
import AppButton from '~/components/app-button/AppButton'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
// import useForm from '~/hooks/use-form'
import TitleBlock from '~/components/title-block/TitleBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { categoryService } from '~/services/category-service'
import icon from '~/assets/img/find-offer/subject_icon.png'
import img from '~/assets/img/find-offer/subject-request.svg'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const [reqSubject, setReqSubject] = useState('')
  const [reqCategory, setReqCategory] = useState(null)
  const [reqInfo, setReqInfo] = useState('')
  const { isMobile } = useBreakpoints()
  const { isOpen, openDrawer, closeDrawer } = useDrawer()
  const filter = createFilterOptions()

  const handleOpenDrawer = () => {
    openDrawer()
  }

  const mockSendReqest = () => {
    closeDrawer()
    alert(
      `Request for subject "${reqSubject}" in category "${reqCategory.name}" was sent`
    )
    setReqSubject('')
    setReqCategory(null)
    setReqInfo('')
  }

  const handleSubjectChange = (event) => {
    setReqSubject(event.target.value)
  }

  const handleCategoryChange = (event, category) => {
    if (category && category.inputValue) {
      setReqCategory({
        name: category.inputValue
      })
    } else setReqCategory(category)
  }

  const handleInfoChange = (event) => {
    setReqInfo(event.target.value)
  }

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <AppButton
        fullWidth={isMobile}
        onClick={handleOpenDrawer}
        sx={{ py: '14px' }}
      >
        {t(`${translationKey}.button`)}
      </AppButton>
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <Box sx={styles.container}>
          <Box sx={styles.imgContainer}>
            <Box component='img' src={img} sx={styles.img} />
          </Box>
          <Box sx={styles.rigthBox}>
            <Typography sx={styles.textblock} variant='h5'>
              {t('categoriesPage.newSubject.title')}
            </Typography>
            <Typography sx={styles.textblock} variant='body1'>
              {t('categoriesPage.newSubject.description')}
            </Typography>
            <AppTextField
              errorMsg={t('offerPage.errorMessages.category')}
              fullWidth
              label={t('categoriesPage.newSubject.labels.subject')}
              onChange={handleSubjectChange}
              title={t('categoriesPage.newSubject.subject')}
              value={reqSubject}
            />
            <AsyncAutocomplete
              axiosProps={{
                transform: (data) => data.items
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params)
                const { inputValue } = params
                const isExisting = options.some(
                  (option) => inputValue === option.name
                )
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    name: `Request for: "${inputValue}"`
                  })
                }
                return filtered
              }}
              freeSolo
              fullWidth
              labelField='name'
              onChange={handleCategoryChange}
              service={categoryService.getCategoriesNames}
              sx={{ mb: '16px' }}
              textFieldProps={{ label: t('offerPage.labels.category') }}
              title={t('categoriesPage.newSubject.category')}
              value={reqCategory}
              valueField='name'
            />
            <AppTextArea
              errorMsg={t('offerPage.errorMessages.description')}
              fullWidth
              label={t('offerDetailsPage.enrollOffer.labels.info')}
              maxLength={1000}
              onChange={handleInfoChange}
              title={t('categoriesPage.newSubject.info')}
              value={reqInfo}
            />
            <AppButton
              fullWidth={isMobile}
              onClick={mockSendReqest}
              sx={{ py: '14px', mt: '14px' }}
            >
              {t('button.sendRequest')}
            </AppButton>
          </Box>
        </Box>
      </AppDrawer>
    </TitleBlock>
  )
}

export default OfferRequestBlock
