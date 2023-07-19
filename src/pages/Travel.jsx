import Container from '../components/Container'
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

      <Container md>
        <section style={{ height: '350px' }}>
          <h1>Airlines</h1>
          <p>The following Airlines out of Sacramento International Airport (SMF) and San Franscisco International Airport (SFO) have direct flights to Portland (PDX) throughout the year.</p>

          <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>

            <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <img src='https://www.nicepng.com/png/detail/213-2134205_united-airlines-logo-emblem-png-united-airlines-logo.png' width='320px' height='200px' alt="" />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                Book of of SFO
              </span>
            </div>

            <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <img src='https://1000logos.net/wp-content/uploads/2019/08/southwest-airlines-logo.png' width='320px' height='200px' alt="" />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                Book of of SMF
              </span>
            </div>

            <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-IGXrLfVQqcOQEAbv7xNCr7EyZub6Ivmctw&usqp=CAU' width='320px' height='200px' alt="" />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                Book of of SMF or SFO
              </span>
            </div>
          </div>
        </section>
      </Container>

      <HeroSection
        backgroundImage="https://news.airbnb.com/wp-content/uploads/sites/4/2019/11/Tiny-Kitchens-Hale-Douglas-Experience-the-Charm-of-Tiny-House-Living.jpg?fit=2662,1776"
        heroText="Where to Stay"
        subText="Hotels and Guesthouses"
      />

      <Container md>
        <section style={{ height: '350px' }}>
          <br />
          <h1>We have rooms blocked off for wedding guests at the following West Portland Hotels:</h1>
          <br /><br />

          <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <h2><strong>THE HOTEL VANCE</strong></h2><br />
              <p style={{ textAlign: 'center' }}>
                1455 Broadway St<br />
                Portland, OR<br />
                (503) 334-2167
              </p><br />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                BOOK NOW
              </span>
            </div>

            <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <h2><strong>WOODLARK HOTEL</strong></h2><br />
              <p style={{ textAlign: 'center' }}>
                813 SW Alder St<br />
                Portland, OR<br />
                (503) 548-2559
              </p><br />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                BOOK NOW
              </span>
            </div>

            <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <h2><strong>RESIDENCE INN, PEARL DISTRICT</strong></h2>
              <br />
              <p style={{ textAlign: 'center' }}>
                1150 NW 9th Ave<br />
                Portland, OR<br />
                (503) 220-1339
              </p><br />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                BOOK NOW
              </span>
            </div>
          </div>
        </section>

        <section style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <span style={{ textDecoration: 'underline', color: 'blue' }}>
            VIEW ON MAP
          </span>
          <br />
          <img src='https://picsum.photos/450/450' width='450px' height='450px' alt="" />
          <br />
          <small>Estimated travel time from the above Hotel Blocks to the Wedding Venue is between 8 - 12 minutes on Sundays between 3:00 and 4:00 pm.</small>
          <br />
        </section>
      </Container>

      <HeroSection
        backgroundImage="https://e1.pxfuel.com/desktop-wallpaper/647/661/desktop-wallpaper-portland-summer-waterfront-park-usa-oregon-american-cities-america-city-of-portland-cities-of-oregon-with-resolution-3840x2400-high-quality-portland.jpg"
        heroText="What to Do"
        subText="A list of our favorite spots in Portland"
      />

      <br />
      <Container md>
        <section style={{ height: '600px' }}>
          <p>
            With over 90 distinct districts within Portland, the city can be seen as divided into 4 main quadrants for you to explore - North, South, East and West.
            <br />
            Burnside Street divides Portland’s north and south quadrants, while the Willamette River divides it’s east and west quadrants, and there is great food, adventures, and shopping to be had across all.
          </p>
          <br />

          <div style={{ display: 'flex', flexGrow: 1, alignItems: 'baseline' }}>
            <div style={{ display: 'flex', flexGrow: .3, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <h2><strong>EAT AND DRINK</strong></h2>
              <br />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                DINE OR DASH
              </span>
              <br />
              <small style={{ textAlign: 'center', padding: '.2rem' }}>
                At food carts, subterranean bars, and white-tablecloth restaurants, chefs gather some of the region’s finest ingredients to transform into immaculate sushi, handmade pastas, and imaginative pintxos. For a city its size, Portland’s restaurant scene is impressively multifaceted — traditional and offbeat, covering hundreds of cuisines from various countries and regions around the world.
              </small>
            </div>

            <div style={{ display: 'flex', flexGrow: .3, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <h2><strong>PLAY</strong></h2>
              <br />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                FIND YOUR ADVENTURE
              </span>
              <br />
              <small style={{ textAlign: 'center', padding: '.2rem' }}>
                You’ve heard the saying, “Keep Portland weird,” but its also full of wonder. Across every one of its bridges is a unique experience waiting. Whether you’re looking for outdoor recreation, live music, sporting events, or amusement parks, the city has endless options for all.
              </small>
            </div>

            <div style={{ display: 'flex', flexGrow: .3, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <h2><strong>SHOP</strong></h2>
              <br />
              <span style={{ textDecoration: 'underline', color: 'blue' }}>
                GET THRIFTY
              </span>
              <br />
              <small style={{ textAlign: 'center', padding: '.2rem' }}>
                Portland boasts nearly 50 vintage shops, offering up meticulously curated — and constantly updated — collections of costume jewelry, traditionally tailored suits and, of course, racks upon racks of dresses that span decades. The city’s vintage bounty has fashion-savvy visitors stuffing their suitcases to the limit with secondhand goodies.
              </small>
            </div>
          </div>
        </section>
      </Container>
      <Map />
    </div>
  )
}