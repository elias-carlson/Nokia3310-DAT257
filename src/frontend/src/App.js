import './App.sass';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello world"
    }
    this.clickMe = this.clickMe.bind(this);
  }

  clickMe(message) {
    this.setState({
      message: message
    });
  }

  render() {
    return (
      <div className="App">
          <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
            <img src="/hamncafeet-logo.jpeg" alt="Hamncafeet logga" />
          </a>

          {this.state.message}
          <div>
            <Button onClick={() => this.clickMe("Hello world: 0")}>Arvid</Button>
            <Button onClick={() => this.clickMe("Hello world: 1")}>Lisa</Button>
            <Button onClick={() => this.clickMe("Hello world: 2")}>Elias H</Button>
            <Button onClick={() => this.clickMe("Hello world: 3")}>Elias KC</Button>
            <Button onClick={() => this.clickMe("Hello world: 4")}>Astrid</Button>
            <Button onClick={() => this.clickMe("waddap")}>Erik</Button>
            <Button onClick={() => this.clickMe("Jag la inte in knappen sist")}>Ida :)</Button>
          </div>
      </div>
    );
  }
}

export default App;
