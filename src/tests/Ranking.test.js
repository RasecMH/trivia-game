import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';

describe('Teste da pagina de Ranking', () => {
    it('Verifique se o usuario é redirecionado para pagina de login! ', () => {
      const { history } = renderWithRouterAndRedux(<App />)
      history.push('/ranking');

      const btn = screen.getByRole('button', {  name: /play again/i});
      userEvent.click(btn);

      expect(history.location.pathname).toBe('/');
    })

    it('Verifica se os elementos sao renderizados na tela', () => {
        const initialState = {
            player: {
              name: 'Player Name',
              assertions: 0,
              score: 0,
              gravatarEmail: 'player@email.com',
            },
          };
      const { history } = renderWithRouterAndRedux(<App  />, initialState)

      history.push('/feedback');
      const btnRanking = screen.getByRole('button', {  name: /ranking/i});
      userEvent.click(btnRanking);

      const { player:{ name, score } } = initialState
      const img = screen.getByRole('img', {  name, });
      const nome = screen.getByText( name )
      const scoreElement = screen.getByText( score )
      
      expect(img).toBeInTheDocument();
      expect(nome).toBeInTheDocument();
      expect(scoreElement).toBeInTheDocument();
    })
})