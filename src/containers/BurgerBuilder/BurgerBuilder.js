import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Auxi from '../../hoc/Auxi';


const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    canBuy: false
  }

  updateCanBuy = ingredients => {
    const canBuy = Object.values(ingredients).some(Boolean);
    this.setState({canBuy});
  }

  addIngredientHandler = type => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1
    };

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updateCanBuy(updatedIngredients);
  }

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) return; 

    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] - 1
    };

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updateCanBuy(updatedIngredients);

  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxi>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          canBuy={this.state.canBuy}
         />
      </Auxi>
    );
  }
}

export default BurgerBuilder;