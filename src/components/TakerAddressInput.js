import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './takerAddressInput.scss';

class TakerAddressInput extends Component {
  static propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    address: PropTypes.string,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
  
    this.state = {
      isValidAddress: true
    };
  }

  handleOnChange = (e) => {
    this.props.handleOnChange(e);
  }

  render() {
    const containerClass = classNames('taker-address-input-container', {
      [this.props.className]: !!this.props.className
    });

    const inputClasses = classNames('taker-address-input-field', {
      error: !this.state.isValidAddress
    });

    return (
      <div className={containerClass}>
        <div className="input-field-label">Taker</div>
        <input
          className={inputClasses}
          placeholder="e.g 0x75bE4F78AA3699B3A348c84bDB2a96c3Db..."
          type="string"
          name="takerAddress"
          value={this.props.address}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default TakerAddressInput;
