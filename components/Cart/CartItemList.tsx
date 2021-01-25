import { Button, Header, Icon, Segment } from "semantic-ui-react";

function CartItemList(): JSX.Element {
  const user = false;

  return (
    <Segment secondary color="teal" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        No products in you basket. Add some!
      </Header>
      <div>
        {user ? (
          <Button color="orange">View Products</Button>
        ) : <Button color="blue">Login to Add Products</Button>}
      </div>
    </Segment>);
}

export default CartItemList;