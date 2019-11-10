import React, {Component} from 'react'

class ErrorBoundry extends Component {

  constructor(props){
    super(props);

    this.state = {
      hasError: false
    }
  }

    static getDerivedStateFromError(error) {
      return{
        hasError: true
      }
    }

    render() {
      if (this.state.hasError) {
        // Message in case service is down from the API, to show knowledge of ErrorBoundry
        return <h1 id="appDownMessage">The Application is currently down please visit later.</h1>
      }
      return this.props.children
    }
}

export default ErrorBoundry