import * as React from 'react';

import { Client as TowerCGClient } from '@towercg/client';

import * as Toolbox from './toolbox';
import TowerCGClientProvider from './TowerCGClientProvider';
import Page from './dashboard/Page';

export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const {apiUrl, towercg} = this.props.config;
    console.log("config towercg:", towercg);
    const client = new TowerCGClient(apiUrl, towercg);
    this.setState({ client });

    client.eventBus.on('towercg-client.connected', () => {
      this.setState({ connected: true });
    });
    client.eventBus.on('towercg-client.reconnected', () => {
      this.setState({ connected: true });
    });
    client.eventBus.on('towercg-client.disconnected', () => {
      this.setState({ connected: false });
    });

    client.connect();
  }

  render() {
    return (
      <Toolbox.If condition={() => this.state.connected}
          then={() =>
            <TowerCGClientProvider towercg={this.state.client}>
              <Page config={this.props.config} />
            </TowerCGClientProvider>
          }
          else={() => <Toolbox.Spinner />} />
    );
  }
}
