import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { useCallback, useState } from "react";
import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { ICartItem } from "../models/Cart";
import { IUser } from "../models/User";
import baseUrl from "../utils/baseUrl";
import { ApiRoutes } from "../utils/routes";
import cookie from "js-cookie";

type Props = {
  products: ICartItem[]
  user?: IUser
}

function Cart({ products, user }: Props): JSX.Element {
  const [cartProducts, setCartProducts] = useState(products);

  const handleRemoveFromCart = useCallback(
    async (id: any) => {
      const url = `${baseUrl}/${ApiRoutes.Cart}`;
      const token = cookie.get("token");
      const payload = {
        params: { productId: id },
        headers: { Authorization: token }
      };
      const result = await axios.delete(url, payload);
      setCartProducts(result.data);
    },
    [products]);

  return (
    <Segment>
      <CartItemList
        user={user}
        products={cartProducts}
        handleRemoveFromCart={handleRemoveFromCart} />
      <CartSummary products={cartProducts} />
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
