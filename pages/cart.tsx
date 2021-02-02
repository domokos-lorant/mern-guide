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
import { Token } from "react-stripe-checkout";
import catchErrors from "../utils/catchErrors";

type Props = {
  products: ICartItem[]
  user?: IUser
}

function Cart({ products, user }: Props): JSX.Element {
  const [cartProducts, setCartProducts] = useState(products);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleCheckout = useCallback(
    async (paymentData: Token) => {
      try {
        setLoading(true);
        const url = `${baseUrl}/${ApiRoutes.Checkout}`;
        const token = cookie.get("token");
        const payload = { paymentData };
        await axios.post(
          url,
          payload,
          { headers: { Authorization: token } }
        );
        setSuccess(true);
      } catch (error) {
        catchErrors(error, window.alert);
      } finally {
        setLoading(false);
      }
    },
    [products]);

  return (
    <Segment loading={loading}>
      <CartItemList
        user={user}
        products={cartProducts}
        handleRemoveFromCart={handleRemoveFromCart}
        success={success}
      />
      <CartSummary
        products={cartProducts}
        handleCheckout={handleCheckout}
        success={success}
      />
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
