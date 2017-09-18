import * as React from 'react';
import autobind from 'auto-bind';

import {
  Col,

  Collapse,

  Card,

  CardHeader,
  CardBlock
} from 'reactstrap';

export class DashboardPluginBody extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = { open: true };
  }

  _toggleCollapse(ev) {
    ev && ev.preventDefault();
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <Col xs={this.props.xs} sm={this.props.sm} md={this.props.md} lg={this.props.lg}>
        <Card>
          <CardHeader>
            <a href="#" onClick={this._toggleCollapse}>{this.props.title}</a>
          </CardHeader>
          <Collapse isOpen={this.state.open}>
            <CardBlock>
              {this.props.children}
            </CardBlock>
          </Collapse>
        </Card>
      </Col>
    );
  }
}

export default DashboardPluginBody;
