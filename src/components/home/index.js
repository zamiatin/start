import React, { Component } from 'react';
import img from './img/logo.png';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <img src={img} alt="logo" />
      </div>
    )
  }
}

export default Home;