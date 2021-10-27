import React, { Component } from 'react';
import { APIContext } from '../../Context';
import { Link } from 'react-router-dom';
import MiniCartItem from './MiniCartItem';
import './minicart.css';

export default class MiniCart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="mini-cart-list">
          <div className="mini-cart-items-container">
            <APIContext.Consumer>
              {({ cart, currentCurrency }) => {
                return cart.length ? 
                  cart.map((item) => <MiniCartItem product={item} currentCurrency={currentCurrency} />)
                : (
                  <h3 className="empty-mini-cart">Your Bag is empty</h3>
                );
              }}
            </APIContext.Consumer>
          </div>
          <div className="cart-controlls-container">
            <div className="total-price">
              <span>Total:</span>
              <span>$100</span>
            </div>
            <div className="cart-control">
              <Link to='/cart'>
                <div 
                  className="btn-bag"
                  onClick={() => this.props.toggleMiniCart()}>
                    VIEW BAG
                </div>
              </Link>
              <button className="checkout">CHECK OUT</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
