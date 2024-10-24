import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { guestRoutes } from '~/router/constants/guestRoutes'
import PrivateRoute from '~/router/helpers/PrivateRoute'
import { UserRoleEnum } from '~/types'

const StudentHome = lazy(() => import('~/pages/student-home/StudentHome'))

export const studentRouter = (
  <Route element={<PrivateRoute role={[UserRoleEnum.Student]} />}>
    <Route element={<StudentHome />} path={guestRoutes.student.route} />
  </Route>
)
