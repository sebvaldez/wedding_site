import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import Section from './layout/Section';

// const dummyForecastData = {
//   city: 'Portland, Oregon',
//   date: 'July 24, 2023',
//   conditions: 'Partly Cloudy',
//   currentTemperature: '78°F',
//   humidity: '52%',
//   wind: '5 mph NW',
//   forecast: [
//     {
//       day: 'Today',
//       high: '82°F',
//       low: '62°F',
//       conditions: 'Partly Cloudy'
//     },
//     {
//       day: 'Tomorrow',
//       high: '79°F',
//       low: '60°F',
//       conditions: 'Light Rain'
//     },
//     {
//       day: 'Wednesday',
//       high: '75°F',
//       low: '58°F',
//       conditions: 'Cloudy'
//     },
//     {
//       day: 'Thursday',
//       high: '76°F',
//       low: '61°F',
//       conditions: 'Sunny'
//     },
//     {
//       day: 'Friday',
//       high: '80°F',
//       low: '63°F',
//       conditions: 'Mostly Sunny'
//     }
//   ]
// };

const WeatherSection = () => {

  // todo - fetch weather from api

  return (
    <div>
      <Section
        title="Weather"
        icon={
          <FontAwesomeIcon
            icon={faCloudSun}
            size='sm'
          />
        }
      >
        Expect temperatures between 75-85 degrees F
        {/* <p><strong>City:</strong> {dummyForecastData.city}</p>
        <p><strong>Date:</strong> {dummyForecastData.date}</p>
        <p><strong>Current Temperature:</strong> {dummyForecastData.currentTemperature}</p>
        <p><strong>Conditions:</strong> {dummyForecastData.conditions}</p>
        <p><strong>Humidity:</strong> {dummyForecastData.humidity}</p>
        <p><strong>Wind:</strong> {dummyForecastData.wind}</p>
        <br />
        <h4>5-Day Forecast:</h4>
        <ul>
          {dummyForecastData.forecast.map((dayForecast, index) => (
            <li key={index}>
              {dayForecast.day}: {dayForecast.high} / {dayForecast.low} - {dayForecast.conditions}
            </li>
          ))}
        </ul> */}
      </Section>
    </div>
  );
};



export default WeatherSection;
