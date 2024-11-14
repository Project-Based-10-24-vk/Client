import { useEffect } from 'react'
import type { AxiosResponse } from 'axios'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { Edit } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Typography } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import Loader from '~/components/loader/Loader'
import MultiAccordionWithTitle from '~/components/multi-accordion-with-title/MultiAccordionWIthTitle'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { authRoutes } from '~/router/constants/authRoutes'
import { useSnackBarContext } from '~/context/snackbar-context'
import { getErrorMessage } from '~/utils/error-with-message'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import { snackbarVariants } from '~/constants'
import { ButtonVariantEnum, ErrorResponse, type Lesson } from '~/types'
import { defaultResponse } from './LessonDetails.constants'
import { styles } from './LessonDetails.styles'

const LessonDetails = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const navigate = useNavigate()
  const { id } = useParams()

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error
        ? t(`errors.${error.code}`, {
            message: getErrorMessage(error.message)
          })
        : ''
    })
  }

  const getLesson = (id?: string): Promise<AxiosResponse> => {
    return ResourceService.getLesson(id)
  }

  const {
    loading: getLessonLoading,
    fetchData: fetchDataLesson,
    response
  } = useAxios<Lesson, string>({
    service: getLesson,
    fetchOnMount: false,
    defaultResponse,
    onResponseError: handleResponseError
  })

  const handleEdit = () => {
    navigate(`${authRoutes.myResources.lessonEdit.path}/${id}`)
  }

  useEffect(() => {
    if (id) {
      void fetchDataLesson(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (getLessonLoading) {
    return <Loader pageLoad />
  }

  const attachmentsList =
    response.attachments.length > 0 ? (
      response.attachments.map((attachment) => (
        <Box key={attachment._id} sx={styles.attachmentList.container}>
          <IconExtensionWithTitle
            size={attachment.size}
            title={attachment.name}
          />
        </Box>
      ))
    ) : (
      <Typography sx={{ typography: 'subtitle2', color: 'warning.600' }}>
        {t('common.noAttachments')}
      </Typography>
    )

  const accordionItems = [
    { title: 'Content', content: <>{parse(response.content)}</> },
    { title: 'Attachments', content: <>{attachmentsList}</> }
  ]

  return (
    <PageWrapper>
      <Box sx={styles.root}>
        <AppButton
          onClick={handleEdit}
          sx={styles.editButton}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('button.edit')} <Edit sx={styles.editIcon} />
        </AppButton>
        <Typography sx={styles.title} variant='h1'>
          {response.title}
        </Typography>
        <Typography sx={styles.description}>{response.description}</Typography>

        <MultiAccordionWithTitle
          icon={<ExpandMoreIcon />}
          items={accordionItems}
          sx={styles.accordionSx}
        />
      </Box>
    </PageWrapper>
  )
}
export default LessonDetails
