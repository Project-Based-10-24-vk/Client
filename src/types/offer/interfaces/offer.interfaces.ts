import { ButtonProps } from '@mui/material/Button'
import {
  CategoryInterface,
  CommonEntityFields,
  Faq,
  LanguagesEnum,
  ProficiencyLevelEnum,
  StatusEnum,
  SubjectNameInterface,
  UserResponse,
  UserRoleEnum
} from '~/types'

export interface Offer extends CommonEntityFields {
  title: string
  price: number
  proficiencyLevel: ProficiencyLevelEnum[]
  description: string
  languages: LanguagesEnum[]
  enrolledUsers: string[]
  authorRole: UserRoleEnum.Tutor | UserRoleEnum.Student
  author: Pick<
    UserResponse,
    | '_id'
    | 'totalReviews'
    | 'photo'
    | 'professionalSummary'
    | 'firstName'
    | 'lastName'
    | 'FAQ'
    | 'averageRating'
  >
  subject: SubjectNameInterface
  category: CategoryInterface
  FAQ: Faq[]
  status: StatusEnum
}

export interface ButtonActions {
  label: string
  buttonProps?: ButtonProps<'button', { to?: string }>
}

export interface PriceRangeParams {
  authorRole: UserRoleEnum
  categoryId?: string
  subjectId?: string
}

export interface PriceRangeResponse {
  minPrice: number
  maxPrice: number
}

export interface GetOffersResponse {
  items: Offer[]
  count: number
}
