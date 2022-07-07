import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  createEmailUrl = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    const { name, score } = this.props;
    return (
      <div
        className='flex items-center justify-evenly gap-4 text-white font-bold
      border-solid border-2 border-pink-600 rounded-full text-3xl h-24 w-full
      px-6'>
        <img
          src={this.createEmailUrl()}
          alt='profile-avatar'
          data-testid='header-profile-picture'
          className='rounded-full w-20'
        />
        <p data-testid='header-player-name'>{name}</p>
        <p data-testid='header-score'>{`Score: ${score}`}</p>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  gravatarEmail: globalState.player.gravatarEmail,
  score: globalState.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
