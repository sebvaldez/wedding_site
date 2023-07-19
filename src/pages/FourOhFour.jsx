import { Link } from 'react-router-dom'
import Container from '../components/Container'

export const FourOhFour = () => {
  return (
    <Container md>
      <h1>404</h1>
      <h2>Page not found.</h2>
      <Link to='/'>Back</Link>
    </Container>
  )
}