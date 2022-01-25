// INI BUAT HEADER
import { Fragment } from "react/cjs/react.production.min";

import HeaderCartButton from "./HeaderCartButton";
import headerImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>RezaFood</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={headerImage} alt="a table full of delicious food!"></img>
      </div>
    </Fragment>
  );
};

export default Header;
