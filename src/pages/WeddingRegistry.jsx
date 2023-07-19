import { Link } from 'react-router-dom'
import Container from '../components/Container'
import HeroSection from '../components/HeroContainer'

export const WeddingRegistry = () => {
  return (
    <Container md>
      <HeroSection
        backgroundImage="https://picsum.photos/3840/2400"
        heroText="Wedding Registry"
      />
      <section style={{ height: '350px' }}>
        <Link to='/'>Back</Link>
      </section>
    </Container>
  )
}