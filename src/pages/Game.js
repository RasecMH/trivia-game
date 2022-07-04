import React from 'react';
import Header from '../components/Header';
import CardGame from '../components/CardGame';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <CardGame
          { ...this.props }
        />
      </div>
    );
  }
}

export default Game;
