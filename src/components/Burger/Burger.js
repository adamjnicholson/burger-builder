import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const burger = props => {
  let arrIngredients = Object.entries(props.ingredients) //[salad, cheese, bacon, meat]
  .map(([type, amount]) => {
    return [...Array(amount)].map((_, i) => { // create array with length of particular ingredient
      return <BurgerIngredient key={type + i} type={type} /> // create ingredient component
    })
  })
  .reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (arrIngredients.length === 0) {
    arrIngredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {arrIngredients}
      <BurgerIngredient type="bread-bottom" />

    </div>
  );
}

export default burger;