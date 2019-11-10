import React from 'react';
import GetDate from './GetDate';

export default class CurrentWeather extends React.Component {

    //Wind Speed
    mph = (speed) => {
      return parseFloat(speed * (3600/1609.344)).toFixed(2);
    } 

  render() {
    return (
      <section id="currentDay">
        <div className="blockHeading">
          <h2>{` ${this.props.cityName} (${GetDate(0)}) `}</h2>
          <img src={`https://openweathermap.org/img/w/${this.props.icon}.png`} alt={this.props.altText} width='50' height='50' />
            <p><span>Temperature:</span>{this.props.temp} °C</p>
            <p><span>Humidity:</span> {this.props.humidity} %</p>
            <p><span>Wind Speed:</span> {this.mph(this.props.windSpeed)} MPH</p>
        </div>
     
      </section>
    )
  }
}