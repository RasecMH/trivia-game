import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NextButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div>
        <button
          type='button'
          onClick={onClick}
          data-testid='btn-next'
          className='btn btn-outline btn-warning w-96 mt-14'>
          Next
        </button>
      </div>
    );
  }
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NextButton;
