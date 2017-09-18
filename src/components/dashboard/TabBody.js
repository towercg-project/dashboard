import * as React from 'react';

import {
  TabPane,

  Row
} from 'reactstrap';

export default class TabBody extends React.Component {
  render() {
    const {tabName, widgets} = this.props;

    const elems =
      widgets.map((widget, idx) => {
        const {pluginClass, pluginConfig} = widget;

        return React.createElement(pluginClass, { key: idx, pluginConfig });
      });

    return (
      <TabPane key={tabName} tabId={tabName}>
        <Row style={{ marginTop: '1rem' }}>
          {elems}
        </Row>
      </TabPane>
    )
  }
}
