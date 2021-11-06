import React, { Component } from 'react';
import './navbar.css';
import Categories from '../categories/Categories';
import Currencies from '../currencies/Currencies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APIContext } from '../../Context';
import {
  faShoppingCart,
  faDollarSign,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import MiniCart from '../cart/MiniCart';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCurrency: false,
      toggleCart: false,
    };
    this.wrapperRef = React.createRef();
    this.handleCurrencies = this.handleCurrencies.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
  }

  handleCurrencies(toggle = true) {
    this.setState({ toggleCurrency: toggle });
  }

  toggleMiniCart() {
    this.setState({ toggleCart: !this.state.toggleCart });
  }

  render() {
    return (
      <APIContext.Consumer>
        {({ cart, err }) => {
          return (
            <React.Fragment>
              <div
                className={this.state.toggleCart ? 'overlay' : ''}
                onClick={this.toggleMiniCart}
              ></div>
              {!err && (
                <nav className="nav-bar">
                  <Categories />
                  <div className="nav-bar-items">
                    <div 
                      className="currencies"
                      ref={this.wrapperRef}>
                      <div
                        className="currency-icon"
                        onClick={() => this.setState({ toggleCurrency: !this.state.toggleCurrency })}
                      >
                        <div className="dollar-sign">
                          <FontAwesomeIcon
                            icon={faDollarSign}
                          ></FontAwesomeIcon>
                        </div>
                        <div
                          className={`arrow-down ${
                            this.state.toggleCurrency ? 'transform' : ''
                          }`}
                        >
                          <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>
                        </div>
                      </div>
                      <Currencies
                        toggleCurrency={this.state.toggleCurrency}
                        handleCurrencies={this.handleCurrencies}
                        wrapperRef={this.wrapperRef}
                      />
                    </div>
                    <div className="cart">
                      <div className="cart-logo" onClick={this.toggleMiniCart}>
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                        ></FontAwesomeIcon>
                        {cart.length >= 1 && (
                          <div className="items-count">
                            <span>{cart.length}</span>
                          </div>
                        )}
                      </div>
                      {this.state.toggleCart && (
                        <MiniCart toggleMiniCart={this.toggleMiniCart} />
                      )}
                    </div>
                  </div>
                </nav>
              )}
            </React.Fragment>
          );
        }}
      </APIContext.Consumer>
    );
  }
}
