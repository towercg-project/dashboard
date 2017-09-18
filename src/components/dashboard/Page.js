import * as React from 'react';

import * as _ from 'lodash';
import autobind from 'auto-bind';
import classnames from 'classnames';

import TopBar from './TopBar';
import TabBody from './TabBody';

import {
  Nav,
  NavItem,
  NavLink,

  TabContent
} from 'reactstrap';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = { activeTab: null };
  }

  _toggle(tabName) {
    this.setState({ activeTab: tabName });
  }

  render() {
    const {plugins} = this.props.config;

    const tabs = { "General": [] };
    const tabWidgets = {};

    plugins.forEach((pluginEntry, idx) => {
      const {pluginClass, pluginConfig} = pluginEntry;
      const {tabName} = pluginConfig;

      tabs[tabName] = tabs[tabName] || [];
      tabs[tabName].push(pluginEntry);
    })

    const activeTab = this.state.activeTab || "General";

    return (
      <div>
        <TopBar />
        <div>
          <Nav tabs>
            {
              Object.keys(tabs).map((tabName) => {
                return (
                  <NavItem key="tabName">
                    <NavLink
                      className={classnames({ active: activeTab == tabName })}
                      onClick={() => { this._toggle(tabName) }}
                    >
                      {tabName}
                    </NavLink>
                  </NavItem>
                );
              })
            }
          </Nav>
          <TabContent activeTab={activeTab}>
            {
              Object.keys(tabs).map((tabName) =>
                <TabBody key={tabName} tabName={tabName} widgets={tabs[tabName]} />)
            }
          </TabContent>
        </div>
      </div>
    );
  }
}
