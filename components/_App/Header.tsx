import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { IUser } from "../../models/User";
import { Routes } from "../../utils/routes";
import { handleLogout } from "../../utils/auth";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

type Props = {
  user?: IUser
};

function Header({ user }: Props): JSX.Element {
  const router = useRouter();
  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;

  function isActive(route: string): boolean {
    return route === router.pathname;
  }

  return (
    <Menu fluid id="menu" inverted stackable>
      <Container text>
        <Link href={Routes.Home}>
          <Menu.Item header active={isActive(Routes.Home)}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: "1em" }}
            />
            ReactReserve
          </Menu.Item>
        </Link>

        <Link href={Routes.Cart}>
          <Menu.Item header active={isActive(Routes.Cart)}>
            <Icon size="large" name="cart" />
            Cart
          </Menu.Item>
        </Link>

        {isRootOrAdmin && (
          <Link href={Routes.Create}>
            <Menu.Item header active={isActive(Routes.Create)}>
              <Icon size="large" name="add square" />
              Create
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href={Routes.Account}>
              <Menu.Item header active={isActive(Routes.Account)}>
                <Icon size="large" name="user" />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item header onClick={handleLogout}>
              <Icon size="large" name="sign out" />
              Logout
            </Menu.Item>
          </>
        ) : (
            <>
              <Link href={Routes.Login}>
                <Menu.Item header active={isActive(Routes.Login)}>
                  <Icon size="large" name="sign in" />
                Login
              </Menu.Item>
              </Link>

              <Link href={Routes.Signup}>
                <Menu.Item header active={isActive(Routes.Signup)}>
                  <Icon size="large" name="signup" />
                Signup
              </Menu.Item>
              </Link>
            </>
          )}
      </Container>
    </Menu>
  );
}

export default Header;
