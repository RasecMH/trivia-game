import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

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
      <div className='w-screen h-screen'>
        <div className='bg-black text-white w-full h-full flex items-center justify-center bg-[url("https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80")] bg-cover blur'></div>
        <div className='absolute mx-auto w-4/5 mt-16 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col items-center justify-center w-full'>
            <h1
              data-testid='ranking-title'
              className='text-4xl font-bold text-white mt-24'>
              Ranking
            </h1>
            <div className='flex items-center justify-evenly w-full flex-wrap gap-1'>
              {ranking
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
                  <div
                    key={index}
                    score={player.score}
                    className='flex items-center justify-evenly gap-4 text-white font-bold
                    border-solid border-2 border-pink-600 rounded-full text-3xl h-24 w-2/5
                    my-5'>
                    <span>{index + 1}º</span>
                    <img
                      src={player.picture}
                      alt={player.name}
                      className='rounded-full w-20'
                    />
                    <h2 data-testid={`player-name-${index}`}>{player.name}</h2>
                    <p data-testid={`player-score-${index} `}>{player.score}</p>
                  </div>
                ))}
            </div>
            <button
              type='button'
              data-testid='btn-go-home'
              onClick={this.handleClick}
              className='btn btn-secondary mt-6'>
              Play Again
            </button>
          </div>
        </div>
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
