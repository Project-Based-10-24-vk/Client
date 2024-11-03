import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { guestRoutes } from '~/router/constants/guestRoutes'
import PrivateRoute from '~/router/helpers/PrivateRoute'
import { UserRoleEnum } from '~/types'

const TutorHome = lazy(() => import('~/pages/tutor-home/TutorHome'))
const AddLessong = lazy(()=> import('~/pages/create-or-edit-lesson/CreateOrEditLesson'))

export const tutorRouter = (
  <Route element={<PrivateRoute role={[UserRoleEnum.Tutor]} />}>
    <Route element={<TutorHome />} path={guestRoutes.tutor.route} />
    <Route element={<AddLessong />} path='add-lesson'/>
  </Route>
)
