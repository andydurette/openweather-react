import React from 'react';
import GetDate from './GetDate';

export default class ForcastDay extends React.Component {

  
  render() {
    return (
      <div>
        <p>{ GetDate(this.props.keyNumber) }</p>
        <img src={`https://openweathermap.org/img/w/${this.props.icon}.png`} alt={this.props.altText} width="50" height="50" />
        <p><span>Temp:</span> {this.props.temp}&nbsp;°C</p>
        <p><span>Humidity:</span> {this.props.humidity}&nbsp;%"</p>
      </div>
  )
}
}