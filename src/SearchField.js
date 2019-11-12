import React from 'react';

export default class SearchField extends React.Component {
  
  render() {
    return (
      <section id="filterBar">
        <h2>Search for a City:</h2>
        <div id="search">
          <input 
            type="text" 
            placeholder="Search for a different different cities Weather..."
            value={this.props.value} 
            onChange={this.props.onChange}
          />
          <button onClick={this.props.onClick}><img src="./images/search.png" alt="search"/></button>
        </div>
        {/*}
         <div id="searchError">
           <p>{this.props.searchErrorValue}</p>
         </div> */}
      </section>
    )
  }
}
