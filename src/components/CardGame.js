import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestion } from '../services/fethApiTrivia';
import { getToken } from '../services/saveToken';
import './CardGame.css';
import NextButton from './NextButton';
import { score as saveScore } from '../store/Actions';
import shuffleAnswers from '../services/shuffleAnswers';

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
    const token = getToken();
    const response = await getQuestion(token);
    if (response.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: response.results,
        answers: shuffleAnswers(response.results),
      });
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
        timeOver: false,
        secondsAmount: 30,
      }),
      this.startTimer()
    );
    if (count === LAST_QUESTION) {
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
    if (className.includes('correct-answer')) {
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

  render() {
    const { questions, isClicked, secondsAmount, timeOver, answers, count } =
      this.state;
    return (
      <div className='leading-8'>
        <p data-testid='meu-jogo'>Meu Jogo</p>
        <span data-testid='timer'>
          {String(secondsAmount).padStart(2, '0')}
        </span>
        {questions.length && (
          <div className='my-3'>
            <p data-testid='question-category'>{questions[count].category}</p>
            <p data-testid='question-text' className='leading-6 h-12'>
              {questions[count].question}
            </p>
            <div
              data-testid='answer-options'
              className='flex items-center justify-center flex-wrap h-24'>
              {answers[count].map(
                (question) =>
                  question.answer && (
                    <button
                      key={question.dataTestId}
                      type='button'
                      data-testid={question.dataTestId}
                      onClick={() => this.handleButtonClick(question)}
                      disabled={timeOver}
                      className={`btn btn-primary btn-outline ${
                        isClicked ? question.className : undefined
                      } w-1/2 my-3`}
                      difficulty={question.difficulty}>
                      {question.answer}
                    </button>
                  )
              )}
            </div>
            <div className='h-16'>
              {isClicked && <NextButton onClick={this.handleNextButton} />}
            </div>
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
