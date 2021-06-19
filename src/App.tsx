import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Admin from './pages/Admin';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/admin' component={() => <Admin/>} />
        <Redirect to='/admin'/>
      </Switch>
    </Router>
  );
}

export default App;
