import React, { Component } from 'react';
import ethereum_address from 'ethereum-address';
import classNames from 'classnames';
import TokenCard from './TokenCard';
import TakerAddressInput from './TakerAddressInput';


import './place-order.scss';
import TOKENS from '../../fake/tokens.json';

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      sellToken: TOKENS[0],
      sellAmount: '',
      buyToken: { value: '' },
      buyAmount: '',
      takerAddress: '',
      isTakerAddressValid: true,
      isValidOrder: true,
      success: false,
    };
  }

  handleSellTokenOnChange = (token) => {
    this.setState({
      sellToken: token
    });
    this.isValidOrder();
  }

  handleSellAmountOnChange = (e) => {
    this.setState({
      sellAmount: e.target.value 
    });
    this.isValidOrder();
  }

  handleBuyTokenOnChange = (token) => {
    this.setState({
      buyToken: token
    });
    this.isValidOrder();
  }

  hanldeBuyAmountOnChange = (e) => {
    this.setState({
      buyAmount: e.target.value 
    });
    this.isValidOrder();
  }

  handleOnChange = (e) => {
    this.isValidOrder();
  }

  handleTakerAddressVadility = (boolean) => {
    this.setState({
      isTakerAddressValid: boolean 
    });
  }

  handleTakerAddressOnChange = (e) => {
    const takerAddress = e.target.value
    const isTakerAddressValid = takerAddress === '' ? true : ethereum_address.isAddress(takerAddress);
    const { buyToken, buyAmount, sellToken, sellAmount } = this.state;
    const isValidOrder = !!buyToken.value && buyAmount && sellToken.value && sellAmount && isTakerAddressValid;
    this.setState({
      takerAddress,
      isTakerAddressValid,
      isValidOrder
    });
  }

  isValidOrder = () => {
    this.handleClearSuccess();
    const { buyToken, buyAmount, sellToken, sellAmount, takerAddress, isTakerAddressValid } = this.state;
    const isValidOrder = !!buyToken.value && buyAmount && sellToken.value && sellAmount && isTakerAddressValid;
    this.setState({
      isValidOrder
    });
  }

  handleOnClick = () => {
    this.isValidOrder();
    if (this.state.isValidOrder) {
      this.setState({
        success: true 
      });
    }
  }

  handleClearSuccess = () => {
    this.setState({
      success: false 
    });
  }

  render() {
    return (
      <div className="place-order-container">
        <div className="place-order-container-header">
          <div className="place-order-container-title">
            Place Token Exchange Order
          </div>
        </div>
        <div className="place-order-token-container">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <div className="input-field-label">Selling</div>
              <TokenCard
                className="place-order-token-card"
                tradePosition="sell"
                selectedToken={this.state.sellToken}
                amount={this.state.sellAmount}
                handleTokenOnChange={this.handleSellTokenOnChange}
                hanldeTokenAmountOnChange={this.handleSellAmountOnChange}
              />
            </div>
            <div className="col-sm-6 col-xs-12">
              <div className="input-field-label">Buying</div>
              <TokenCard
                className="place-order-token-card"
                tradePosition="buy"
                selectedToken={this.state.buyToken}
                amount={this.state.buyAmount}
                handleTokenOnChange={this.handleBuyTokenOnChange}
                hanldeTokenAmountOnChange={this.hanldeBuyAmountOnChange}
              />
            </div>
          </div>
        </div>
        <div className="place-order-taker-address-container">
          <TakerAddressInput
            takerAddress={this.state.takerAddress}
            handleIsValid={this.handleTakerAddressVadility}
            handleOnChange={this.handleTakerAddressOnChange}
          />
          {this.renderTakerAddressError()}
        </div>
        {this.renderPlaceOrderButton()}
      </div>
    );
  }

  renderPlaceOrderButton = () => {
    const disabled = !this.state.isValidOrder;
    const classes = classNames('place-order-taker-button-container', {
      disabled
    });

    return (
      <div className={classes}>
        <button
          className="btn btn-lg primary"
          onClick={this.handleOnClick}
          disabled={disabled}
        >
          Sign Hash To Place Order
        </button>
        {this.renderValidOrderErrorMsg()}
        {this.renderValidOrderSuccessMsg()}
      </div>
    );
  }

  renderTakerAddressError = () => {
    if (!this.state.isTakerAddressValid) {
      return (
        <div className="place-order-error-msg">Invalid ethereum address</div>
      );
    }
  }

  renderValidOrderErrorMsg = () => {
    if (!this.state.isValidOrder) {
      return (
        <div className="place-order-error-msg">
          Uh oh, please fill in token exchange information and try again
        </div>
      );
    }
  }

  renderValidOrderSuccessMsg = () => {
    if (this.state.success) {
      return (
        <div className="place-order-success-msg">
          Successfully placed order!
        </div>
      );
    }
  }
}

export default PlaceOrder;
