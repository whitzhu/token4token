import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tokenDropdownMenu.scss';

class TokenDropdownMenu extends Component {
  static propTypes = {
    handleTokenOnChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    selectedToken: PropTypes.object,
  }

  constructor(props) {
    super(props);
  
    this.state = {
      isOpen: false
    };
  }

  componentWillMount = () => {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (!this.refTokenDropdownMenu.contains(e.target)) {
      this.handleMenuClose()
    }
  }

  handleDropdownMenuClick = () => this.setState({ isOpen: !this.state.isOpen });

  handleMenuClose = () => this.setState({ isOpen: false });
  
  handleOnOptionClick = (value) => {
    this.props.handleTokenOnChange(value);
    this.handleMenuClose();
  }

  render() {
    return (
      <div
        ref={(ref) => { this.refTokenDropdownMenu = ref; }}
        className="token-dropdown-menu-container"
      >
        <div className="token-dropdown-menu"
          onClick={this.handleDropdownMenuClick}
        >
          {this.renderPlaceholderTokenNameCard()}
        </div>
        {this.renderDropdownMenuOptions()}
      </div>
    );
  }

  renderDropdownMenuOptions = () => {
    const { options } = this.props;
    if (!options || !this.state.isOpen) {
      return null;
    }

    return (
      <div className="token-dropdown-menu-options-container">
        {options.map(this.renderTokenNameCard)}
      </div>
    );
  }

  renderPlaceholderTokenNameCard = () => {
    const { selectedToken, placeholder } = this.props;
    return (
      <div
        className="token-dropdown-menu-placeholder"
        onClick={() => this.handleDropdownMenuClick()}
      >
        {this.renderIcon(selectedToken && selectedToken.logo)}
        <span className="token-dropdown-menu-display">
          {selectedToken && selectedToken.display || placeholder}
        </span>
        {this.renderCollapseExpendIcon()}
      </div>
    )
  }

  renderCollapseExpendIcon = () => {
    return this.state.isOpen ?
      <i className="token-dropdown-menu-collapse-icon fa fa-chevron-up" /> :  
      <i className="token-dropdown-menu-collapse-icon fa fa-chevron-down" />;
  }

  renderTokenNameCard = (option) => {
    return (
      <div
        className="token-dropdown-menu-option"
        key={option.value}
        value={option.value}
        onClick={() => this.handleOnOptionClick(option)}
      >
        {this.renderIcon(option.logo)}
        <span className="token-dropdown-menu-display">{option.display}</span>
      </div>
    )
  }

  renderIcon = (src) => {
    if (src) {
      return (
        <div className="token-icon-container">
          <img className="token-icon" src={src} alt=""/>
        </div>
      );
    }
  }
}

export default TokenDropdownMenu;
