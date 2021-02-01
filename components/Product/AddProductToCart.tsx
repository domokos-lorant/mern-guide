import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import { IUser } from "../../models/User";
import baseUrl from "../../utils/baseUrl";
import { ApiRoutes, Routes } from "../../utils/routes";
import cookie from "js-cookie";
import axios from "axios";
import catchErrors from "../../utils/catchErrors";

type Props = {
  productId: any;
  user?: IUser;
};

function AddProductToCart({ user, productId }: Props): JSX.Element {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const handleQuantityChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setQuantity(Number(event.target.value)),
    []
  );
  const handleSignupClick = useCallback(
    () => router.push(Routes.Signup),
    []
  );
  const handleAddToCartClick = useCallback(
    async () => {
      try {
        setLoading(true);
        const url = `${baseUrl}/${ApiRoutes.Cart}`;
        const payload = { quantity, productId };
        const token = cookie.get("token");
        const headers = { headers: { Authorization: token } };
        await axios.put(url, payload, headers);
        setSuccess(true);
      } catch (error) {
        catchErrors(error, window.alert);
      } finally {
        setLoading(false);
      }
    },
    [quantity]
  );
  useEffect(
    () => {
      if (success) {
        let timeout = setTimeout(() => setSuccess(false), 3000);

        // Ensure that we cancel timeout if we navigate away quickly.
        return () => {
          clearTimeout(timeout);
        };
      }
    },
    [success]);

  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantity"
      onChange={handleQuantityChange}
      value={quantity}
      action={user && success ?
        {
          color: "blue",
          content: "Item added!",
          icon: "plus cart",
          disabled: true
        }
        : user ? {
          color: "orange",
          content: "Add to Cart",
          icon: "plus cart",
          loading,
          disabled: loading,
          onClick: handleAddToCartClick
        }
          : {
            color: "blue",
            content: "Sign up to purchase",
            icon: "plus cart",
            onClick: handleSignupClick
          }}
    />
  );
}

export default AddProductToCart;
