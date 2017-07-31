import React, { Component } from 'react';
import style from './style/app.scss';

class App extends Component {
  render() {
    return (
      <div>
        <header>Header</header>
        {this.props.children}
      </div>
    )
  }
}

export default App;