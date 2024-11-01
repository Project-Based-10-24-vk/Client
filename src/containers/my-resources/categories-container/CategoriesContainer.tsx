import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import AddCategoriesModal from '~/containers/my-resources/add-categories-modal/AddCategoriesModal'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/categories-container/CategoriesContainer.constansts'
import { styles } from '~/containers/my-resources/categories-container/CategoriesContainer.style'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import AppButton from '~/components/app-button/AppButton'
import Loader from '~/components/loader/Loader'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import {
  ResourceService,
  useUpdateResourceCategoryMutation
} from '~/services/resource-service'
import { defaultResponses, snackbarVariants } from '~/constants'
import {
  Categories,
  CreateCategoriesParams,
  ErrorResponse,
  GetResourcesCategoriesParams,
  ItemsWithCount,
  ResourcesTabsEnum
} from '~/types'

const CategoriesContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const { openModal, closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const [updateResourceCategory] = useUpdateResourceCategoryMutation()

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const onResponse = useCallback(
    (response: Categories | null) => {
      const categoryName = response ? response.name : ''

      setAlert({
        severity: snackbarVariants.success,
        message: t('myResourcesPage.categories.successCreation', {
          category: categoryName
        })
      })
    },
    [setAlert, t]
  )

  const getCategories = useCallback(
    () =>
      ResourceService.getResourcesCategories({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        name: searchTitle.current
      }),
    [page, itemsPerPage, sort, searchTitle]
  )

  const createCategory = useCallback(
    (params?: CreateCategoriesParams) =>
      ResourceService.createResourceCategory(params),
    []
  )

  const deleteCategory = useCallback(
    (id?: string) => ResourceService.deleteResourceCategory(id ?? ''),
    []
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Categories>,
    GetResourcesCategoriesParams
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })
  const onCategoryUpdate = useCallback(() => void fetchData(), [fetchData])
  const onCategoryCreate = useCallback(
    (response: Categories | null) => {
      onResponse(response)
      void fetchData()
    },
    [fetchData, onResponse]
  )

  const { fetchData: handleCreateCategory } = useAxios({
    service: createCategory,
    defaultResponse: null,
    fetchOnMount: false,
    onResponseError,
    onResponse: onCategoryCreate
  })

  const onAdd = () => {
    openModal({
      component: (
        <AddCategoriesModal
          closeModal={closeModal}
          createCategories={handleCreateCategory}
        />
      )
    })
  }
  const onSave = async (name: string) => {
    if (name) await updateResourceCategory({ id: selectedItemId, name })
    onCategoryUpdate()
    setSelectedItemId('')
  }
  const onEdit = (id: string) => setSelectedItemId(id)
  const onCancel = () => setSelectedItemId('')

  const columnsToShow = ajustColumns<Categories>(
    breakpoints,
    columns(selectedItemId, onSave, onCancel),
    removeColumnRules
  )

  const props = {
    actions: { onEdit },
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: { deleteService: deleteCategory },
    pagination: { page, onChange: handleChangePage },
    sort: sortOptions,
    itemsPerPage,
    resource: ResourcesTabsEnum.Categories,
    sx: styles.table
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={t('myResourcesPage.categories.addBtn')}
        button={
          <AppButton onClick={onAdd}>
            {t('myResourcesPage.categories.addBtn')}
            <AddIcon sx={styles.addIcon} />
          </AppButton>
        }
        fetchData={fetchData}
        searchRef={searchTitle}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Categories> {...props} />
      )}
    </Box>
  )
}

export default CategoriesContainer
