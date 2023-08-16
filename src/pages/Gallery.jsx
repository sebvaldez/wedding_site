import { Link } from 'react-router-dom'
import HeroSection from '../components/layout/HeroContainer'
import Container from '../components/common/Container'

export const Gallery = () => {
  return (
    <Container md>
      <HeroSection
        backgroundImage="https://picsum.photos/3840/2400"
        heroText="Gallery"
        buttonText='Upload Wedding Day Photos'
        buttonLink='/#'
      />
      <section style={{ height: '350px' }}>
        <Link to='/'>Back</Link>
      </section>
    </Container>
  )
}