import { Link } from 'react-router-dom'
import Container from '../components/Container'

export const Gallery = () => {
  return (
    <Container md>
      <h2>Gallery Page</h2>
      <Link to='/'>Back</Link>
    </Container>
  )
}