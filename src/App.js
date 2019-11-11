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
      cityId: '',
      weather: {},
      search: "",
      isFetching: true,
      searchErrorValue: ""
    }
  }



  // Initial Data setup, 
  async componentDidMount() {
    // Call data with the string for the city
    const locationresponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${this.state.apiKey}`);
    const locationJson = await locationresponse.json();
    this.setState({ cityId: locationJson.id });
    // Call with the cityId data to get it's weather
    const locationWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${this.state.cityId}&APPID=${this.state.apiKey}&units=metric`);
    const locationWeatherResponseJson = await locationWeatherResponse.json();
    this.setState({ weather: locationWeatherResponseJson, isFetching: false });
  }

  // Update weather with API DATA
  weatherUpdate =  async () => {
    // Call data with the string for the city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${this.state.apiKey}`);
    const json = await response.json();
    // If statement to make sure promise resolved with what was asked if not let user know it didn't
    if(json.name && json.name.toLowerCase() === this.state.cityName.toLowerCase()){
      this.setState({ cityId: json.id });
      // Call with the cityId data to get it's weather
      const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${this.state.cityId}&APPID=${this.state.apiKey}&units=metric`);
      const json2 = await response2.json();
      this.setState({ weather: json2, searchErrorValue: "" });
    }else{
      this.setState({searchErrorValue: `*City ${this.state.cityName} not found in database.`})
    }
  }


  // This is bound to the SearchFilter form input field to update the state
  updateSearch = (event) => {
    this.setState({search: event.target.value.substring(0,30)});
  }

  // SearchUpdate function
  searchUpdate = () => { 
    if (this.state.search === '') {
      this.setState({searchErrorValue: "*Requires a city name."});
    }else{
      // Run a callback to update the Weather state once the setState for the cityName state is given from the searchState tiggered by the button in SearchField.js
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
          
            <header>
              <h1>Weather Dashboard</h1>
            </header>

            <SearchField
              onChange={this.updateSearch.bind(this)}
              value={this.state.search} 
              onClick={ () => this.searchUpdate() }
              searchErrorValue = {this.state.searchErrorValue}
            />
            
            <CurrentWeather 
              cityName={this.state.weather.city.name}
              icon={this.state.weather.list[0].weather[0].icon}
              altText={this.state.weather.list[0].weather[0].description}
              temp={this.state.weather.list[0].main.temp}
              humidity={this.state.weather.list[0].main.humidity}
              windSpeed={this.state.weather.list[0].wind.speed}
            />

            <section id="forcast">
              <h2>5-Day Forecast:</h2>
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
