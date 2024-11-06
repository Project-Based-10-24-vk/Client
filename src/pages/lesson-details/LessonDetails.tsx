import { useEffect } from 'react'
import type { AxiosResponse } from 'axios'
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
import { useSnackBarContext } from '~/context/snackbar-context'
import { getErrorMessage } from '~/utils/error-with-message'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import { snackbarVariants } from '~/constants'
import {
  Attachment,
  ButtonVariantEnum,
  ErrorResponse,
  LessonData
} from '~/types'
import { defaultResponse } from './LessonDetails.constants'
import { styles } from './LessonDetails.styles'

const attachments: Attachment[] = [
  {
    name: 'Additional materials-Advanced Quantum Mechanics.pdf',
    size: 123,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'Additional materials-Advanced Quantum Mechanics.pdf',
    size: 123456,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'Additional materials-Advanced Quantum Mechanics.pdf',
    size: 123456789,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]

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
  } = useAxios<LessonData, string>({
    service: getLesson,
    fetchOnMount: false,
    defaultResponse,
    onResponseError: handleResponseError
  })

  const handleEdit = () => {
    navigate(`/edit-lesson/${id}`)
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

  const attachmentsList = attachments.map((attachment, index) => (
    <Box key={index} sx={styles.attachmentList.container}>
      <IconExtensionWithTitle size={attachment.size} title={attachment.name} />
    </Box>
  ))
  const accordionItems = [
    { title: 'Content', content: <>{response.content}</> },
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
