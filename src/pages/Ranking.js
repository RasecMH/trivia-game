import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    this.setState({ ranking: JSON.parse(localStorage.getItem('ranking')) });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.sort((a, b) => b.score - a.score).map((player, index) => (
          <div key={ index } score={ player.score }>
            <img src={ player.picture } alt={ player.name } />
            <h2 data-testid={ `player-name-${index}` }>
              {player.name}
            </h2>
            <p data-testid={ `player-score-${index} ` }>
              {player.score}
            </p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
