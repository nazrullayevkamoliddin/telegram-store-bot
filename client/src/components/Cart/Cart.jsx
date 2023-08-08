import "./Cart.css";
import Button from "../Button/Button";
import { totalPrice } from "../units/total-price";

const Cart = ({ cartItems,onCheckout }) => {
  return (
    <div className="cart__container">
      <p>
        Umumiy narxi:{" "}
        {totalPrice(cartItems).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>

      <Button
        title={`${
          cartItems.length !== 0 
          ? "To'lov qilish" 
          : "Buyurtma berish"
        }`}
        disable={cartItems.length == 0 ? true : false}
        type={"checkout"}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
