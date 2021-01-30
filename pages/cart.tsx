import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { IProduct } from "../models/Product";
import baseUrl from "../utils/baseUrl";
import { ApiRoutes } from "../utils/routes";

type Props = {
  products: IProduct[]
}

function Cart({ products }: Props): JSX.Element {
  console.log(products);
  return (
    <Segment>
      <CartItemList />
      <CartSummary />
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
