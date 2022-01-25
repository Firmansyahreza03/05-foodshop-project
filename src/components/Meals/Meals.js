import MealsSumary from "./MealsSumary";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";

const Meals = () => {
  return (
    <Fragment>
      <MealsSumary></MealsSumary>
      <AvailableMeals></AvailableMeals>
    </Fragment>
  );
};

export default Meals;
