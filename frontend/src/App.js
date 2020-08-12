import React, { Component } from 'react';
import './App.css';
// import InstructorApp from './component/InstructorApp';
import Season from './service/Season';

class App extends Component {
  render() {
    return (
      // <div className="container">
      //   <InstructorApp />
      // </div>
      <Season />
    );
  }
}

export default App;
