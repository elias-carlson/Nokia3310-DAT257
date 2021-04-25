import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Calendar from './components/Calendar';
import Timelist from './components/Timelist';
import Guests from './components/Guests';
import Confirm from './components/Confirm';

function App() {
  const [guests, setGuests] = useState(0);
  const [date, setDate] = useState();
  const [time, setTime] = useState('');
  function onConfirm() { 
    console.log(guests)
    console.log(date)
    console.log(time)
  };
  
  return (
    <div className="App">
      <header className="App-header">

      <img src="/hamncafet_logo.jpg" alt="Hamncafét logga" className="main_logo"/>

      <BrowserRouter>
        <nav>
          <ul>
            <li> <Link to='/guests'>1</Link></li>
            <li> <Link to='/date'>2</Link></li>
            <li> <Link to='/timelist'>3</Link></li>
            <li> <Link to='/confirm'>4</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path='/guests'>
            <Guests guestProps={setGuests}/>
          </Route>
          <Route path='/date'>
            <Calendar dateProps={setDate}/>
          </Route>
          <Route path='/timelist'>
            <Timelist timeProps={setTime}/>
          </Route>
          <Route path='/confirm2'>
            <Confirm guestProps={guests} dateProps={date} timeProps={time}/>
          </Route>
        </Switch>
      </BrowserRouter>

      <div className='confirm-btn'>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>

      </header>
    </div>
  );
}

export default App;
