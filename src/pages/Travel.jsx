import { Link } from 'react-router-dom'
import Map from '../components/Map'

export const Travel = () => {
  return (
    <div className='App-header'>
      <h2>Travel Page</h2>
      <Link to='/'>Back</Link>
      <br />
      <Map />
    </div>
  )
}