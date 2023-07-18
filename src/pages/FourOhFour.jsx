import { Link } from 'react-router-dom'

export const FourOhFour = () => {
  return (
    <div className="App-header">
      <h1>404</h1>
      <h2>Page not found.</h2>
      <Link to='/'>Back</Link>
    </div>
  )
}