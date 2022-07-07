import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../services/fethApiTrivia';
import { addToken } from '../services/saveToken';
import { login } from '../store/Actions/index';

class Login extends Component {
  state = {
    name: '',
    score: 0,
    assertions: 0,
    gravatarEmail: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleBtnClick = async () => {
    const { dispatchLoginInfo, history } = this.props;
    const token = await getToken();
    addToken(token);
    dispatchLoginInfo({ ...this.state });
    history.push('/game');
  };

  render() {
    const { name, gravatarEmail } = this.state;
    const { history } = this.props;

    return (
      <div className='w-screen h-screen'>
        <div className='bg-black text-white w-screen h-screen flex items-center justify-center bg-[url("https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80")] bg-cover blur'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='mb-5 text-5xl font-bold text-center text-white'>
            Trivia
          </h1>
          <div className=' flex-col items-center justify-center rounded-xl '>
            <input
              name='name'
              type='text'
              data-testid='input-player-name'
              value={name}
              onChange={this.handleChange}
              autocomplete='off'
              placeholder='Name'
              className='text-xl block mb-10 text-white input input-bordered input-secondary w-full max-w-xs'
            />
            <input
              name='gravatarEmail'
              type='email'
              data-testid='input-gravatar-email'
              value={gravatarEmail}
              onChange={this.handleChange}
              placeholder='Email'
              autocomplete='off'
              className='text-xl block mb-10 text-white input input-bordered input-secondary w-full max-w-xs'
            />
            <div className='flex justify-between'>
              <button
                type='button'
                data-testid='btn-play'
                disabled={!(name.length && gravatarEmail.length)}
                onClick={this.handleBtnClick}
                className='btn btn-secondary text-white'>
                Play
              </button>
              <button
                type='button'
                onClick={() => history.push('/settings')}
                data-testid='btn-settings'
                className='btn btn-primary text-white'>
                Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchLoginInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Login.defaultProps = {
  history: {},
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginInfo: (state) => dispatch(login(state)),
});

export default connect(null, mapDispatchToProps)(Login);
