import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

import { tokenExpired } from "../util/Auth";

function HomeNavbar() {
  const token = useRouteLoaderData("root") as string;
  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>Schmitt's Humblemarket</Navbar.Brand>
        </LinkContainer>
        <Nav>
          {/* <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer> */}
          {token && !tokenExpired() ? (
            <>
              <NavDropdown title={ <PersonCircle/> } active={true}>
                <LinkContainer to="/account">
                  <NavDropdown.Item>Account Detail</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/auth/logout">
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </>
          ) : (
            <></>
          )}
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}

export default HomeNavbar;
