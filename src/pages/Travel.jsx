
import HeroSection from '../components/HeroContainer'
import Map from '../components/Map'

export const Travel = () => {
  return (
    <div className='App-header'>
      <section>
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1589211963780-1f74f3864f74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          heroText="Travel"
          subText="Portland, Oregon"
        />
      </section>

      <section style={{ height: '350px' }}>
        <h1>Airlines</h1>
      </section>

      <section>
        <HeroSection
          backgroundImage="https://news.airbnb.com/wp-content/uploads/sites/4/2019/11/Tiny-Kitchens-Hale-Douglas-Experience-the-Charm-of-Tiny-House-Living.jpg?fit=2662,1776"
          heroText="Where to Stay"
          subText="Hotels and Guesthouses"
        />
      </section>


      <section style={{ height: '350px' }}>
        <h1>We have rooms blocked off for wedding guests at the following West Portland Hotels:</h1>
        <p> add other links here...</p>
      </section>

      <section>
        <HeroSection
          backgroundImage="https://e1.pxfuel.com/desktop-wallpaper/647/661/desktop-wallpaper-portland-summer-waterfront-park-usa-oregon-american-cities-america-city-of-portland-cities-of-oregon-with-resolution-3840x2400-high-quality-portland.jpg"
          heroText="What to Do"
          subText="A list of our favorite spots in Portland"
        />
      </section>

      <section style={{ height: '350px' }}>
        <h1>Eat & Drink</h1>
        <h1>Play</h1>
        <h1>Shop</h1>
        <br />
        <p> add other links here...</p>
      </section>

      <Map />

      <section style={{ height: '350px' }}>
        <p>
          With over 90 distinct districts within Portland, the city can be seen as divided into 4 main quadrants for you to explore - North, South, East and West.

          Burnside Street divides Portland’s north and south quadrants, while the Willamette River divides it’s east and west quadrants, and there is great food, adventures, and shopping to be had across all.
        </p>
      </section>
    </div>
  )
}