import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './tokenAmountInput.scss';

class TokenAmountInput extends Component {
  static propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    amount: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const classes = classNames('token-amount-input-container', {
      [this.props.className]: !!this.props.className
    });

    return (
      <div className="token-amount-input-container">
        <input
          className="token-amount-input-field"
          type="number"
          name="amount"
          value={this.props.amount}
          onChange={this.props.handleOnChange}
        />
        <div className="token-amount-input-symbol-label">{this.props.tokenSymbol}</div>
      </div>
    );
  }
}

export default TokenAmountInput;
