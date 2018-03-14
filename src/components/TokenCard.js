import React, { Component } from 'react';
import classNames from 'classnames';
import TOKENS from '../../fake/tokens.json';
import TokenDropdownMenu from './TokenDropdownMenu';
import TokenAmountInput from './TokenAmountInput';

import './tokenCard.scss';

class TokenCard extends Component {
  render() {
    const classes = classNames('token-card', {
      [this.props.className]: !!this.props.className
    });
    
    return (
      <div className={classes}>
        <div className="token-card-token-info">
          <div className="token-card-logo"></div>
          <div className="token-card-token-name"></div>
          {this.renderTokenDropdownMenu()}
          {this.renderTokenAmount()}
        </div>
        <div className="token-card-token-amount"></div>
        <div className="token-card-token-symbol"></div>
      </div>
    );
  }

  renderTokenDropdownMenu = () => (
    <div>
      <TokenDropdownMenu
        options={TOKENS}
        handleTokenOnChange={this.props.handleTokenOnChange}
        selectedToken={this.props.selectedToken}
        placeholder="Select token"
      />
    </div>
  );

  renderTokenAmount = () => {
    return (
      <div className="token-card-token-amount-input-container">
        <TokenAmountInput
          amount={this.props.amount}
          tokenSymbol={this.props.selectedToken.value}
          handleOnChange={this.props.hanldeTokenAmountOnChange}
        />
      </div>
    );
  }
}

export default TokenCard;
