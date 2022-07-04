import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion } from '../services/fethApiTrivia';
import { getToken } from '../services/saveToken';
import './CardGame.css';
import NextButton from './NextButton';
import { score as saveScore } from '../store/Actions';
// import { addInRanking } from '../services/saveRanking';
// import createEmailUrl from '../services/createEmailUrl';

class CardGame extends React.Component {
  state = {
    questions: [],
    answers: [],
    isClicked: false,
    count: 0,
    secondsAmount: 30,
    timeOver: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const ERROR_CODE = 3;
    const CORRECT = 'correct-answer';
    const token = getToken();
    const response = await getQuestion(token);
    if (response.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const SORT_NUMBER = 0.5;
      const answerReceived = response.results.map((result) => [
        {
          answer: result.correct_answer,
          className: CORRECT,
          dataTestId: CORRECT,
          difficulty: result.difficulty,
        },
        ...result.incorrect_answers.map((wrong, i) => ({
          answer: wrong,
          className: 'wrong-answer',
          dataTestId: `wrong-answer-${i}`,
          difficulty: result.difficulty,
        })),
      ].sort(() => SORT_NUMBER - Math.random()));

      this.setState({ questions: response.results, answers: answerReceived });
    }
    this.startTimer();
  }

  componentDidUpdate() {
    const { secondsAmount } = this.state;
    if (secondsAmount === 0) {
      this.handleTimeOver();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleNextButton = () => {
    const { count } = this.state;
    const { history } = this.props;
    const LAST_QUESTION = 4;

    this.setState(
      (prevState) => ({
        count: prevState.count + 1,
        isClicked: false,
        secondsAmount: 30,
      }),
      this.startTimer(),
    );
    if (count === LAST_QUESTION) {
      // this.savePlayerInRanking();
      history.push('/feedback');
    }
  };

  handleTimeOver = () => {
    clearInterval(this.intervalId);
    this.setState({
      secondsAmount: 'Over',
      timeOver: true,
      isClicked: true,
    });
  };

  handleButtonClick = (item) => {
    clearInterval(this.intervalId);
    const difficultyValue = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const POINT = 10;
    const { dispatchScore } = this.props;
    const { secondsAmount } = this.state;
    const { className, difficulty } = item;
    if (className === 'correct-answer') {
      const valor = POINT + secondsAmount * difficultyValue[difficulty];
      dispatchScore(valor);
    }
    this.setState({ isClicked: true });
  };

  startTimer = () => {
    const ONE_SECOND_IN_MS = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        secondsAmount: prevState.secondsAmount - 1,
      }));
    }, ONE_SECOND_IN_MS);
  };

  // savePlayerInRanking = () => {
  //   const { name, score, gravatarEmail } = this.props;
  //   const playerInfo = {
  //     name,
  //     score,
  //     picture: createEmailUrl(gravatarEmail),
  //   };
  //   addInRanking(playerInfo);
  // }

  render() {
    const { questions, isClicked, secondsAmount, timeOver, answers, count } = this.state;
    return (
      <div>
        <p data-testid="meu-jogo">Meu Jogo</p>
        <span data-testid="timer">{String(secondsAmount).padStart(2, '0')}</span>
        {questions.length && (
          <div>
            <p data-testid="question-category">{questions[count].category}</p>
            <p data-testid="question-text">{questions[count].question}</p>
            <div data-testid="answer-options">
              {answers[count].map(
                (question) => question.answer && (
                  <button
                    key={ question.dataTestId }
                    type="button"
                    data-testid={ question.dataTestId }
                    onClick={ () => this.handleButtonClick(question) }
                    disabled={ timeOver }
                    className={ isClicked ? question.className : undefined }
                    difficulty={ question.difficulty }
                  >
                    {question.answer}
                  </button>
                ),
              )}
            </div>
            {isClicked && <NextButton onClick={ this.handleNextButton } />}
          </div>
        )}
      </div>
    );
  }
}
// Só para commitar
CardGame.propTypes = {
  // name: PropTypes.string.isRequired,
  // score: PropTypes.number.isRequired,
  // gravatarEmail: PropTypes.string.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (state) => dispatch(saveScore(state)),
});

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  gravatarEmail: globalState.player.gravatarEmail,
  score: globalState.player.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
