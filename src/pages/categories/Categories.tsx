import { FC, useState } from 'react'

import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

const Categories: FC = () => {
  const allCards = [
    {
      img: '/path/to/image1.jpg',
      title: 'Languages',
      description: 'Explore different languages.',
      categoryId: 'languages123'
    },
    {
      img: '/path/to/image2.jpg',
      title: 'Mathematics',
      description: 'Learn about Mathematics.',
      categoryId: 'math123'
    },
    {
      img: '/path/to/image3.jpg',
      title: 'Computer Science',
      description: 'Discover the world of computing.',
      categoryId: 'cs123'
    }
  ]

  const [visibleCards, setVisibleCards] = useState(2)
  const [loading, setLoading] = useState(false)

  const cardElements = allCards.slice(0, visibleCards).map((card, index) => (
    <CardWithLink
      description={card.description}
      img={card.img}
      key={index}
      link={`/subjects/${card.categoryId}`} //????
      title={card.title}
    />
  ))

  const handleLoadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setVisibleCards((prev) => prev + 2)
      setLoading(false)
    }, 1000)
  }

  const hasMoreCards = visibleCards < allCards.length

  return (
    <PageWrapper>
      <CardsList
        btnText='View More'
        cards={cardElements}
        isExpandable={hasMoreCards}
        loading={loading}
        onClick={handleLoadMore}
      />
    </PageWrapper>
  )
}

export default Categories
