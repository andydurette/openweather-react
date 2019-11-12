import React from 'react';

export default class CurrentWeather extends React.Component {

    //Wind Speed
    mph = (speed) => {
      return parseFloat(speed * (3600/1609.344)).toFixed(2);
    } 

  render() {
    return (
      <section id="currentDay">
        <div>
        <img src={`/images/weatherIcons/${this.props.icon}.svg`} alt={this.props.altText} />
        </div>
        <div className="blockHeading">
            <h2><span>Today's weather</span></h2>
            <p><span>Temperature:</span> {this.props.temp} °C</p>
            <p><span>Humidity:</span> {this.props.humidity} %</p>
            <p><span>Wind Speed:</span> {this.mph(this.props.windSpeed)} MPH</p>
            <p><span>Weather Type:</span> {this.props.altText}</p>
        </div>
        
     
      </section>
    )
  }
}