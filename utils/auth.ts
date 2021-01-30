import cookie from "js-cookie";
import { NextPageContext } from "next";
import Router from "next/router";
import { Routes } from "./routes";
import jwt from "jsonwebtoken";

export function handleLogin(token: string): void {
    cookie.set("token", token);
    Router.push(Routes.Account);
}

export function redirectUser(ctx: NextPageContext, location: string) {
    if (ctx.req && ctx.res) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

export function handleLogout(): void {
    cookie.remove("token");
    window.localStorage.setItem("logout", Date.now().toLocaleString());
    Router.push(Routes.Login);
}

export function verifyToken(token: string): string | undefined {
    const { userId } = jwt.verify(
        token,
        process.env.JWT_SECRET) as { userId: string };
    return userId;
}