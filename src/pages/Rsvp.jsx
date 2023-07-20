import { Link, useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroContainer';
import Container from '../components/Container';

export const Rsvp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailParam = searchParams.get('email') || '';

  return (
    <Container md>
      <HeroSection
        backgroundImage="https://picsum.photos/3840/2400"
        heroText="RSVP"
      />
      <form action="submit_rsvp_endpoint" method="POST">
        <div>
          <label for="first-name">First Name:</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div>
          <label for="last-name">Last Name:</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required defaultValue={emailParam} />
        </div>

        <div>
          <label for="attendance">Will you be attending?</label>
          <select id="attendance" name="attendance" required>
            <option value="" disabled selected>Select your option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <br />

        <div>
          <label for="food-restrictions">Food Restrictions:</label><br />
          <input type="text" id="food-restrictions" name="food-restrictions" placeholder="e.g. Vegetarian, Gluten-free" />
        </div>

        <br />

        <div>
          <label for="comments">Questions or Comments:</label><br />
          <textarea id="comments" name="comments" rows="4"></textarea>
        </div>

        <br />

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to='/'>Back</Link>
    </Container>
  )
}