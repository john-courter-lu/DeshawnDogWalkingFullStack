import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <Navbar color="light" expand="md">
          <Nav navbar>
            <NavbarBrand href="/">🐕‍🦺 🐩 DeShawn's Dog Walking</NavbarBrand>
            <NavItem>
              <NavLink href="/dogs">Dogs</NavLink>
              <NavLink href="/walkers">Walkers</NavLink>
              <NavLink href="/cities">Cities</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Outlet />
      </>
    </div>
  );
}

export default App;
