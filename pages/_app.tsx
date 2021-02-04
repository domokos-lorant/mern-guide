import axios from "axios";
import App, { AppContext, AppInitialProps } from "next/app";
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import Layout from "../components/_App/Layout";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import { Routes } from "../utils/routes";

class MyApp extends App {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps> {
    const { token } = parseCookies(ctx);

    let pageProps: { [key: string]: string } = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRoute = ctx.pathname === "/account" || ctx.pathname === "/create";

      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;

        const isRoot = user.role === "root";
        const isAdmin = user.role === "admin";
        const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === "/create";

        if (isNotPermitted) {
          redirectUser(ctx, "/");
        }

        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);

        // Throw out invalid token.
        destroyCookie(ctx, "token");

        // Redirect to login.
        redirectUser(ctx, "/login");
      }
    }

    return { pageProps };
  }

  syncLogout = (event: StorageEvent) => {
    if (event.key === "logout") {
      Router.push(Routes.Login);
    }
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
