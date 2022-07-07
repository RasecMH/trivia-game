import React from 'react';

class Settings extends React.Component {
  render() {
    return (
      <div className='w-screen h-screen'>
        <div className='bg-black text-white w-screen h-screen flex items-center justify-center bg-[url("https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80")] bg-cover blur'></div>
        <div className='absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white font-bold'>
          <h1 data-testid='settings-title'>Configurações</h1>
          <button
            className='btn btn-secondary mt-5'
            onClick={() => this.props.history.push('/')}>
            Voltar
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
