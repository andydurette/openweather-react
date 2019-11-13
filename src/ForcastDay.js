import React from 'react';
import GetDate from './GetDate';

export default class ForcastDay extends React.Component {

  
  render() {
    return (
      <div>
        <p>{ GetDate(this.props.keyNumber) }</p>
        <img src={`/images/weatherIcons/${this.props.icon}.svg`} alt={this.props.altText} width="70" height="70" />
        <p><span>Temperature:</span> {this.props.temp}&nbsp;<sup>°C</sup></p>
        <p><span>Humidity:</span> {this.props.humidity}&nbsp;<sup>%</sup></p>
      </div>
  )
}
}