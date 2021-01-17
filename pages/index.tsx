import React from "react";
import axios from "axios";
import { IProduct } from "../models/Product";
import { NextPage } from "next";
import ProductList from "../components/Index/ProductList";

type Props = {
  products: IProduct[];
};

const Home: NextPage<Props> = ({ products }: Props) => {
  return <ProductList products={products} />;
};

Home.getInitialProps = async () => {
  const url = "http://localhost:3000/api/products";
  const response = await axios.get<IProduct[]>(url);
  return { products: response.data };
};

export default Home;
