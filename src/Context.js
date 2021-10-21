import React, { Component } from 'react'
import { createContext } from 'react/cjs/react.development';

export const APIContext = createContext({});

export default class ContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            products: [],
            currencies: []
        }
    }

    async componentDidMount() {
        try {
          const response = await fetch('http://localhost:4000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
                query {
                    categories {
                        name,
                        products {
                          id,
                          name,
                          inStock,
                          description,
                          category,
                          brand,
                          gallery,
                          attributes {
                            id,
                            name,
                            type,
                            items {
                              displayValue,
                              value,
                              id
                            }
                          }
                        }
                    }
                    currencies
                }
              `
            })
          });
    
          if (!response.ok) {
            throw Error('Something went wrong!');
          }
          const data = await response.json();
          console.log(data);

          let productsArray = data.data.categories.map((category) => {
            return category.products;
          });
          let allProducts = productsArray[0].concat(productsArray[1]);

          this.setState({ 
            categories: data.data.categories,
            products: allProducts,
            currencies: data.data.currencies
          });

          console.log(this.state.products)

        } catch (error) {
          console.log(error);
        }
      }

    render() {
        return (
            <APIContext.Provider value={{
              categories: this.state.categories,
              products: this.state.products,
              currencies: this.state.currencies
            }}>
                {this.props.children}
            </APIContext.Provider>
        )
    }
}
