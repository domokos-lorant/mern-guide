import axios from "axios";
import { NextPageContext } from "next";
import ProductAttributes from "../components/Product/ProductAttributes";
import ProductSummary from "../components/Product/ProductSummary";
import { IProduct } from "../models/Product";
import { IUser } from "../models/User";
import baseUrl from "../utils/baseUrl";

type Props = {
  product: IProduct;
  user?: IUser;
};

function Product({ product, user }: Props): JSX.Element {
  return (
    <>
      <ProductSummary {...product} />
      <ProductAttributes {...product} user={user} />
    </>
  );
}

Product.getInitialProps = async ({ query: { _id } }: NextPageContext) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { product: response.data };
};

export default Product;
