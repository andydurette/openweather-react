import React from 'react';

export default class CurrentWeather extends React.Component {

    //Wind Speed
    mph = (speed) => {
      return parseFloat(speed * (1.46667)).toFixed(0);
    } 

  render() {
    return (
      <section id="currentDay">
        <div>
        <img src={`/images/weatherIcons/${this.props.icon}.svg`} alt={this.props.altText} />
        </div>
        <div className="blockHeading">
            <h1>{this.props.approvedCityName}'s Weekly Weather Forecast</h1>
            <p><span>Temperature:</span> {this.props.temp} <sup>°C</sup></p>
            <p><span>Humidity:</span> {this.props.humidity} <sup>%</sup></p>
            <p><span>Wind Speed:</span> {this.mph(this.props.windSpeed)} <span className="smallText">KM / h</span></p>
            <p><span>Weather Type:</span> {this.props.altText}</p>
        </div>
        
     
      </section>
    )
  }
}