import * as React from 'react';
import PropTypes from 'prop-types';

import If from './toolbox/If';

export default class TowerCGClientProvider extends React.Component {
  static childContextTypes = {
    towercg: PropTypes.object.isRequired,
    towercgState: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this._stateChangeListener = (event) => {
      this.setState({ towercgState: event.newState });
    };

    this.state = { towercgState: null };
  }

  componentDidMount() {
    const {towercg} = this.props;

    towercg.eventBus.on("towercg-client.stateChanged", this._stateChangeListener);
  }

  componentWillUnmount() {
    towercg.eventBus.removeListener("towercg-client.stateChanged", this._stateChangeListener);
  }

  getChildContext() {
    const ret = {
      towercg: this.props.towercg,
      towercgState: this.props.towercg.state || {}
    };

    if (window) {
      window.towercg = this.props.towercg;
    }

    return ret;
  }

  render() {
    return (
      <If condition={() => this.state.towercgState}
          then={() => this.props.children} />
    );
  }
}

export function towercgConnect(ComponentType, mappingFunction) {
  return class extends React.Component {
    static get name() { return `TowerCG(${ComponentType.name})` }

    static contextTypes = {
      towercg: PropTypes.object.isRequired,
      towercgState: PropTypes.object.isRequired
    }

    render() {
      const {towercg, towercgState} = this.context;
      const mapped = mappingFunction ? mappingFunction(towercgState) : {};

      return <ComponentType towercg={towercg} {...this.props} {...mapped} />
    }
  };
}
