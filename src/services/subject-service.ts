import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectInterface, SubjectParamsInterface } from '~/types'


export const subjectService = {
  getSubjects: ( 
    params?: Partial<SubjectParamsInterface>, 
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => { 
  return axiosClient.get(URLs.subjects.get, { params } );
  }
}



