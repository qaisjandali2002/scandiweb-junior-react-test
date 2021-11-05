import React, { Component } from 'react';
import { APIContext } from '../../Context';
import './currencies.css';

export default class Currencies extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef.current.className === 'currencies-list' && !this.wrapperRef.current.contains(event.target)) {
        this.props.handleCurrencies();
    }
  }

  render() {
    return (
      <React.Fragment>
        <ul ref={this.wrapperRef} className={this.props.toggleCurrency ? 'currencies-list' : 'hide'}>
          <APIContext.Consumer>
            {({ currencies, setCurrency }) => {
              return currencies.map((currency) => (
                <li
                  key={currency}
                  onClick={() => {
                    setCurrency(currency);
                    return this.props.handleCurrencies();
                  }}
                >
                  {currency}
                </li>
              ));
            }}
          </APIContext.Consumer>
        </ul>
      </React.Fragment>
    );
  }
}
