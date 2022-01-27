import { useContext, useState, Fragment } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false); //status cekout false
  const [isSubmitting, setIsSubmitting] = useState(false); //status loading submiting false
  const [isSubmitted, setIsSubmitted] = useState(false); //status submit sudah selesai false

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true); //kirim data maka status loading true
    await fetch(
      "https://react-app-foodshop-default-rtdb.firebaseio.com/orderlist.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false); //data sudah terkirim, status loading false
    setIsSubmitted(true); //data sudah terkirim, status data terkirim true
    cartCtx.clearCart();
  };

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {/* jika button order diklik, maka tampilkan form checkout */}
      {isCheckout && (
        <Checkout
          onCancel={props.onClose}
          onSubmit={submitOrderHandler}
        ></Checkout>
      )}

      {/* jika checkout tidak terjadi, munculkan button untuk checkout */}
      {!isCheckout && modalAction}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>; //notif jika sedang mengirim
  const isSubmittedModalContent = <p>Succesfully sent the order!</p>; //notif jika pengiriman data selesai

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {/* tidak loading & tidak terkirim = tampilkan menu cart */}

      {isSubmitting && isSubmittingModalContent}
      {/* sedang loading = tampilkan notif sedang mengirim*/}

      {!isSubmitting && isSubmitted && isSubmittedModalContent}
      {/* tidak loading & sudah terkirim = tampilkan notif sudah selesai*/}
    </Modal>
  );
};
export default Cart;
