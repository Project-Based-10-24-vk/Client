import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import i18n from '~/plugins/i18n'
import { UserResponse } from '~/types'

export const home = {
  name: i18n.t('breadCrumbs.home'),
  path: guestRoutes.home.route
}

export const privacyPolicy = {
  name: i18n.t('breadCrumbs.privacyPolicy'),
  path: guestRoutes.privacyPolicy.route
}

export const myProfile = {
  name: i18n.t('breadCrumbs.myProfile'),
  path: authRoutes.accountMenu.myProfile.route
}

export const categories = {
  name: i18n.t('breadCrumbs.categories'),
  path: authRoutes.categories.route
}

export const subjects = {
  name: i18n.t('breadCrumbs.subjects'),
  path: authRoutes.subjects.route
}

export const findOffers = {
  name: i18n.t('breadCrumbs.findOffers'),
  path: authRoutes.findOffers.route
}

export const myResources = {
  name: i18n.t('breadCrumbs.myResources'),
  path: authRoutes.myResources.root.route
}

export const userProfile = ({ data }: { data: UserResponse }) => ({
  name: `${data.firstName} ${data.lastName}`
})

export const newQuestion = {
  name: i18n.t('breadCrumbs.newQuestion'),
  path: authRoutes.myResources.newQuestion.route
}

export const editQuestion = {
  name: i18n.t('breadCrumbs.editQuestion'),
  path: authRoutes.myResources.editQuestion.route
}

// LESSON
export const lessonDetails = {
  name: i18n.t('breadCrumbs.lessonDetails'),
  path: authRoutes.lessonDetails.route
}

export const lessonCreate = {
  name: i18n.t('breadCrumbs.lessonNew'),
  path: authRoutes.myResources.lessonCreate.route
}

export const lessonEdit = {
  name: i18n.t('breadCrumbs.lessonEdit'),
  path: authRoutes.myResources.lessonEdit.route
}
