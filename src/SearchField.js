import React from 'react';

export default class SearchField extends React.Component {

  shouldBlur = (e) => {
    console.log("Hi");
    if (e.keyCode === 40) {
      e.target.blur();
      // or set the state as you wish
    }
  }
  
  
  render() {
    return (
      <section id="filterBar">
        <h2>Search for a City:</h2>
        <form onSubmit={ this.props.onSubmit }>
        <div id="search">
          <input 
            type="text" name="City Search"
            placeholder="Search for a different different cities Weather..."
            value={this.props.value} 
            onChange={this.props.onChange}
            onKeyDown={this.shouldBlur}
          />
          <button><img src="./images/search.png" alt="search"/></button>
        </div>
        </form>
        {/*}
         <div id="searchError">
           <p>{this.props.searchErrorValue}</p>
         </div> */}
      </section>
    )
  }
}
