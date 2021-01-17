import axios from "axios";
import { NextPageContext } from "next";
import ProductAttributes from "../components/Product/ProductAttributes";
import ProductSummary from "../components/Product/ProductSummary";
import { IProduct } from "../models/Product";

type Props = {
  product: IProduct;
};

function Product({ product }: Props): JSX.Element {
  return (
    <>
      <ProductSummary {...product} />
      <ProductAttributes {...product} />
    </>
  );
}

Product.getInitialProps = async ({ query: { _id } }: NextPageContext) => {
  const url = "http://localhost:3000/api/product";
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { product: response.data };
};

export default Product;
