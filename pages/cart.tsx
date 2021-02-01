import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { ICartItem } from "../models/Cart";
import { IUser } from "../models/User";
import baseUrl from "../utils/baseUrl";
import { ApiRoutes } from "../utils/routes";

type Props = {
  products: ICartItem[]
  user?: IUser
}

function Cart({ products, user }: Props): JSX.Element {
  return (
    <Segment>
      <CartItemList user={user} products={products} />
      <CartSummary products={products} />
    </Segment>
  );
}

Cart.getInitialProps = async (ctx: NextPageContext) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return { products: [] };
  }

  const url = `${baseUrl}/${ApiRoutes.Cart}`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  return { products: response.data };
}

export default Cart;
