import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NextButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div>
        <button
          type="button"
          onClick={ onClick }
          data-testid="btn-next"
        >
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
