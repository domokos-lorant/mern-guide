import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import AccountHeader from "../components/Account/AccountHeader";
import AccountOrders from "../components/Account/AccountOrders";
import AccountPermissions from "../components/Account/AccountPermissions";
import { IOrderPopulatedDocument } from "../models/Order";
import { IUser } from "../models/User";
import baseUrl from "../utils/baseUrl";
import { ApiRoutes } from "../utils/routes";

type Props = {
  user: IUser,
  orders: IOrderPopulatedDocument[]
}

function Account({ user, orders }: Props): JSX.Element {
  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {user.role === "root" &&
        <AccountPermissions currentUserId={user._id} />}
    </>
  );
}

Account.getInitialProps = async (ctx: NextPageContext) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return { orders: [] };
  }

  const url = `${baseUrl}/${ApiRoutes.Orders}`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get<{ orders: IOrderPopulatedDocument[] }>(url, payload);
  return response.data;
}

export default Account;
