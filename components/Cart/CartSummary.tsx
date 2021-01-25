import { Button, Divider, Segment } from "semantic-ui-react";

function CartSummary(): JSX.Element {
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> $0.00
        <Button icon="cart" color="teal" floated="right" content="Checkout" />
      </Segment>
    </>);
}

export default CartSummary;
