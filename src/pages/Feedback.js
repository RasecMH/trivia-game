import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createEmailUrl from '../services/createEmailUrl';
import { addInRanking } from '../services/saveRanking';

class Feedback extends React.Component {
  componentDidMount() {
    this.savePlayerInRanking();
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  savePlayerInRanking = () => {
    const { name, score, gravatarEmail } = this.props;
    const playerInfo = {
      name,
      score,
      picture: createEmailUrl(gravatarEmail),
    };
    addInRanking(playerInfo);
  }

  render() {
    const { name, gravatarEmail, score, assertions } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ createEmailUrl(gravatarEmail) }
            alt={ gravatarEmail }
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        <h1 data-testid="feedback-text">
          {assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </h1>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired, // Aqui era string, mas por exigencias no testes dizendo que era number, foi alterado
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// Feedback.defaultProps = {
//   assertions: {},
// };

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  gravatarEmail: globalState.player.gravatarEmail,
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
