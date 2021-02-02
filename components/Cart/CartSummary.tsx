import { useEffect, useState } from "react";
import { Button, Divider, Segment } from "semantic-ui-react";
import { ICartItem } from "../../models/Cart";
import calculateCartTotal from "../../utils/calculateCartTotal";
import StripeCheckout, { Token } from "react-stripe-checkout";

type Props = {
  products: ICartItem[],
  handleCheckout: (token: Token) => Promise<void>,
  success: boolean,
}

function CartSummary({ products, handleCheckout, success }: Props): JSX.Element {
  const [isCartEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState("0");
  const [stripeAmount, setStripeAmount] = useState(0);


  useEffect(() => {
    setCartEmpty(products.length === 0);
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
  }, [products]);


  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <StripeCheckout
          name="React Reserve"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent="onClick"
          stripeKey="pk_test_51IGI2qFyo3OAQn0T4H84bdMPaO7HviLurFV9OWXYs9Yfc73WdHpzGDtrHqQ0MEgoy3u22Ph9VC2lLMu3qjoJUq3B00JxbTBmnC"
        >
          <Button
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
            disabled={isCartEmpty || success}
          />
        </StripeCheckout>
      </Segment>
    </>);
}

export default CartSummary;
