import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Login from '../pages/Login';
import App from '../App';

describe('Testes do componente Login', () => {
    it('Verifique se os inputs e botões estão visiveis para o usuario', () => {
        const { history } = renderWithRouterAndRedux(<Login />)
        const campos = screen.getAllByRole('textbox')
        
        const campoName = campos[0]
        expect(campoName).toBeInTheDocument();

        const campoEmailGravatar = campos[1]
        expect(campoEmailGravatar).toBeInTheDocument()

        const botaoPlay = screen.getByRole('button', {name: /play/i})
        expect(botaoPlay).toBeInTheDocument();

        const botaoConf = screen.getByRole('button', {name: /configurações/i});
        expect(botaoConf).toBeInTheDocument();
    })

    it('Verifique se ao logar, a tela é redirecionada para a pagina /game', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        const campoName = screen.getByTestId('input-player-name');
        userEvent.type(campoName, 'Ada Love')

        const campoEmailGravatar = screen.getByTestId('input-gravatar-email')
        userEvent.type(campoEmailGravatar, 'adalove@email.com');

        const botaoPlay = await screen.findByRole('button', {name: /play/i})
        userEvent.click(botaoPlay);

        const textoTelaDoJogo = await screen.findByTestId("meu-jogo");
        expect(textoTelaDoJogo).toBeInTheDocument();

        expect(history.location.pathname).toBe('/game');
    
    })
    it('Verifica se existe um botão de configurações, e se clicado redireciona para /settings', () => {
        const { history } = renderWithRouterAndRedux(< App/>);
        
        history.push('/')
        const botaoConf = screen.getByRole('button', {name: /configurações/i});
        expect(botaoConf).toBeInTheDocument();

        userEvent.click(botaoConf)
        expect(history.location.pathname).toBe('/settings');
    })
})