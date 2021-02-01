import { useEffect, useState } from "react";
import { Button, Divider, Segment } from "semantic-ui-react";
import { ICartItem } from "../../models/Cart";
import calculateCartTotal from "../../utils/calculateCartTotal";

type Props = {
  products: ICartItem[]
}

function CartSummary({ products }: Props): JSX.Element {
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
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
          disabled={isCartEmpty}
        />
      </Segment>
    </>);
}

export default CartSummary;
