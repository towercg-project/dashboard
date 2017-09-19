import * as React from 'react';
import PropTypes from 'prop-types';

import If from './toolbox/If';

export default class TowerCGClientProvider extends React.Component {
  static childContextTypes = {
    towercg: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this._stateChangeListener = () => {
      this.setState({ canShow: true });
    };

    this.state = { canShow: false };
  }

  componentDidMount() {
    const {towercg} = this.props;

    if (window) {
      window.towercg = towercg;
    }

    towercg.eventBus.on("towercg-client.state", this._stateChangeListener);
    towercg.eventBus.on("towercg-client.stateChanged", this._stateChangeListener);
  }

  componentWillUnmount() {
    towercg.eventBus.removeListener("towercg-client.state", this._stateChangeListener);
    towercg.eventBus.removeListener("towercg-client.stateChanged", this._stateChangeListener);
  }

  getChildContext() {
    const ret = {
      towercg: this.props.towercg
    };

    return ret;
  }

  render() {
    return (
      <If condition={() => this.state.canShow}
          then={() => this.props.children} />
    );
  }
}

export function towercgConnect(ComponentType, mappingFunction) {
  return class extends React.Component {
    static get name() { return `TowerCG(${ComponentType.name})` }

    static contextTypes = {
      towercg: PropTypes.object.isRequired
    }

    render() {
      const {towercg} = this.context;
      const mapped = mappingFunction ? mappingFunction(towercg.state, this.props) : {};

      return <ComponentType towercg={towercg} {...this.props} {...mapped} />
    }
  };
}
