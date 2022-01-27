import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const formIsEmpty = (value) => value.trim() === "";
const postalIsFiveDigit = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValid, setFormValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // buat mindahin yang udah diketik ke entered
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // buat bantuan apakah ketikan sesuai dengan kriteria
    const enteredNameIsValid = !formIsEmpty(enteredName);
    const enteredStreetIsValid = !formIsEmpty(enteredStreet);
    const enteredCityIsValid = !formIsEmpty(enteredCity);
    const enteredPostalIsValid = postalIsFiveDigit(enteredPostal);

    // semua nilai dari enteredisvalid dimasukan ke formvalid
    setFormValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    // gabungan antara nama, jalan, pos, kota
    const formIsValid =
      enteredNameIsValid &&
      enteredPostalIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      //ketikan false semua
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formValid.name && <p>Please enter a name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formValid.street && <p>Please enter a street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal</label>
        <input type="text" id="postal" ref={postalInputRef}></input>
        {!formValid.postal && <p>Please enter a postal</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formValid.city && <p>Please enter a city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
