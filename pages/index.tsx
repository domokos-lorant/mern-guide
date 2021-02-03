import React from "react";
import axios from "axios";
import { IProduct } from "../models/Product";
import { NextPage, NextPageContext } from "next";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";
import ProductPagination from "../components/Index/ProductPagination";

type Props = {
  products: IProduct[];
  totalPages: number
};

const Home: NextPage<Props> = ({ products, totalPages }: Props) => {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
};

Home.getInitialProps = async (ctx: NextPageContext) => {
  const page = ctx.query.page ?? "1";
  const size = 9;
  const payload = {
    params: { page, size }
  };
  const url = `${baseUrl}/api/products`;
  const response = await axios.get<Props>(url, payload);
  return response.data;
};

export default Home;
