import React from "react";
import axios from "axios";
import { IProduct } from "../models/Product";
import { NextPage } from "next";

type Props = {
  products: IProduct[];
};

const Home: NextPage<Props> = ({ products }: Props) => {
  console.log(products);
  // React.useEffect(() => {
  //   getProducts();
  // }, []);

  // async function getProducts(): Promise<Product[]> {
  //   const url = "http://localhost:3000/api/products";
  //   const response = await axios.get<Product[]>(url);
  //   console.log(response.data);
  //   return response.data;
  // }

  return <>home</>;
};

Home.getInitialProps = async () => {
  const url = "http://localhost:3000/api/products";
  const response = await axios.get<IProduct[]>(url);
  return { products: response.data };
};

export default Home;
