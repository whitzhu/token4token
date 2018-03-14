import React, { Component } from 'react';
import PlaceOrder from './PlaceOrder';
import TokenCard from './TokenCard';

import './app.scss';

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <PlaceOrder />
      </div>
    )
  }
}

export default App;
