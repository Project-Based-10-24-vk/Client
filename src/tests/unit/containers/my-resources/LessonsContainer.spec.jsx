import userEvent from '@testing-library/user-event'
import { act, screen, waitFor } from '@testing-library/react'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils';
import { expect, vi } from 'vitest';
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer';
import { URLs } from '~/constants/request';


const lessonsMock = {
  _id: 's0Me1D',
  title: 'Lesson 1',
  description: 'Lesson 1 description',
  content: 'Lesson 1 content',
  author: 's0MeAuth0r1D',
  category: null,
  createdAt: '2023-10-02T17:39:52.373Z',
  updatedAt: '2023-10-03T17:39:52.373Z'
}

const responseLessonsItemsMock = Array(5)
  .fill('')
  .map((_, index) => ({
    ...lessonsMock,
    _id: lessonsMock._id + index,
    name: index + lessonsMock.title
  }))

const responseLessonsMock = {
  count: 5,
  items: responseLessonsItemsMock
}

describe('LessonsContainer test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, responseLessonsMock)
      renderWithProviders(<LessonsContainer />)
    })
  })
  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render "New lesson" button', () => {
    const newLessonBtn = screen.getByText('myResourcesPage.lessons.addBtn')

    expect(newLessonBtn).toBeInTheDocument()
  })
})