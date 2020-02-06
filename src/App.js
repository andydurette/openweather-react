import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchField from './SearchField';
import CurrentWeather from './CurrentWeather';
import ForcastDay from './ForcastDay';
import ErrorBoundry from './ErrorBoundry'

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      // Putting the API Key in state itself is likely bad practice but I'm not working with a backend to hide it so it's just a convient place to store it.
      apiKey: "428bbab3989b31eb5f6dd40e0559cbeb",
      cityName:'Toronto',
      approvedCityName:'Toronto',
      cityId: '',
      weather: {},
      search: "",
      isFetching: true,
      searchErrorValue: "",
      errorLogged: false
    }
  }



  // Initial Data setup, 
  async componentDidMount() {
    // Call data with the string for the city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${this.state.apiKey}`);
    const json = await response.json();
    this.setState({ cityId: json.id });
    // Call with the cityId data to get it's weather
    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${this.state.cityId}&APPID=${this.state.apiKey}&units=metric`);
    const json2 = await response2.json();
    this.setState({ weather: json2, isFetching: false });
  }

  // Update weather with API DATA
  weatherUpdate =  async () => {
    // Call data with the string for the city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${this.state.apiKey}`);
    const json = await response.json();
    // If statement to make sure promise resolved with what was asked if not let user know it didn't
    if(json.name && json.name.toLowerCase().includes(this.state.cityName.toLowerCase())){
      this.setState({ cityId: json.id });
      // Call with the cityId data to get it's weather
      const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${this.state.cityId}&APPID=${this.state.apiKey}&units=metric`);
      const json2 = await response2.json();
      this.setState({ weather: json2, searchErrorValue: "", approvedCityName: this.state.cityName });
    }else{
      this.setState({searchErrorValue: `* ${this.state.cityName} not found in database of cities.`, errorLogged: true})
      setTimeout(() => {  this.setState({ errorLogged: false}) }, 3000);
    }
  }


  // This is bound to the SearchFilter form input field to update the state
  updateSearch = (event) => {
    this.setState({search: event.target.value.substring(0,30)});
  }

  // SearchUpdate function
  searchUpdate = (e) => { 
    e.preventDefault();
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      e.target.querySelector("#search input").blur();
    }

    if (this.state.search === '') {
      this.setState({searchErrorValue: "*Requires a city name to be inputted.", errorLogged: true});
      setTimeout(() => {  this.setState({ errorLogged: false}) }, 3000);
    }else{
      // Run a callback to update the Weather state once the setState for the cityName state is given from the searchState triggered by the button in SearchField.js
      this.setState({cityName: this.state.search, searchErrorValue: ""}, this.weatherUpdate);
    }
  }


  render() {
    return (
      <ErrorBoundry>
      <React.Fragment>
      
         {this.state.isFetching ?  
        <div id="loadingScreen">
        <p>Loading...</p>
        </div>
        : (
          <React.Fragment>
            <div id="errorBox" className={(this.state.errorLogged) ?  "open" : "" }>
            <img src="/images/weatherIcons/marker.svg" width="30" height="30" alt=""/><p>{this.state.searchErrorValue}</p>
            </div>
            <div id="centerBox">
            <SearchField
              value={this.state.search} 
              onChange={this.updateSearch.bind(this)}
              onSubmit={ (e) => this.searchUpdate(e) }
              searchErrorValue = {this.state.searchErrorValue}
            />
            
            <CurrentWeather 
              cityName={this.state.weather.city.name}
              icon={this.state.weather.list[0].weather[0].icon}
              altText={this.state.weather.list[0].weather[0].description}
              temp={this.state.weather.list[0].main.temp}
              humidity={this.state.weather.list[0].main.humidity}
              windSpeed={this.state.weather.list[0].wind.speed}
              approvedCityName={this.state.approvedCityName}
            />

            <section id="forcast">
            <h2>{this.state.approvedCityName}'s 5-Day Forecast:</h2>
              <div className="days">
                {
                  [0,1,2,3,4].map ((i) => {
                  return (
                    <ForcastDay
                      key={i}
                      keyNumber={i + 1}
                      temp={this.state.weather.list[i].main.temp}
                      humidity={this.state.weather.list[i].main.humidity}
                      icon={this.state.weather.list[i].weather[0].icon}
                      altText={this.state.weather.list[i].weather[0].description}
                    />
                    )
                  })
                }
                </div>
            </section>
            </div>
        </React.Fragment>
          )}
          
      </React.Fragment>
      </ErrorBoundry>
    );
  }

}

// Render to index.html

ReactDOM.render(
<App />,
document.getElementById('root')
);
