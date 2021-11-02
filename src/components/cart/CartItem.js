import React, { Component } from 'react';
import { APIContext } from '../../Context';

export default class CartItem extends Component {

  displayProductPrice(availableCurrencies, selectedCurrency) {
    const productPrice = availableCurrencies.find((currency) => {
      return currency.currency === selectedCurrency;
    });

    return `${productPrice.amount} ${productPrice.currency}`;
  }

  render() {
    const {
      product: { name, prices, gallery, brand },
      quantity,
      attributes,
      id,
    } = this.props;
    return (
      <div className="cart-item">
        <APIContext.Consumer>
          {({ currentCurrency, handleIncrement, handleDecrement, handleRemoveItemCart }) => {
            return (
              <React.Fragment>
                <div className="cart-item-info">
                  <div>
                    <h2>{brand}</h2>
                    <h2>{name}</h2>
                  </div>
                  <h3 className="product-price">
                    {this.displayProductPrice(prices, currentCurrency)}
                  </h3>
                  <button 
                    onClick={() => handleRemoveItemCart(id)}
                    className="cart-delete-product">
                    remove
                  </button>
                  {attributes.length ?
                    <div>
                      <span className="item-size">
                        {attributes[0].item}
                      </span>
                    </div>
                    :
                    ''
                  }
                </div>
                <div className="cart-count">
                  <div className="cart-item-counter">
                    <button
                      className="increment"
                      onClick={() => handleIncrement(name)}
                    >
                      +
                    </button>
                    <span className="item-count">{quantity}</span>
                    <button 
                      className="decrement"
                      disabled={quantity === 1}
                      onClick={() => handleDecrement(name)}>-
                      </button>
                  </div>
                  <div>
                    <img src={gallery} alt="cart item" />
                  </div>
                </div>
              </React.Fragment>
            );
          }}
        </APIContext.Consumer>
      </div>
    );
  }
}
