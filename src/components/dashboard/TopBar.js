import * as React from 'react';

import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

export default class TopBar extends React.Component {
  render() {
    return (
      <Navbar>
        <NavbarBrand>TowerCG</NavbarBrand>
      </Navbar>
    );
  }
}
