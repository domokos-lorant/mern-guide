import { useRouter } from "next/router";
import { useCallback } from "react";
import { Button, Header, Icon, Item, Segment } from "semantic-ui-react";
import { ICartItem } from "../../models/Cart";
import { IUser } from "../../models/User";
import { Routes } from "../../utils/routes";

type Props = {
  products: ICartItem[]
  user?: IUser
}

function CartItemList({ products, user }: Props): JSX.Element {
  const router = useRouter();
  const handleViewProducts = useCallback(() => router.push(Routes.Home), []);
  const handleLogin = useCallback(() => router.push(Routes.Login), []);
  const mapCartProductsToItems = useCallback((products: ICartItem[]) => {
    return products.map(p => ({
      childKey: p.product._id,
      header: (
        < Item.Header
          as="a"
          onClick={() => router.push(`${Routes.Product}?_id=${p.product._id}`)}>
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x $${p.product.price}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => console.log(p.product._id)}
        />
      )
    }))
  }, [products]);

  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No products in you basket. Add some!
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={handleViewProducts}>View Products</Button>
          ) : <Button color="blue" onClick={handleLogin}>Login to Add Products</Button>}
        </div>
      </Segment>);
  } else {
    return (
      <Item.Group divided items={mapCartProductsToItems(products)} />
    );
  }
}

export default CartItemList;
