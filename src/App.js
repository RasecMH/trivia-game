import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ (props) => <Game { ...props } /> } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ (props) => <Feedback { ...props } /> } />
      <Route path="/ranking" component={ (props) => <Ranking { ...props } /> } />
    </Switch>
  );
}
