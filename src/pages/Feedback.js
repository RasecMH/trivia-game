import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createEmailUrl from '../services/createEmailUrl';
import { addInRanking } from '../services/saveRanking';
import Header from '../components/Header';

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
  };

  render() {
    const { name, gravatarEmail, score, assertions } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <div className='h-screen w-screen'>
        <div className='bg-black text-white w-screen h-screen flex items-center justify-center bg-[url("https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8")] bg-cover blur'></div>
        <div className='absolute w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='flex-col items-center justify-center'>
            <div className='flex items-center justify-center'>
              <Header />
            </div>
            <div className='flex items-center justify-center mt-12 text-center text-white text-3xl font-bold'>
              <div className='flex-col items-center justify-center'>
                <h1 data-testid='feedback-text'>
                  {assertions < MIN_ASSERTIONS
                    ? 'Could be better...'
                    : 'Well Done!'}
                </h1>
                <p data-testid='feedback-total-question'>
                  Acertos: {assertions}
                </p>
                <button
                  type='button'
                  data-testid='btn-play-again'
                  onClick={this.handleClick}
                  className='btn btn-secondary mr-5 mt-6'>
                  Play Again
                </button>
                <button
                  type='button'
                  data-testid='btn-ranking'
                  onClick={this.handleClickRanking}
                  className='btn btn-primary'>
                  Ranking
                </button>
              </div>
            </div>
          </div>
        </div>
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
